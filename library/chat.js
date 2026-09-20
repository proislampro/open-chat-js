export async function createChat(members, data, type) {
    if (!this.AuthToken) {
        throw new Error("Auth token is not set. Please login first.");
    }

    const isDm = type === "dm";
    const isValidMembersValue = isDm
        ? typeof members === "string" && members.trim().length > 0
        : Array.isArray(members) && members.length > 0;

    if (!isValidMembersValue) {
        throw new Error(isDm ? "DM member must be a non-empty string." : "Members must be a non-empty array.");
    }

    if (!this.ApiUrl || typeof this.ApiUrl !== "string") {
        throw new Error("API URL is not valid.");
    }

    if (!data || typeof data !== "object") {
        throw new Error("Data must be a valid object.");
    }

    if (type && !["dm", "channel", "group"].includes(type)) {
        throw new Error("Type must be one of: dm, channel, group.");
    }

    const requestMembers = isDm ? members.trim() : members;

    const response = await fetch(`${this.ApiUrl}/api/chat/create`, {
        method : "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            members: requestMembers,
            data,
            type,
            token: this.AuthToken,
        }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(responseData.message || responseData.error || "Request Failed");
    }

    if (responseData.error) {
        throw new Error(responseData.error);
    }

    return responseData;
}

export async function sendMessage(chat, message) {
    if (!this.AuthToken) {
        throw new Error("Auth token is not set. Please login first.");
    }

    if (!this.ApiUrl || typeof this.ApiUrl !== "string") {
        throw new Error("API URL is not valid.");
    }

    if (message === undefined || message === null) {
        throw new Error("Message is required and must be valid JSON.");
    }

    // Ensure the message is JSON-serializable. If it's an object/array, send as-is; otherwise stringify simple values.
    const messagePayload = typeof message === "object" ? message : String(message);

    const response = await fetch(`${this.ApiUrl}/api/chat/messages/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat,
            message: messagePayload,
            token: this.AuthToken,
        }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(responseData.message || responseData.error || "Request Failed");
    }

    if (responseData.error) {
        throw new Error(responseData.error);
    }

    return responseData;
}

export async function listMessages(chat, limit = 50, offset = 0) {
    if (!this.AuthToken) {
        throw new Error("Auth token is not set. Please login first.");
    }

    if (!this.ApiUrl || typeof this.ApiUrl !== "string") {
        throw new Error("API URL is not valid.");
    }

    const response = await fetch(`${this.ApiUrl}/api/chat/messages/list`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat,
            token: this.AuthToken,
            limit,
            fromMessageId: offset,
            fromDate: null,
        }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(responseData.message || responseData.error || "Request Failed");
    }

    if (responseData.error) {
        throw new Error(responseData.error);
    }

    return responseData;
}