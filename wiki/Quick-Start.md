# Quick Start

This quick start creates a client, points it at a server, logs in, creates a chat, sends a message, and lists recent messages.

## Example

```js
import { OpenChat } from "open-chat-js";

const client = new OpenChat();
await client.setApiUrl("http://localhost:3000");

const { token, uid } = await client.auth.login("demo-user", "password123");
console.log("Logged in", { token, uid });

const createResp = await client.chat.create("other-username", { name: "Hello" }, "dm");
console.log("Create chat response:", createResp);

const msg = { text: "Hello!", meta: { mood: "curious" } };
const sendResult = await client.chat.messages.send(createResp.chatid ?? createResp.chat, msg);
console.log("Sent message:", sendResult);

const list = await client.chat.messages.list(createResp.chatid ?? createResp.chat, 50, 0);
console.log("Recent messages:", list);
```

## Notes

- `setApiUrl()` validates the server by calling an API health endpoint.
- The `auth` methods store the active token in `client.AuthToken`.
- `chat.messages.send()` accepts either a plain string or a JSON-serializable object.
