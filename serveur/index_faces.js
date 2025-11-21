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

// --------------------------------------------
const __DEBUG__     = false;
// --------------------------------------------
const SERVER_IP     = '192.168.36.64'; // esad
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

// --------------------------------------------
function processQueue() 
{
    if (isPlotting || queue.length === 0) return;

    // Plotting state
    isPlotting = true;

    // State of queue item
    queue[0].status = 'processing';

    // Extract values
    const { svg, id } = queue[0];
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
    });

}


// --------------------------------------------
app.post("/plot", (req, res) => 
{
    const { svg, id } = req.body;

    console.log("receveid plot");


    // Push data in queue
    queue.push({ 
        id          : crypto.randomUUID(),
        status      : 'waiting', 
        timestamp   : Date.now(), 
        svg         : svg
    });

    // Process
    processQueue();

    // Send infos to client
    res.json({ status: "queued", position: queue.length });
});

// --------------------------------------------
const port = process.env.PORT || SERVER_PORT;
const server = app.listen(3000, SERVER_IP, () => console.log(`🌐 http://${SERVER_IP}:${port}`));
