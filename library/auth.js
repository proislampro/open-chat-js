function getErrorFromResponse(data, fallbackMessage) {
  const message = data?.message || data?.error || fallbackMessage;
  const code = data?.code || data?.errorCode || "API_ERR";
  const error = new Error(message);
  error.code = code;
  return error;
}

export async function login(api_url, username, password) {
  const response = await fetch(`${api_url}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw getErrorFromResponse(data, "Login failed.");
  }

  if (!data.token) {
    const error = new Error("Login failed.");
    error.code = "LOGIN_TOKEN_MISSING";
    throw error;
  }

  return { token: data.token };
}

export async function register(api_url, username, email, password) {
  const response = await fetch(`${api_url}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw getErrorFromResponse(data, "Registration failed.");
  }

  if (!data.token) {
    const error = new Error("Registration succeeded but the token was missing.");
    error.code = "REGISTER_TOKEN_MISSING";
    throw error;
  }

  return { token: data.token };
}

export async function getTokenData(api_url, tokentoget) {
  const response = await fetch(`${api_url}/api/gettokendata`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: tokentoget }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.error) {
    throw getErrorFromResponse(data, "Request failed.");
  }

  return data.data ?? data;
}
