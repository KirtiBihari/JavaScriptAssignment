import {Append} from './append.js';

let appendMethod=new Append();

export class CommonAPIService {
    

    baseURL = 'https://api.themoviedb.org/3/';
    APIKEY = "43f4a6bcfb684cb473229f4869508de4";
    configData = null;
    baseImgURL = null;
    searchtext = "";
    maxPopularTiles = 6;
    demoData = { "images": { "base_url": "http://image.tmdb.org/t/p/", "secure_base_url": "https://image.tmdb.org/t/p/", "backdrop_sizes": ["w300", "w780", "w1280", "original"], "logo_sizes": ["w45", "w92", "w154", "w185", "w300", "w500", "original"], "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"], "profile_sizes": ["w45", "w185", "h632", "original"], "still_sizes": ["w92", "w185", "w300", "original"] }, "change_keys": ["adult", "air_date", "also_known_as", "alternative_titles", "biography", "birthday", "budget", "cast", "certifications", "character_names", "created_by", "crew", "deathday", "episode", "episode_number", "episode_run_time", "freebase_id", "freebase_mid", "general", "genres", "guest_stars", "homepage", "images", "imdb_id", "languages", "name", "network", "origin_country", "original_name", "original_title", "overview", "parts", "place_of_birth", "plot_keywords", "production_code", "production_companies", "production_countries", "releases", "revenue", "runtime", "season", "season_number", "season_regular", "spoken_languages", "status", "tagline", "title", "translations", "tvdb_id", "tvrage_id", "type", "video", "videos"] }
    constructor() {
     
    }

    //Show/Hide Element
    show_hide_Element = (isShow, containerKey) => {
      let Ele = $(containerKey);
      if (isShow) {
          Ele.show();
      } else {
          Ele.hide();
      }
  }


  getConfig = () => {
    // baseImgURL = "http://image.tmdb.org/t/p/";
    // generatePopularList(MovieData.results, 'movie');

    show_hide_loader(true);
    let apiurl = baseURL + 'configuration?api_key=' + APIKEY;
    fetch(apiurl)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        baseImgURL = data.images.secure_base_url;
        configData = data.images;
        console.log('config:', data);
        console.log('config fetched');
        let searchtext = $('#input_search').val().trim();
        if(searchtext.length > 0){
          this.searchByKey('movie', searchtext);
        }else{
          this.getPopularDataListByCategory('movie');
        }
      })
      .catch(function (err) {
        console.log(err);
      });
}

searchByKey = (mediaType, keyword) => {
  let apiurl = baseURL + 'search/' + mediaType + '?api_key=' + APIKEY + '&query=' + keyword;
  fetch(apiurl)
      .then(result => result.json())
      .then((data) => {
          //process the returned data
          //document.getElementById('output').innerHTML = JSON.stringify(data, null, 4);
          //work with results array...
          console.log(data);
          appendMethod.appendpopularlist(data.results, 'popular-movies');


      })
}

getPopularDataListByCategory = (mediaType, pageNo = 1) => {
  let apiurl = baseURL + mediaType + '/popular?api_key=' + APIKEY + '&language=en-US&page=' + pageNo;
  fetch(apiurl)
      .then(result => result.json())
      .then((data) => {
          //process the returned data
          this.generatePopularList(data.results, mediaType);
      })

  // $.get( "https://api.themoviedb.org/3/movie/popular?api_key=43f4a6bcfb684cb473229f4869508de4&language=en-US&page=1")
  // .done(function( data ) {

  //   console.log( "Data Loaded: ");
  //   console.log(data.results);
  //   movieDB = data;
  // });
}

generatePopularList = (datalist, mediaType) => {
  if (mediaType.toLowerCase() == 'tv') {
      //appendpopularlist(datalist, 'popular-movies');
  } else if (mediaType.toLowerCase() == 'movie') {
      appendMethod.appendpopularlist(datalist, 'popular-movies');
  }
}

getMovieInfoById = (mediaType, movieId) => {
  let apiurl = baseURL + mediaType + '/' + movieId + '?api_key=' + APIKEY;
  fetch(apiurl)
      .then(result => result.json())
      .then((data) => {
          //process the returned data
          appendMovieInfo(data, 'movieDetailContent');
      })
}

createCollectionFormBind=()=>{
  alert();
  var forms = $('.needs-validation');
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}


    updatedata(camera) {
      //...
      console.log(camera);
    }
   
  }
  
  