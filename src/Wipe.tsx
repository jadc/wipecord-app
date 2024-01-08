const DISCORD_API = "https://discord.com/api/v9"

function getHeaders(token: string){
    return { 'Content-Type': 'application/json', 'Authorization': token }
}

function startWipe(token: string, guild_id: string, author_id: string = "@me"){
    fetch(`${DISCORD_API}/users/${author_id}`, {method: "GET", headers: getHeaders(token)})
        .then(res => res.json())
        .then(res => {console.log(res)})
        .catch(err => console.error(err))
}

export default startWipe;