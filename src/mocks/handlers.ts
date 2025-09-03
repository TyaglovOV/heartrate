import type { WebSocketClientConnectionProtocol } from "@mswjs/interceptors/WebSocket"
import { ws } from "msw"

const chat = ws.link("ws://heart.rate/")

function listener({ client }: { client: WebSocketClientConnectionProtocol }) {
    console.log("[MSW] WebSocket client connected")

    let intervalId: ReturnType<typeof setInterval>
    let heartRate = "100"

    client.addEventListener("close", stop)
    client.addEventListener("message", (event: MessageEvent) => {
        heartRate = event.data as string
    })

    client.send(heartRate)
    startInterval()

    function startInterval() {
        intervalId = setInterval(() => {
            client.send(heartRate)
        }, 1000)
    }

    function stop() {
        clearInterval(intervalId)
        client.close()
    }
}

export const handlers = [chat.addEventListener("connection", listener)]
