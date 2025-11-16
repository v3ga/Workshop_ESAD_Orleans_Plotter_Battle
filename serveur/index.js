// --------------------------------------------
/*
Démarrage
npm start
*/

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import crypto from "crypto";
import { spawn } from "child_process";
import { WebSocketServer } from "ws";
import { parse } from "url";

// --------------------------------------------
const __DEBUG__     = true;

// --------------------------------------------
const SERVER_IP     = '192.168.1.11';
const SERVER_PORT   = 3000;

// --------------------------------------------
const app       = express();

// --------------------------------------------
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static("public"));

// --------------------------------------------
let     queue       = [];
let     isPlotting  = false;
const   clients     = new Set();
const   wss         = new WebSocketServer({ noServer: true });

// --------------------------------------------
function getQueueInfos()
{
    let queue_infos = [];
    queue.forEach((item, idx) => {
        queue_infos.push( { 
            'id'        : item.id,
            'status'    : item.status,
            'pseudo'    : item.ws.pseudo,
            'client_id' : item.ws.id,
            'timestamp' : item.timestamp,
        })
    });

    return {
        'status'    : 'queue-infos',
        'queue'     : queue_infos
    }
}

// --------------------------------------------
function broadcastQueueInfos() 
{
    let infos = getQueueInfos();
    clients.forEach( ws => ws.send(JSON.stringify(infos)) );
}

// --------------------------------------------
function processQueue() 
{
    if (isPlotting || queue.length === 0) return;

    // Plotting state
    isPlotting = true;

    // State of queue item
    queue[0].status = 'processing';

    // Extract values
    const { svg, id, ws } = queue[0];
    console.log(`🖊️ Plotting: ${id}`);

    let py;
    if (__DEBUG__)
        py = spawn("python3", ["wait.py", 3]);
    else 
        py = spawn("python3", ["plot-axidraw.py", svg]);


    py.stdout.on("data", (data) => console.log(data.toString()));
    py.stderr.on("data", (data) => console.error("Erreur Python:", data.toString()));

    py.on("close", (code) => 
    {
        console.log("✅ Finished plotting", id);
        queue.shift();
        isPlotting = false;
        processQueue(); // lancer le suivant
        broadcastQueueInfos();
    });

}

// --------------------------------------------
app.post("/plot", (req, res) => 
{
    const { svg, id } = req.body;

    console.log("receveid plot")

    // Find client
    const client = Array.from(clients).find(c => c.id === id);

    // Push data in queue
    queue.push({ 
        id          : crypto.randomUUID(),
        status      : 'waiting', 
        timestamp   : Date.now(), 
        svg         : svg, 
        ws          : client 
    });

    // Process
    processQueue();
    broadcastQueueInfos();

    // Send infos to client
    res.json({ status: "queued", position: queue.length });
});

// --------------------------------------------
app.post("/remove", (req, res) => 
{
    const { id } = req.body;
    console.log(`removing ${id}`);
    queue = queue.filter( item => item.id != id )
    broadcastQueueInfos();
});

// --------------------------------------------
const port = process.env.PORT || SERVER_PORT;
const server = app.listen(3000, SERVER_IP, () => console.log(`🌐 http://${SERVER_IP}:${port}`));
server.on("upgrade", (req, socket, head) => 
{
    wss.handleUpgrade(req, socket, head, ws => 
    {
        // Client Id extraction
        const { query } = parse(req.url, true);
        const clientId  = query.clientId || "unknown";
        const pseudo    = query.pseudo || "";

        // Save it on the ws object
        ws.id       = clientId;
        ws.pseudo   = pseudo;

        // Add clients to the list
        clients.add(ws);

        // Attach close event to socket
        ws.on("close", () => { clients.delete(ws); logClientsNb() } );

        // Send status + infos to client
        ws.send(JSON.stringify({ status : "connected", id: ws.id }));
        ws.send(JSON.stringify(getQueueInfos()));

        // Infos
        // logClientsNb()
        console.log(`connected ${pseudo} (${clientId}), clients nb=${clients.size}`);
    });
});

// --------------------------------------------
function logClientsNb()
{
    console.log(`clients : ${clients.size}`)
}
