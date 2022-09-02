const API_controller = (function () {
    const clientId = "a8ab14dd726d49989bc6acf948555f01";
    const clientSecret = "3e3d89f808664c6b8877e82582dbcd7e";

    //private methods
    const _getToken = async () => {
        const result = await fetch("https://accounts.spotify.com/api/token", {
            // call spotify token endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
            },
            body: "grant_type=client_credentials",
        });
        const data = await result.json();
        return data.access_token;
    };

    const _getGenres = async (token) => {
        const result = await fetch(
            `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
            {
                method: "GET",
                headers: { Authorization: "Bearer " + token },
            }
        );

        const data = await result.json();
        return data.categories.items;
    };

    const _getPlaylistByGenre = async (token, genreId) => {
        const limit = 10;

        const result = await fetch(
            `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
            {
                method: "GET",
                headers: { Authorization: "Bearer " + token },
            }
        );

        const data = await result.json();
        return data.playlists.items;
    };

    const _getTracks = async (token, tracksEndPoint) => {
        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        });

        const data = await result.json();
        return data.items;
    };
    const _getTrack = async (token, trackEndPoint) => {
        const result = await fetch(`${trackEndPoint}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        });

        const data = await result.json();
        return data;
    };
    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        },
    };
})();

const APPController = (function (APICtrl) {
    // get input field object ref

    // get genres on page load
    const loadGenres = async () => {
        //get the token
        const token = await APICtrl.getToken();
        //store the token onto the page
        //get the genres
        const genres = await APICtrl.getGenres(token);
        //populate our genres select element
        clear(genresDisplay);
        genres.forEach((element) => {
            // console.log(element);
            // console.log(token);
            storedToken = token;
            // console.log(element.id);
            createGenre(element.name, element.id);
        });
    };

    return {
        init() {
            console.log("App is starting");
            loadGenres();
        },
    };
})(API_controller);

// will need to call a method to load the genres on page load
APPController.init();
