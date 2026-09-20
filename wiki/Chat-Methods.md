# Chat Methods

The `chat` API provides convenience methods for message flows and chat lifecycle operations.

## Create chat

```js
const response = await client.chat.create("other-username", { name: "Hello" }, "dm");
```

## Send message

```js
const response = await client.chat.messages.send("chat-id-or-username", { text: "Hi!" });
```

## List messages

```js
const response = await client.chat.messages.list("chat-id-or-username", 50, 0);
```

## Common patterns

- DM chats may accept a username string
- group or channel conversations usually take arrays of member identifiers
- message payloads are JSON-serializable objects or strings

## Expected server behavior

The server side is expected to support endpoints similar to:

- `/api/login`
- `/api/register`
- `/api/gettokendata`
- `/api/chat/create`
- `/api/chat/message/send`
- `/api/chat/messages/list`

The exact route names can vary, but the client expects consistent JSON responses from the server.
