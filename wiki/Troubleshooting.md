# Troubleshooting

This page covers common issues when working with `open-chat-js`.

## `API URL is not valid.`

This error is thrown when `setApiUrl()` cannot confirm the server is an Open-Chat instance.

Check:

- the server is running
- the URL is correct
- the server exposes the expected readiness or validation endpoint
- the server returns JSON with `name === "open-chat-server"`

## `fetch` is undefined

If you are running in a Node environment older than Node 18, use a `fetch` polyfill or upgrade Node.

## Authentication errors

Verify:

- the username and password are correct
- the server accepts the account creation request
- the bearer token is valid and not expired

## Empty or missing chat results

Check that:

- the chat exists
- the chat ID was passed correctly
- the authenticated user has access to the chat
- the server is returning the message structure the client expects

## Server compatibility

This client expects server-side fields close to:

- `id`
- `chat_id`
- `sender`
- `data` or `content`
- `status`
- `created_at`
- `edited`

If the server stores chat membership or message data differently, you may need server-side compatibility work.
