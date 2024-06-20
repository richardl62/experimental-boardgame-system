import { lobbyServer } from "../app/url-params";

export async function callLobby(func: string, params: Record<string,string>) : Promise<any> {
    // Note: The name of the lobbyFunction ('createMatch' etc.) is passed to the
    // server as query parameter with name 'func'.
    const searchParams = new URLSearchParams({func, ...params});
    const fullUrl = `${lobbyServer()}/lobby?${searchParams.toString()}`;
    console.log("callLobby fetching from", fullUrl);

    try {
        const response = await fetch(fullUrl);
        // Check response status code for errors
        if (!response.ok) {
            const message = `${func} failed: fetch reported ${response.status}`
            console.log(message)
            throw new Error(message);
        } else {
            console.log("createMatch suceeded", response.json);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}