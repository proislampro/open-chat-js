import { login, register, getTokenData } from "./library/auth.js";
import { createChat, sendMessage, listMessages } from "./library/chat.js";

export class OpenChat {
  constructor() {
    this.ApiUrl = "localhost:3000";
    this.AuthToken = "";
    this.uid = null;
  }

  async setApiUrl(api_url) {
    const response = await fetch(`${api_url}/check-api`, { method: "POST" });

    if (!response.ok) {
      throw new Error("API URL is not valid.");
    }

    const data = await response.json();
    if (data.name !== "open-chat-server") {
      throw new Error("API URL is not valid.");
    }

    this.ApiUrl = api_url;
  }

  get auth() {
    return {
      login: async (user, password) => {
        const tokenResponse = await login(this.ApiUrl, user, password);
        this.AuthToken = tokenResponse.token;

        const tokenData = await getTokenData(this.ApiUrl, this.AuthToken);
        this.uid = tokenData.uid;

        return {
          token: this.AuthToken,
          uid: this.uid,
        };
      },
      register: async (username, email, password) => {
        const registrationData = await register(this.ApiUrl, username, email, password);
        this.AuthToken = registrationData.token;

        const tokenData = await getTokenData(this.ApiUrl, this.AuthToken);
        this.uid = tokenData.uid;

        return {
          token: this.AuthToken,
          uid: this.uid,
        };
      },
      setAuthToken: async (token) => {
        const tokenData = await getTokenData(this.ApiUrl, token);
        this.AuthToken = token;
        this.uid = tokenData.uid;
        return {
          token: this.AuthToken,
          uid: this.uid,
        };
      },
    };
  }

  get chat() {
    return {
      create: createChat.bind(this),
      messages : {
          send: sendMessage.bind(this),
          list: listMessages.bind(this),
        },
    }
  }
}


