let SERVER_ADDRESS = "";

// ----------------------------------------
function connect()
{
  SERVER_ADDRESS = `${SERVER_IP}:${SERVER_PORT}`
  socket = new WebSocket(`ws://${SERVER_ADDRESS}?clientId=${clientId}&pseudo=${PSEUDO}`);
  socket.onmessage = (msg) => 
  {
    let data = JSON.parse(msg.data);
    if (data.status == "connected")
    {
      clientId = data.id
      console.log(`connected, clientId=${clientId}`);
    }
    else 
    if (data.status == "queued"){}
    else if (data.status == "queue-infos")
    {
      updateLayoutInfos(data.queue);
      //console.log(data.queue)
    }
  };

  /*
  Style
  let queue = [];
  for (let i=0;i<8;i++)
    queue.push({
      id : generateClientId(),
      client_id : generateClientId(), 
      status : 'processing',
      pseudo : PSEUDO,
      timestamp : Date.now()
    });
  updateLayoutInfos(queue);
  */
}



// ----------------------------------------
function call(end_point, data={}, cbDone)
{
  fetch(`http://${SERVER_ADDRESS}/${end_point}`, 
  {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
  })
  .then( response=>response.json() )
  .then( result=>{
    if (isFunction(cbDone)) 
      cbDone(result)
  })
}

// ----------------------------------------
function plot(svg,cbDone)
{
  call('plot', { svg : svg, id: clientId }, cbDone);
}

// ----------------------------------------
function removeItemQueue(id)
{
  call('remove', {id:id});
}

// ----------------------------------------
function updateLayoutInfos(queue)
{
  let container = document.getElementById("container-queue-infos");
  container.innerHTML = '';

  if (queue.length > 0)
  {
    let rows = '';
    queue.forEach( info => {
      rows += `<tr>
        <!-- <td>${shortenString(info.id,10,5)}</td> -->
        <td>${info.pseudo} (${shortenString(info.client_id,10,5)})</td>
        <td>${info.status}</td>
        <td>${formatTimestamp(info.timestamp)}</td>`
      if (info.client_id == clientId && info.status != 'processing') 
        rows+=`<td><button data-id="${info.id}">Supprimer</button></td>`
      else 
        rows+=`<td>&nbsp;</td>`
      rows+=`</tr>`;
    })
    container.innerHTML = `<table>${rows}</table>`;
  
    container.querySelectorAll("button").forEach( button=>
    {
      button.addEventListener("click", (event) => removeItemQueue(event.target.dataset.id) )
    })
  }
}

// ----------------------------------------
function generateClientId() 
{
  return 'client-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 9);
}

// ----------------------------------------
function getClientId()
{
  let clientId = localStorage.getItem("clientId");
  if (!clientId) 
  {
    clientId = generateClientId();
    localStorage.setItem("clientId", clientId);
  }
  return clientId;
}

// ----------------------------------------
function isFunction(f)
{
    return typeof f === "function";
}

// ----------------------------------------------------
function shortenString(str, startLength, endLength)
{
    if (str.length <= startLength + endLength) 
        return str; // No need to shorten
    return str.substring(0, startLength) + '[...]' + str.substring(str.length - endLength);
}

// ----------------------------------------------------
function formatTimestamp(ts)
{
    return new Date(ts).toLocaleString();
}
  

function getGlobalSvgBBoxFromString(svgString) {
  // 1. Parse la string en SVG DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svg = doc.documentElement;

  // 2. Insérer le SVG hors écran pour que getCTM/getBBox fonctionnent
  svg.style.position = "absolute";
  svg.style.left = "0px";
  svg.style.top = "0px";
  document.body.appendChild(svg);

  // 4. Parcourt tous les éléments pour créer la bbox globale
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  svg.querySelectorAll("*").forEach(el => 
  {
    if (typeof el.getBBox === "function") {
      try {
        const box = el.getBBox();
        if (!box) return;

        minX = Math.min(minX, box.x);
        minY = Math.min(minY, box.y);
        maxX = Math.max(maxX, box.x + box.width);
        maxY = Math.max(maxY, box.y + box.height);
      } catch {}
    }
  });

  // 5. Nettoyage
  svg.remove();

  if (minX === Infinity) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
