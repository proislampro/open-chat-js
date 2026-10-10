export async function getCurrentUser() {
    if (!this.AuthToken) {
        throw new Error("Auth token is not set. Please login first.");
    }

    if (!this.ApiUrl || typeof this.ApiUrl !== "string") {
        throw new Error("API URL is not valid.");
    }

    const response = await fetch(`${this.ApiUrl}/api/users/get/id/current`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.AuthToken}`,
        },
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

export async function getCurrentUserDetails() {
    if (!this.AuthToken) {
        throw new Error("Auth token is not set. Please login first.");
    }

    if (!this.ApiUrl || typeof this.ApiUrl !== "string") {
        throw new Error("API URL is not valid.");
    }

    const response = await fetch(`${this.ApiUrl}/api/users/get/details/current`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.AuthToken}`,
        },
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

export async function setUserDetails(details) {
    if (!this.AuthToken) {
        throw new Error("Auth token is not set. Please login first.");
    }

    if (!this.ApiUrl || typeof this.ApiUrl !== "string") {
        throw new Error("API URL is not valid.");
    }

    const response = await fetch(`${this.ApiUrl}/api/users/set/details`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.AuthToken}`,
        },
        body: JSON.stringify(details),
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

export async function getUserById(userId) {
    if (!this.ApiUrl || typeof this.ApiUrl !== "string") {
        throw new Error("API URL is not valid.");
    }

    const response = await fetch(`${this.ApiUrl}/api/users/get/id`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, token: this.AuthToken? this.AuthToken : null }),
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

export async function getUserDetails(userId) {
    if (!this.ApiUrl || typeof this.ApiUrl !== "string") {
        throw new Error("API URL is not valid.");
    }

    const response = await fetch(`${this.ApiUrl}/api/users/get/details`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, token: this.AuthToken? this.AuthToken : null }),
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