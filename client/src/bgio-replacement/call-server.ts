export async function callServer(
    server: string, 
    serverFunction: string,
    params: Record<string,string>
) {
    const searchParams = new URLSearchParams(params);

    // Build the full URL including query string
    const fullUrl = `${server}?/${serverFunction}/${searchParams.toString()}`;

    try {
        const response = await fetch(fullUrl);
        // Check response status code for errors
        if (!response.ok) {
            const message = `${serverFunction} failed: fetch reported ${response.status}`
            console.log(message)
            throw new Error(message);
        } else {
            console.log("createMatch suceeded", response.json)
        }

        return response.json();
    } catch (error) {
        throw error;
    }

}