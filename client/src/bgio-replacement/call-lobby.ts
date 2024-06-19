export async function callLobby(server: string, func: string, params: Record<string,string>) : Promise<unknown> {
    // Note: The name of the lobbyFunction ('createMatch' etc.) is passed to the
    // server as query parameter with name 'func'.
    const searchParams = new URLSearchParams({func, ...params});
    const fullUrl = `${server}/lobby?${searchParams.toString()}`;
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