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
        <td>${info.id}</td>
        <td>${info.status}</td>
        <td>${info.pseudo} (${info.client_id})</td>
        <td>${info.timestamp}</td>`
      if (info.client_id == clientId && info.status != 'processing') 
        rows+=`<td><button data-id="${info.id}">Supprimer</button></td>`
      else 
        rows+=`<td>&nbsp;</td>`
      rows+=`</tr>`;
    })
    container.innerHTML = `<table>${rows}</table>`;
  
    container.querySelectorAll("button").forEach( button=>
      {
        button.addEventListener("click", (event) => 
        {
          //console.log("Clic sur :", event.target.dataset.id);
          removeItemQueue(event.target.dataset.id);
        });

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
