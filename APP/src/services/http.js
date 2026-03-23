const GET = async (url) => {
    try {
        const reqOptions = { method: "GET" };
        const result = await fetch(url, reqOptions);
        if (result.status !== 200) {
            throw new Error(`Error fetching data: ${result.statusText}`);
        }
        return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const POST = async (url, data) => {
    try {
        const reqOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        const result = await fetch(url, reqOptions);
        if (result.status !== 201) {
            throw new Error(`Error posting data: ${result.statusText}`);
        }
        return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const PUT = async (url, data) => {
    try {
        const reqOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        const result = await fetch(url, reqOptions);
        if (result.status !== 200) {
            throw new Error(`Error updating data: ${result.statusText}`);
        }
        return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const PATCH = async (url, data) => {
    try {
        const reqOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        const result = await fetch(url, reqOptions);
        if (result.status !== 200) {
            throw new Error(`Error patching data: ${result.statusText}`);
        }
        return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const DELETE = async (url) => {
    try {
        const reqOptions = { method: "DELETE" };
        const result = await fetch(url, reqOptions);
        if (result.status !== 200) {
            if (result.status === 404) {
                throw new Error("Error deleting data: Resource not found");
            }
            throw new Error(`Error deleting data: ${result.statusText}`);
        }
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { GET, POST, PUT, PATCH, DELETE };
