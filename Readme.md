// pass object into onclick
if your write it as

```
  let songTag = `   <li class="list-group-item"
    onclick="refreshSongCard(
    '${songDetail}')"
    >
    something</li>`;
    songResult_display.innerHTML += songTag;
```

then the songTag will has onclick as "refreshSongCard([object, object])"
thus it will be have some error

solution:
encode it in onclick

```
  let songTag = `   <li class="list-group-item"
    onclick="refreshSongCard(
    '${encodeURIComponent(JSON.stringify(songDetail))}')"
    >
    ${songDetail.songName} --${songDetail.author}</li>`;
    // console.log(JSON.stringify(songDetail));
    songResult_display.innerHTML += songTag;
```

    and decode it when using the data

```
const refreshSongCard = (songDetail) => {
    songDetail = JSON.parse(decodeURIComponent(songDetail));
```
