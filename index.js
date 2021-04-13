const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

getMovieData(API_URL);

async function getMovieData(API) {
    var resp = await fetch(API);
    var respData = await resp.json();
    console.log(respData);
    showMovies(respData);
}

function showMovies(data) {
    const main = document.getElementById('mainn');

    data.results.forEach((data) => {
        var NewText = "";
        if (data.title.length > 12 || data.overview.length == 12) {
            for (var i = 0; i < 12; i++) {
                NewText += data.title[i];
            }
        } else {
            NewText += data.title;
        }
        var Punk = "";
        if (data.overview.length > 250 || data.overview.length == 250) {
            Punk += "...";
        } else {
            Punk = "";
        }
        var Movie = document.createElement('div');
        Movie.classList.add('item');

        Movie.innerHTML = `
        <div class="latest-box">
            <div class="latest-b-img">
                <img src="${IMGPATH + data.poster_path}" alt="">
            </div>
            <div class="latest-b-text">
                <strong>${NewText}</strong>
                <p>${data.vote_average}/10</p>
            </div>
        </div>
        `;

        main.appendChild(Movie);
    })
}

$(document).ready(function() {
    $('#autoWidth').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
            $('#autoWidth').removeClass('cS-hidden');
        }
    })
})

getActionMovies();

async function getActionMovies() {
    var resp = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&with_genres=28');
    var respData = await resp.json();

    console.log(respData);
    showActionMovies(respData);
}

function showActionMovies(data) {
    const movies = document.getElementById('movies-list');
    
    data.results.forEach((data) => {
        var Movie_Box = document.createElement('div');
        Movie_Box.classList.add('movies-box');

        var NewText = "";
        if (data.title.length > 20) {
            for (var i = 0; i < 20; i++) {
                NewText += data.title[i];
            }
        } else {
            NewText += data.title;
        }
        var Punk = "";
        if (data.title.length > 20 || data.title.length == 20) {
            Punk += "...";
        } else {
            Punk = "";
        }

        Movie_Box.innerHTML = `
            <div class="movies-img">
            <div class="quality">Vote Average ${data.vote_average}/10 | Vote Count ${data.vote_count}</div>
                <img src="${IMGPATH + data.poster_path}" alt="">
            </div>
            <a href="#">
                ${NewText + Punk}
            </a>
        `;

        movies.appendChild(Movie_Box);
    })

}


document.getElementById('search-icon').addEventListener('click', () => showResults());

async function showResults() {
    document.getElementById('mainnn').innerHTML = "";
    var querys = document.getElementById('search').value;
    console.log(querys);

    var resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${querys}`);
    var respData = await resp.json();
    console.log(respData);
    document.getElementById('search').value = "";
    query(respData);
}

function query(data) {
    const main = document.getElementById('mainnn');
    document.getElementById('search_res').style.display = "block";

        data.results.forEach((data) => {
            var NewText = "";
            if (data.title.length > 12 || data.overview.length == 12) {
                for (var i = 0; i < 12; i++) {
                    NewText += data.title[i];
                }
            } else {
                NewText += data.title;
            }
            var Punk = "";
            if (data.overview.length > 250 || data.overview.length == 250) {
                Punk += "...";
            } else {
                Punk = "";
            }
            var Movie = document.createElement('div');
            Movie.classList.add('item');
    
            Movie.innerHTML = `
            <div class="latest-box">
                <div class="latest-b-img">
                    <img src="${IMGPATH + data.poster_path}" alt="">
                </div>
                <div class="latest-b-text">
                    <strong>${NewText}</strong>
                    <p>${data.vote_average}/10</p>
                </div>
            </div>
            `;
    
            main.appendChild(Movie);
        })

}

function hide() {
    document.getElementById('mainnn').innerHTML = "";
    document.getElementById('search_res').style.display = "none";

}