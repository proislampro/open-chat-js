# API Reference

This reference summarizes the main interface exposed by `OpenChat`.

## `new OpenChat()`

Creates a new client instance.

Properties:

- `ApiUrl` — the configured Open-Chat server URL
- `AuthToken` — the active bearer token
- `uid` — the authenticated user ID

## `setApiUrl(apiUrl)`

Validates that the target URL responds as an Open-Chat server and stores it on the client.

```js
await client.setApiUrl("http://localhost:3000");
```

## `auth`

### `login(username, password)`

Authenticates as a user and returns:

```js
{ token, uid }
```

### `register(username, email, password)`

Creates a user account and returns:

```js
{ token, uid }
```

### `setAuthToken(token)`

Sets a token on the client and loads the associated user metadata.

## `chat`

### `create(members, data, type)`

Creates a DM, group, or channel conversation.

Parameters:

- `members`: string for DM, array for group/channel
- `data`: metadata object for the chat
- `type`: one of `dm`, `group`, `channel`

### `messages.send(chat, message)`

Sends a message into a chat. The message can be a string or an object.

### `messages.list(chat, limit = 50, offset = 0)`

Returns a paginated list of messages for the selected chat.

## Response behavior

The client uses `fetch` and throws an `Error` on non-2xx responses. Successful calls return the parsed JSON from the server.
