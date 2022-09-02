let playlistsDisplay = document.querySelector("#playlists");
const createPlaylist = (playListName) => {
    let playlist = `<li><a class="dropdown-item" href="#">${playListName}</a></li>`;
    // playlists.appendChild(display_playlists);
    playlistsDisplay.innerHTML += playlist;
};
function clear(element) {
    element.innerHTML = "";
}

let playlists = [
    "Jazz night",
    "edgy to the death",
    "boring AF",
    "God forsakken",
    "your mom doesn't love you",
];
//====================================

let genresDisplay = document.querySelector("#genres");
const createGenre = (genre) => {
    let genreElement = `<li><a class="dropdown-item" href="#">${genre}</a></li>`;
    // playlists.appendChild(display_playlists);
    genresDisplay.innerHTML += genreElement;
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
        albumName: "Variety",
        songName: "Plastic Love",
        author: "Mariya Takeuchi",
        albumImage: "./resources/PLL1.jpg",
    },
];
let songResult_display = document.querySelector("#songResult");
const createSongResult = (songDetail) => {
    // let songTag = `   <li class="list-group-item" onclick="refresh(${songData})">${songData.songName} --${songData.author}</li>`;
    // let songTag = `   <li class="list-group-item" >${songDetail.songName} --${songDetail.author}</li>`;
    // let songTag = `   <li class="list-group-item" onclick="refreshSongCard(${songDetail})">${songDetail.songName} --${songDetail.author}</li>`;
    let songTag = `   <li class="list-group-item"
    onclick="refreshSongCard(
    '${encodeURIComponent(JSON.stringify(songDetail))}')"
    >
    ${songDetail.songName} --${songDetail.author}</li>`;
    // console.log(JSON.stringify(songDetail));
    songResult_display.innerHTML += songTag;
};

//===========================
let songCard = document.querySelector("#songDetail_Card");

const refreshSongCard = (songDetail) => {
    songDetail = JSON.parse(decodeURIComponent(songDetail));
    console.log(songDetail);
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
                    </div>`;
    songCard.innerHTML = card;
    console.log(songDetail);
};

//===========================
const test = (function () {
    clear(playlistsDisplay);
    clear(genresDisplay);
    clear(songResult_display);
    for (const playlist of playlists) {
        createPlaylist(playlist);
    }
    for (const genre of genres) {
        createGenre(genre);
    }
    songResult_display.innerHTML += `<li
    class="list-group-item disabled"
    aria-disabled="true">
    Result
</li>`;
    for (const song of SongResult) {
        createSongResult(song);
    }

    //===
    // for (const song of SongResult) {
    //     refreshSongCard(song);
    // }
})();
