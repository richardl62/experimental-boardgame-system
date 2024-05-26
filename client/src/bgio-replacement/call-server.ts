export async function callServer(
    server: string, 
    serverFunction: string,
    params: Record<string,string>
) {
    const searchParams = new URLSearchParams(params);

    // Build the full URL including query string
    const fullUrl = `${server}/${serverFunction}?${searchParams.toString()}`;
    console.log("callServer", fullUrl);
    try {
        const response = await fetch(fullUrl);
        // Check response status code for errors
        if (!response.ok) {
            throw new Error(`fetch reported ${response.status}`);
        } else {
            console.log(serverFunction,  "suceeded", response.json)
        }

        return response.json();
    } catch (error) {
        console.log(serverFunction, params, "error", error)
        throw error;
    }

}