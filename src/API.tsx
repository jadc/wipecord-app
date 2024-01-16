const DISCORD_API = "https://discord.com/api/v9"

function getHeaders(token: string){
    return { 'Content-Type': 'application/json', 'Authorization': token.replace(/['"]+/g, '') }
}

export default function startWipe(token: string, guild_id: string, author_id: string = "@me"){
    fetch(`${DISCORD_API}/users/${author_id}`, {method: "GET", headers: getHeaders(token)})
        .then(res => res.json())
        .then(res => {console.log(res)})
        .catch(err => console.error(err))
}

// TODO: needs captcha bypass or relay
/*
export async function fetchToken(login: string, password: string){
    let req: Response = await fetch(`${DISCORD_API}/auth/login`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"login": login, "password": password})
    })
    req = await req.json()
    console.log(req)
}
*/

async function authenticatedRequest(token: string, endpoint: string, init: RequestInit){
    const req: Response = await fetch(`${DISCORD_API}/${endpoint}`, { ...init, headers: getHeaders(token) })
    return await req.json()
}

export async function fetchUser(token: string){
    return await authenticatedRequest(token, "users/@me", {method: "GET"})
}