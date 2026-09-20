# Installation

This page covers the supported installation methods for `open-chat-js`.

## From npm

When the package is published, install it with:

```bash
npm install open-chat-module
```

You can also install directly from GitHub:

```bash
npm install github:proislampro/open-chat-js
```

## From a local package

If you are testing locally, build or pack the project and install the generated archive:

```bash
npm pack
npm install ./open-chat-js-0.1.0.tgz
```

## Runtime requirements

- Node.js 18+ or a runtime that supports `fetch`
- A running Open-Chat server
- A valid API base URL, such as `http://localhost:3000`

## Example import

```js
import { OpenChat } from "open-chat-js";

const client = new OpenChat();
await client.setApiUrl("http://localhost:3000");
```
