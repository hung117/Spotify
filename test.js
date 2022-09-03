let audioPlayer = document.querySelector("#audioPlayer");
let audioSrc = document.querySelector("#audioSrc");
let playlistsDisplay = document.querySelector("#playlists");
const createPlaylist = (playList) => {
    let playlist = `<li><a class="dropdown-item" 
    onclick="initTrackResult('${encodeURIComponent(
        JSON.stringify(playList)
    )}')" 
    href="#">${playList.name}</a></li>`;
    playlistsDisplay.innerHTML += playlist;
};
function clear(element) {
    element.innerHTML = "";
}
let storedToken;
let playlists = [
    "Jazz night",
    "edgy to the death",
    "boring AF",
    "God forsakken",
    "your mom doesn't love you",
];
//====================================

let genresDisplay = document.querySelector("#genres");
const createGenre = (genre, genreId) => {
    // let genreElement = `<li><a class="dropdown-item" onclick="initPlaylist(${genreId})" href="#">${genre}</a></li>`;
    let genreElement = `<li><a class="dropdown-item" 
    onclick="initPlaylist('${encodeURIComponent(
        JSON.stringify(genreId)
    )}','${encodeURIComponent(JSON.stringify(genre))}')" 
    href="#">${genre}</a></li>`;

    genresDisplay.innerHTML += genreElement;
};
let curGenre;
const initPlaylist = async (genreId, genre) => {
    genreId = JSON.parse(decodeURIComponent(genreId));
    playlists = await API_controller.getPlaylistByGenre(storedToken, genreId);
    console.log(playlists);

    clear(playlistsDisplay);

    playlists.forEach((playlist) => {
        createPlaylist(playlist);
    });
    document.querySelector("#GenreSelectBtn").innerHTML = JSON.parse(
        decodeURIComponent(genre)
    );
};
const initTrackResult = async (playlist) => {
    playlist = JSON.parse(decodeURIComponent(playlist));
    document.querySelector("#playListSelectBtn").innerHTML = playlist.name;
    const tracksEndPoint = playlist.tracks.href;
    console.log(tracksEndPoint);
    const tracks = await API_controller.getTracks(storedToken, tracksEndPoint);
    console.log(tracks);

    // https://api.spotify.com/v1/albums/3XvDbxerzYjQZRc6JfF9jY

    SongResult = [];
    clear(songResult_display);

    // tracks.forEach((trackObj) => {
    for (const trackObj of tracks) {
        const track = trackObj.track;
        // console.log(track.name + " ");
        // console.log(track);
        let artists = "";
        track.artists.forEach((artist) => {
            artists += artist.name;
        });
        let albumCover = track.album.images[0].url;
        let albumName = track.album.name;
        // let trackData={albumName:}
        const trackData = {
            albumName: albumName,
            songName: track.name,
            author: artists,
            trackPreview: track.preview_url,
            albumImage: albumCover,
        };
        SongResult.push(trackData);
    }
    clear(playlistsDisplay);
    clear(songResult_display);
    songResult_display.innerHTML += `<li
    class="list-group-item disabled"
    aria-disabled="true">
    Result
</li>`;
    for (const song of SongResult) {
        createSongResult(song);
    }
};

let genres = ["Jazz night", "Rock N ROLL", "Blue", "EMO", "POP"];
//===================================================
let SongResult = [
    {
        albumName: "Rubber Soul",

        songName: "Something",
        author: "The Beatles",
        albumImage: "./resources/theBeatles1.jpg",
    },
    {
        albumName: "Rubber Soul",
        songName: "Real Love",
        author: "The Beatles",
        albumImage: "./resources/theBeatles1.jpg",
    },
    {
        albumName: "Revolver",

        songName: "Hey Jude",
        author: "The Beatles",
        albumImage: "./resources/theBeatles2.jpg",
    },
    {
        albumName: "Abbey Road",

        songName: "Revolution",
        author: "The Beatles",
        albumImage: "./resources/theBeatles1.jpg",
    },
    {
        albumName: "Bohemian Rhapsody",
        songName: "Bohemian Rhapsody",
        author: "Queen",
        albumImage: "./resources/Queen.jpg",
    },
    {
        albumName: "Variety",
        songName: "Plastic Love",
        author: "Mariya Takeuchi",
        albumImage: "./resources/PLL1.jpg",
    },
];
let songResult_display = document.querySelector("#songResult");
const createSongResult = (songDetail) => {
    let songTag = `   <li class="list-group-item"
    onclick="refreshSongCard(
    '${encodeURIComponent(JSON.stringify(songDetail))}')"
    >
    ${songDetail.songName} --${songDetail.author}</li>`;
    songResult_display.innerHTML += songTag;
};

//===========================
let songCard = document.querySelector("#songDetail_Card");

const refreshSongCard = (songDetail) => {
    songDetail = JSON.parse(decodeURIComponent(songDetail));
    // console.log(songDetail);
    let card = `
    <div class="card mb-3" style="max-width: 540px">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img
                                    src=${songDetail.albumImage}
                                    alt="Trendy Pants and Shoes"
                                    class="img-fluid rounded-start"
                                />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${songDetail.albumName}</h5>
                                    <p class="card-text">${songDetail.songName}</p>
                                    <p class="card-text">
                                        <small class="text-muted">${songDetail.author}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                     `;
    audioSrc.src = songDetail.trackPreview;
    // console.log(audioSrc.src);
    audioPlayer.load();
    audioPlayer.play();
    // console.log("audioPlayer.src");
    songCard.innerHTML = card;
    // console.log(songDetail);
};
// ===========================

let SearchBar = document.querySelector("#SearchBar");
SearchBar.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        search();
    }
});
async function search() {
    clear(playlistsDisplay);
    clear(songResult_display);
    const searchResult = await API_controller.search(
        storedToken,
        SearchBar.value
    );
    console.log(searchResult);
    SongResult = searchResult;
    songResult_display.innerHTML += `<li
    class="list-group-item disabled"
    aria-disabled="true">
    Result
</li>`;
    for (const song of SongResult) {
        createSongResult(song);
    }
}
clear(playlistsDisplay);
clear(songResult_display);
