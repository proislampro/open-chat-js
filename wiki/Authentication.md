# Authentication

Authentication is handled through the `client.auth` interface.

## Login

```js
const result = await client.auth.login("demo-user", "password123");
console.log(result.token);
console.log(result.uid);
```

This method does three things:

1. calls the login endpoint
2. stores the returned token into `client.AuthToken`
3. fetches the token metadata to populate `client.uid`

## Register

```js
const result = await client.auth.register("new-user", "user@example.com", "secure-password");
```

## Reusing a token

```js
const result = await client.auth.setAuthToken(existingToken);
```

## Security notes

- use HTTPS in production
- rotate tokens when possible
- treat the token as sensitive data
- avoid storing tokens in long-lived plaintext storage if possible
