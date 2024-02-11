const clientId = '25685dea9e9541bc81c254175bfcb72b'; // Replace with your client ID
const clientSecret = '80b099560dca467f94012e27685d0889'; // Replace with your client secret

async function searchTrack() {
    const trackName = document.getElementById('trackInput').value;

    const response = await fetch(`https://api.spotify.com/v1/search?q=${trackName}&type=track`, {
        headers: {
            'Authorization': 'Bearer ' + await getAccessToken(),
        }
    });

    const data = await response.json();

    if (data.tracks.items.length > 0) {
        const track = data.tracks.items[0];
        const trackInfo = `
            <h2>${track.name}</h2>
            <p>Artist: ${track.artists[0].name}</p>
            <p>Album: ${track.album.name}</p>
            <a href="${track.external_urls.spotify}" target="_blank">Open in Spotify</a>
        `;
        document.getElementById('trackInfo').innerHTML = trackInfo;
    } else {
        document.getElementById('trackInfo').innerHTML = 'Track not found';
    }
}

async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}
