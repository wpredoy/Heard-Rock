// Get html id
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result")

// Get API
const apiURL = "https://api.lyrics.ovh";

// Output show display
async function searchSong(song) {
   const res = await fetch(`${apiURL}/suggest/${song}`)
    const data = await res.json()
    .then(data => {
        const number = data.data;
        let output = '';

        
        for(let i=0; i<10; i++) {
            const title = number[i].title;
            const artistName = number[i].artist.name;
            const picture = number[i].artist.picture;
            console.log(picture)
           
            output += `
                        <li>
                            <span><img class="well" src="${picture}"><strong>${title}</strong> - <br> ${artistName}</span>
                            <button class="btnClass" data-artist ="${artistName}"
                            data-songTitle = "${title}">Get Lyrics</button>
                        </li>
                        `;
        }
        result.innerHTML = `
        <ul class="songs">
            ${output}
        </ul>
    `;
    })
}

//  click submit area
form.addEventListener('submit', submitForm=>{
    submitForm.preventDefault();
    const searchTerm = search.value;
    if(!searchTerm) {
        alert("Please type in a search term")
    }
    else {
        searchSong(searchTerm)
    }
})


// Get lyrics button Click

result.addEventListener("click", clickArea => {
    const clickedElement = clickArea.target;

    if(clickedElement.tagName === "BUTTON") {
       const artist = clickedElement.getAttribute("data-artist");
       const songTitle = clickedElement.getAttribute("data-songtitle");

       getLyrics(artist, songTitle)
    }
})


// Get lyrics for song

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data= await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result2.innerHTML = `<h2><strong>${songTitle}</strong> - ${artist}</h2>
    <hr>
    <p>${lyrics}</p>
    `;

    
}
