# open-chat-js

Open Chat JS — a lightweight client library for interacting with the Open-Chat HTTP API.

**This package** provides a small, dependency-free wrapper to authenticate, create chats and send/list messages against an Open-Chat server.

**Status:** Beta

**Table of contents**
- **Overview**: Brief description and goals.
- **Installation**: How to add the module to your project.
- **Quick Start**: Minimal example to get going.
- **API Reference**: Main methods and expected inputs/outputs.
- **Configuration**: Required server and environment hints.
- **Database Compatibility**: Notes about server-side expectations.
- **Publishing**: Tips for publishing the module to npm.
- **Contributing & Tests**: How to help and run tests.
- **License & Contact**

**Overview**
- **Purpose**: Provide a compact client for Open-Chat servers to speed integration in web and Node apps.
- **Design**: Promise-based, tiny surface area (auth + chat methods), no runtime frameworks required.

**Installation**
- **From npm** (when published): `npm install open-chat-module` or `npm install github:proislampro/open-chat-js`
- **From local package**: copy the module folder into your project or use `npm pack` then `npm install ./open-chat-js-0.1.0.tgz`.

**Quick Start**

1. Create a new file, install node 18+ or any environment that supports fetch.
2. Example usage:

```js
import { OpenChat } from "open-chat-js"; // or path to local module

const client = new OpenChat();
await client.setApiUrl("http://localhost:3000");

// login
const { token, uid } = await client.auth.login("demo-user", "password123");
console.log("Logged in, token:", token, "uid:", uid);

// create or open a DM chat (server handles creation)
const createResp = await client.chat.create("other-username", { name: "Hello" }, "dm");
console.log("Create chat response:", createResp);

// send a JSON message
const msg = { text: "Hello!", meta: { mood: "curious" } };
const sendResult = await client.chat.messages.send(createResp.chatid ?? createResp.chat, msg);
console.log("Sent message:", sendResult);

// list recent messages
const list = await client.chat.messages.list(createResp.chatid ?? createResp.chat, 50, 0);
console.log(list);
```

**API Reference**
- **Auth**:
	- `client.auth.login(username, password)` -> `{ token }` (throws on error)
	- `client.auth.register(username, email, password)` -> `{ token }`
	- `client.auth.setAuthToken(token)` -> sets `client.AuthToken` and returns token metadata
- **Chat**:
	- `client.chat.create(members, data, type)`
		- `members`: string (for DM) or array (group/channel)
		- `data`: object with chat metadata
		- `type`: one of `dm`, `group`, `channel`
		- returns server response with `chatid` or created chat object
	- `client.chat.messages.send(chat, message)`
		- `chat`: chat id or username (DM)
		- `message`: JSON-serializable object or string. Returns inserted message row from server.
	- `client.chat.messages.list(chat, limit = 50, offset = 0)`
		- returns `{ messages: [...] }` (paginated by `fromMessageId` / `fromDate` semantics)

**Responses & Errors**
- Methods throw `Error` on non-2xx responses. The `Error` object includes `.code` for API error codes where available.
- Successful responses return the parsed JSON payload from the server.

**Configuration / Requirements**
- **Server**: You must point `client.setApiUrl(url)` at a running Open-Chat server (default API endpoints: `/api/login`, `/api/register`, `/api/gettokendata`, `/api/chat/create`, `/api/chat/messages/send`, `/api/chat/messages/list`).
- **Transport**: The client uses `fetch`. In Node.js use Node 18+ or a global fetch polyfill.
- **Auth token**: The client stores `client.AuthToken` in-memory; treat it like a bearer token.

**Database Compatibility (server-side)**
- The client expects the server to store messages with fields similar to: `id`, `chat_id`, `sender`, `data` (or `content`), `status`, `created_at`, `edited`.
- For robust server-side queries, prefer a normalized chat-members schema (text[] or join table). If the server stores `members` as JSON, server-side code may filter in JS for compatibility.

**Publishing to npm**
- Ensure `package.json` fields (`name`, `version`, `main`, `type`, `license`) are correct.
- Remove local `.git` in `node_modules` before pack/publish. Instead, publish from the module folder as a standalone git repo or run from a clean directory.
- Commands:
	- `npm pack` — create a tarball locally for testing
	- `npm publish --access public` — publish to npm (requires npm account and proper `name` scope if needed)

**Security & Production Notes**
- Always use HTTPS in production when calling servers.
- Tokens should be short-lived and rotated; server should store only token hashes.
- Validate / sanitize user-supplied content before sending to the server if you display it in a UI.

**Contributing & Tests**
- **Tests**: Add unit tests for the client wrappers. Example test runners: `vitest`, `jest`.
- **Contributing**: Fork, implement features or fixes in topic branches, open a pull request with a short description and tests.

**License**
- This project currently includes a `LICENSE` file. Verify license compatibility before publishing.

**Need help?**
- Open an issue or contact the maintainer via the repository metadata.

---

This README provides everything you need to start integrating the Open Chat client into your app. If you want, I can also:
- add a `package.json` tweak for npm (version bump, repository fields),
- add example tests and GitHub Actions workflow for publishing,
- or update the client examples to show file-based usage for browsers vs Node.
