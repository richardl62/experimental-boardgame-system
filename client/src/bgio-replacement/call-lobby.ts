import { lobbyServer } from "../app/url-params";

export async function callLobby(func: string, arg: Record<string,string|number>) : Promise<any> {
    // Note: The name of the lobbyFunction ('createMatch' etc.) is passed to the
    // server as query parameter with name 'func'.
    const searchParams = new URLSearchParams();
    searchParams.append("func", func);
    searchParams.append("arg", JSON.stringify(arg));

    const fullUrl = `${lobbyServer()}/lobby?${searchParams.toString()}`;
    console.log("callLobby fetching from", fullUrl);

    try {
        const response = await fetch(fullUrl);
        // Check response status code for errors
        if (!response.ok) {
            const message = `${func} failed: fetch reported ${response.status}`
            console.log(message)
            throw new Error(message);
        } 

        const result = await response.json();
        console.log(`${func} suceeded`, result);
        return result
    } catch (error) {
        throw error;
    }
}