# bitcoin-explorer-backend

# Test-case

Following are the test case for backend.
`cd backend`

```
npm run test

  History
    ✔ Check API valid respond on valid Address hash (61ms)
    ✔ Check searchResults record not exceed length of 5 
    ✔ Check searchResults only remove 
    ✔ Check searchResults replace only old record 
    ✔ Check get history will give valid response on not existing record

  Notifications
    ✔ Check new notification is created with valid response
    ✔ Check update notification isNew status 
    ✔ Check update notification isNew status 

  Subscription
    ✔ Add new hash in user Subscription
    ✔ Check when add some hash in user Subscription
    ✔ Check deactivated Subscription
    ✔ Check getAll Subscription


  12 passing (726ms)

```

## Web-socket For Subscription

I have used  [Blockchain.com]("https://www.blockchain.com/explorer/api/api_websocket") websocket which help us to notify when every are new Block is created  we will check all the active Subscription and does there status change if yes then Deactive  Subscription and create new notification.


```
const wss_explorer = new WebSocketServer("wss://ws.blockchain.info/inv");

wss_explorer.addEventListener("message", (e) => {
  console.log("message", e.data);
});

wss_explorer.addEventListener("data", (e) => {
  console.log("data", e);
});
const interval = setInterval(() => ping(), 5000);

wss_explorer.addEventListener("open", (e) => {
  console.log("open");
  wss_explorer.send('{"op": "blocks_sub"}');
});

```