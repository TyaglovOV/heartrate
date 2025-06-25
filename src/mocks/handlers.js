import { ws } from 'msw';
const chat = ws.link('ws://heart.rate/');
function listener({ client }) {
    console.log('[MSW] WebSocket client connected');
    let intervalId = 0;
    let heartRate = '100';
    client.addEventListener('close', stop);
    client.addEventListener('message', (event) => {
        heartRate = event.data;
        // uncomment to sync
        // stop()
        // start()
    });
    start();
    function start() {
        intervalId = setInterval(() => {
            client.send(heartRate);
        }, 1000);
    }
    function stop() {
        clearInterval(intervalId);
        client.close();
    }
}
export const handlers = [
    chat.addEventListener('connection', listener),
];
