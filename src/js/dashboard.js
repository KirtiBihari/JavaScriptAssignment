(function () {

    let TopCollectionLocal = [];
    let DefaultCollectionCtaegory = [];
    let createDefaultCollection = () => {
        TopCollectionLocal.push(TopCollectionObject(TopCollectionLocal.length + 1, "Action", "Action films are a film genre where action sequences, such as fighting, stunts, car chases or explosions, take precedence over elements like characterization or complex plotting. The action typically involves individual efforts on the part of the hero, in contrast with most war films."));
        TopCollectionLocal.push(TopCollectionObject(TopCollectionLocal.length + 1, "Animation", "Animated Films are ones in which individual drawings, paintings, or illustrations are photographed frame by frame (stop-frame cinematography). Usually, each frame differs slightly from the one preceding it, giving the illusion of movement when frames are projected in rapid succession at 24 frames per second."));
        TopCollectionLocal.push(TopCollectionObject(TopCollectionLocal.length + 1, "Comedy", "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect. Films in this style traditionally have a happy ending (black comedy being an exception)."));
    }
    let createJsonData = (key, val) => {
        localStorage.setItem(key, val);
    }
    let updateJsonData= (key, val)=>{
        localStorage.setItem(key, val);
    }
    let getStorageData = (key) => {
        if (!(localStorage.getItem(key) == null)) {
            return localStorage.getItem(key);
        }
        return null;
    }
    let TopCollectionObject = (id, name, desc) => {
        let obj = new Object();
        obj.Id = id;
        obj.Name = name;
        obj.Description = desc;
        obj.Movies = [];
        return obj;
    }


   
    // let apiKey="43f4a6bcfb684cb473229f4869508de4";
    let baseURL = 'https://api.themoviedb.org/3/';
    let APIKEY = "43f4a6bcfb684cb473229f4869508de4";
    let configData = null;
    let baseImgURL = null;
    let searchtext = "";
    let maxPopularTiles = 6;
    let maxCollectionTiles=4;
    let demoData = { "images": { "base_url": "http://image.tmdb.org/t/p/", "secure_base_url": "https://image.tmdb.org/t/p/", "backdrop_sizes": ["w300", "w780", "w1280", "original"], "logo_sizes": ["w45", "w92", "w154", "w185", "w300", "w500", "original"], "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"], "profile_sizes": ["w45", "w185", "h632", "original"], "still_sizes": ["w92", "w185", "w300", "original"] }, "change_keys": ["adult", "air_date", "also_known_as", "alternative_titles", "biography", "birthday", "budget", "cast", "certifications", "character_names", "created_by", "crew", "deathday", "episode", "episode_number", "episode_run_time", "freebase_id", "freebase_mid", "general", "genres", "guest_stars", "homepage", "images", "imdb_id", "languages", "name", "network", "origin_country", "original_name", "original_title", "overview", "parts", "place_of_birth", "plot_keywords", "production_code", "production_companies", "production_countries", "releases", "revenue", "runtime", "season", "season_number", "season_regular", "spoken_languages", "status", "tagline", "title", "translations", "tvdb_id", "tvrage_id", "type", "video", "videos"] }
    let ViewIds=['#dashboardContent', '#movieDetailContent', '#searchmoviesContent', '#userCollectionListContent' ]
    let currentMovieDetails=null;
    let currentCollectionDetails=null;
    let currentViewName="dashboardContent";

    let updateDisplayViews=(viewName)=>{
        switch (viewName) {
            case "dashboardContent":
                show_hide_Element(false, ViewIds);
                show_hide_Element(true, ['#dashboardContent']);
                getPopularDataListByCategory('movie');
                populateTopCollectionCards();
                
                break;
            case "movieDetailContent":
                show_hide_Element(false, ViewIds);
                show_hide_Element(true, ['#movieDetailContent']);
                break;
            case "searchmoviesContent":
                show_hide_Element(false, ViewIds);
                show_hide_Element(true, ['#searchmoviesContent']);
                break;
            case "userCollectionListContent":
                show_hide_Element(false, ViewIds);
                show_hide_Element(true, ['#userCollectionListContent']);
                

                break;
            default:
                break;
           
        }

    }

    //loader
    let show_hide_Element = (isShow, containerKeys) => {
        if (isShow) {
            for (let item of containerKeys) {
                $(item).show();
            }
        } else {
            for (let item of containerKeys) {
                $(item).hide();
            }
        }
    }
    let showLoader=()=>{
        $('#movieloader').show();
    }
    let hideLoader=()=>{
        $('#movieloader').hide();
    }
    let getConfig = () => {
        //baseImgURL = "http://image.tmdb.org/t/p/";
        //generatePopularList(MovieData.results, 'movie');

        showLoader();
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
            let searchtext = $('#input_moviesearch').val().trim();
            if(searchtext.length > 0){
              searchByKey('movie', searchtext);
            }else{
              getPopularDataListByCategory('movie');
            }
            hideLoader();
          })
          .catch(function (err) {
            alert(err);
          });
    }

    let searchByKey = (mediaType, keyword) => {
        showLoader();
        let apiurl = baseURL + 'search/' + mediaType + '?api_key=' + APIKEY + '&query=' + keyword;
        fetch(apiurl)
            .then(result => result.json())
            .then((data) => {
                hideLoader();
                //process the returned data
                //document.getElementById('output').innerHTML = JSON.stringify(data, null, 4);
                //work with results array...
                console.log(data);
                appendsearchlist(data.results, 'search-movies');


            })
    }

    let getPopularDataListByCategory = (mediaType, pageNo = 1) => {
        showLoader();
        let apiurl = baseURL + mediaType + '/popular?api_key=' + APIKEY + '&language=en-US&page=' + pageNo;
        fetch(apiurl)
            .then(result => result.json())
            .then((data) => {
                hideLoader();
                //process the returned data
                generatePopularList(data.results, mediaType);
            })

        // $.get( "https://api.themoviedb.org/3/movie/popular?api_key=43f4a6bcfb684cb473229f4869508de4&language=en-US&page=1")
        // .done(function( data ) {

        //   console.log( "Data Loaded: ");
        //   console.log(data.results);
        //   movieDB = data;
        // });
    }



    let getMovieInfoById = (mediaType, movieId) => {
        showLoader();
        let apiurl = baseURL + mediaType + '/' + movieId + '?api_key=' + APIKEY;
        fetch(apiurl)
            .then(result => result.json())
            .then((data) => {
                hideLoader();
                //process the returned data
                appendMovieInfo(data, 'movieDetailContent');
            })
    }

    let navBarNavigationBind=()=>{
        $('#nav-dashboard').click(function(){
            currentViewName="dashboardContent";
            updateDisplayViews(currentViewName);
        });
        $('#nav-usercol').click(function(){
           moreUserCollection();
        })
    }

    let init = () => {
        document.addEventListener('DOMContentLoaded', function () {
            navBarNavigationBind();
            let topcollectionList = getStorageData("TopCollection");
            if (topcollectionList) {
                TopCollectionLocal = JSON.parse(topcollectionList);
            } else {
                createDefaultCollection();
            }
            populateTopCollectionCards();

            getConfig();
            $('#btn_moviesearch').click(onSearchClick);
            $('#input_moviesearch').keydown(function (event) {
                var keypressed = event.keyCode || event.which;
                if (keypressed == 13) {
                    onSearchClick(event);
                }
            });

            $('#btn-morecollection').click(moreUserCollection);

            createCollection();

            $('#mlist').sortable();
            $('#mlist').disableSelection();
        });

    }
    let onSearchClick = (evt) => {
        let searchtext = $('#input_moviesearch').val().trim();
        searchByKey('movie', searchtext);
    }

    let onPopularMovieClick = (evt) => {
        let currentEle = evt.currentTarget;
        getMovieInfoById('movie', currentEle.id.substr(1))
    };


    //show_hide_loader(false);







    let generatePopularList = (datalist, mediaType) => {
        if (mediaType.toLowerCase() == 'tv') {
            //appendpopularlist(datalist, 'popular-movies');
        } else if (mediaType.toLowerCase() == 'movie') {
            appendpopularlist(datalist, 'popular-movies');
        }
    }


    //Append html content
    let appendpopularlist = (datalist, containerid) => {
        let appendContainer = $('#' + containerid);
        appendContainer.html('');
        if (datalist.length > 0) {
            let popularTileItems = datalist.slice(0, maxPopularTiles);
            for (let i of popularTileItems) {
                let htmlcontent = $(`<div id="m` + i.id + `" class="col-lg-4 col-md-6 col-sm-12 px-0 moviecard">
                                <a class="movie-info" href="#">
                                    <img src="`+ baseImgURL + `w342/` + i.poster_path + `" alt="` + i.title + `">
                                    <div class="info">
                                        <span class="info-name d-block text-light">`+ i.title + `</span>
                                    </div>
                                </a>
                          </div>`);

                htmlcontent.appendTo(appendContainer);
                $('#m' + i.id).click(onPopularMovieClick);
            }
        } else {
            let htmlcontent = $(`<div class="col-lg-12 col-md-12 col-sm-12 px-0">
                          <h3>No Movies Available</h3>
                        </div>`);
            htmlcontent.appendTo(appendContainer);
        }
    }

    let appendsearchlist = (datalist, containerid) => {
        currentViewName="searchmoviesContent";
        updateDisplayViews(currentViewName);
        let appendContainer = $('#' + containerid);
        appendContainer.html('');
        if (datalist.length > 0) {
            for (let i of datalist) {
                let htmlcontent = $(`<div class="col-lg-6 col-md-12 col-sm-12 px-0">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="image_content">
                            <img class="poster" src="`+ baseImgURL + `w342/` + i.poster_path + `" alt="` + i.title + `">
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-6 col-sm-12">
                        <div class="percentage">
                            <div class="c100 p`+ Math.floor(i.popularity) +` blue">
                                <span>`+ Math.floor(i.popularity) + `%</span>
                                <div class="slice">
                                    <div class="bar"></div>
                                    <div class="fill"></div>
                                </div>
                            </div>
                            <div class="text">`+ i.original_title + `
                                <br>(`+ i.release_date + `)</div>
                        </div>

                        <p class="overview">`+ i.overview + `
                        </p>
                        <hr>
                        <a id="sItem_`+i.id+`" href="#">More Info</a>
                    </div>
                </div>
            </div>`);

                htmlcontent.appendTo(appendContainer);
                $('#sItem_' + i.id).click(movieMoreInfoClick);
            }
        } else {
            let htmlcontent = $(`<div class="col-lg-12 col-md-12 col-sm-12 px-0">
                          <h3>No Movies Available</h3>
                        </div>`);
            htmlcontent.appendTo(appendContainer);
        }
    }

let movieMoreInfoClick= (evt) => {
    let currentEle = evt.currentTarget;
    getMovieInfoById('movie', currentEle.id.substr(6))
};

    let appendMovieInfo = (data, containerid) => {
        currentViewName="movieDetailContent";
        updateDisplayViews(currentViewName);
        let appendContainer = $('#' + containerid);
        appendContainer.html('');
        currentMovieDetails=data;
        let htmlcontent = $(`<section id="sec`+data.id+`" class="images inner">
    <div class="movie-details container">
        <div class="row">
            <div class="col-lg-4 col-md-3 col-sm-12">
                <div class="image_content">
                    <img class="poster" src="`+ baseImgURL + `w300_and_h450_bestv2/` + data.poster_path + `" alt="` + data.original_title + `">
                </div>
            </div>
            <div class="col-lg-8 col-md-9 col-sm-12">
                <div class="title">
                    <span>
                        <a href="#">
                            <h2>`+ data.original_title + `</h2>
                        </a>
                        <span class="release_date">(`+ data.release_date + `)</span>
                    </span>
                </div>

                <ul class="actions">
                    <li>
                        <div class="percentage">
                            <div class="c100 p`+Math.floor(data.popularity)+` blue">
                                <span>`+ Math.floor(data.popularity) + `%</span>
                                <div class="slice">
                                    <div class="bar"></div>
                                    <div class="fill"></div>
                                </div>
                            </div>
                            <span class="text">User
                                <br>Score</span>
                        </div>
                    </li>
                    <li>
                        <div class="editOption">
                            <i class="fa fa-list" aria-hidden="true"></i>
                        </div>
                    </li>
                    <li>
                        <div class="addfavorite">
                            <i class="fa fa-heart" aria-hidden="true"></i>
                        </div>
                    </li>
                    <li>
                        <div class="rating">
                            <i class="fa fa-star" aria-hidden="true"></i>
                        </div>
                    </li>
                </ul>
                <div class="overview-content">
                    <h3>Overview</h3>
                    <div class="overview">
                        <p>`+ data.overview + `
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`);
        htmlcontent.appendTo(appendContainer);
        $("#sec"+data.id+" .editOption").click(onMovieEditToCollection);
    }

    let onMovieEditToCollection=(e)=>{
        
        $(".form-row #lbl_mName").text(currentMovieDetails.title);
        let modalColComboBox= $(".form-row #selcolletion");
        for(let i of TopCollectionLocal){
            modalColComboBox.append(`<option id="copt`+i.Id+`">
                                        `+i.Name+`
                                    </option>`);
        }

        $("#addMovieToCollectionModal").modal('show');
        $("#btn-addmovie").click(function (e) {
            let form = $('#addmovieform')[0];
            let selectedOptionId=$('.form-row #selcolletion option:selected')[0].id;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
            addMovieToCollection(selectedOptionId.substr(4), currentMovieDetails);
        });
    }

    
    

    let populateTopCollectionCards = () => {
        let appendContainer = $('#topcollection-movies');
        appendContainer.html('');
        if (TopCollectionLocal.length > 0) {
            let showCollectionItems=TopCollectionLocal.length >4? TopCollectionLocal.slice(0, maxCollectionTiles):TopCollectionLocal;
            for (let i of showCollectionItems) {
                appendTopCollectionCards(i, 'topcollection-movies');
            }
        } else {
            let htmlcontent = $(`<div class="col-lg-12 col-md-12 col-sm-12 px-0 text-center">
                          <h5>No Collection Available</h5>
                        </div>`);
            htmlcontent.appendTo(appendContainer);
        }


    }
    let appendTopCollectionCards = (data, containerid) => {
        let appendContainer = $('#'+containerid);
        let htmlcontent = $(`<div id="c` + data.Id + `" class="col-lg-3 col-md-4 col-sm-12">
        <div class="card">
            <div class="collection-tag">`+ data.Name + `</div>
            <div class="card-body">
                <p class="card-text">`+ data.Description + `
                </p>
            </div>
            <div class="action-tools">
            <a id="del` + data.Id + `" href="#" class="btn btn-dark"><i class="fa fa-times-circle-o" aria-hidden="true"></i></a>
            <a id="edit` + data.Id + `" href="#" class="btn btn-dark"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
            </div>
        </div>
    </div>`);
        htmlcontent.appendTo(appendContainer);
        // $('#c' + data.Id).click(onCollectionClick);
        $('#edit' + data.Id).click(onCollectionClick);
        $('#del' + data.Id).click(onDeleteCollectionClick);

    }



    let createCollection = () => {
        $("#btn-addCollection").click(function (e) {
            let form = $('#addcollectionform')[0];
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
            addTopCollection($('#cName').val().trim(), $('#cDesc').val().trim());
        });
    }


    let addTopCollection = (name, desc) => {
        let newCollection = TopCollectionObject(TopCollectionLocal.length + 1, name, desc);
        TopCollectionLocal.push(newCollection);
        createJsonData("TopCollection", JSON.stringify(TopCollectionLocal));
        if($('#topcollection-movies').children().length < 4){
            appendTopCollectionCards(newCollection, 'topcollection-movies');
        }
    }
    let addMovieToCollection=(cId, mdata)=>{
        let cindex = TopCollectionLocal.findIndex(x => x.Id == cId);
        if( cindex != -1){
            let existMovieIndex=TopCollectionLocal[cindex].Movies.findIndex(x => x.id == mdata.id);
            if(existMovieIndex == -1){
                TopCollectionLocal[cindex].Movies.push(mdata);
                updateJsonData("TopCollection", JSON.stringify(TopCollectionLocal));
                showSnackBar("'"+mdata.title +"' Movie successfully added");
            }
        }
    }
    let editMovieToCollection=(cId, editCNamem, editCDesc, editMovieData)=>{
        let cindex = TopCollectionLocal.findIndex(x => x.Id == cId);
        if( cindex != -1){
            TopCollectionLocal[cindex].Name=editCNamem;
            TopCollectionLocal[cindex].Description=editCDesc;
            TopCollectionLocal[cindex].Movies=[];
            TopCollectionLocal[cindex].Movies=editMovieData;
            updateJsonData("TopCollection", JSON.stringify(TopCollectionLocal));
            showSnackBar("'"+editCNamem +"' Collection successfully Updated");
            currentCollectionDetails = null;
            updateDisplayViews(currentViewName);
        }
    }
    let appenduserCollections = () => {
        let appendContainer = $('#userCollection');
        appendContainer.html('');
        if (TopCollectionLocal.length > 0) {
            for (let i of TopCollectionLocal) {
                appendTopCollectionCards(i, 'userCollection');
            }
        }
        else {
            let htmlcontent = $(`<div class="col-lg-12 col-md-12 col-sm-12 px-0 text-center">
                          <h5>No Collection Available</h5>
                        </div>`);
            htmlcontent.appendTo(appendContainer);
        }


    }
    let moreUserCollection=()=>{
        currentViewName="userCollectionListContent";
        updateDisplayViews(currentViewName);
        appenduserCollections();
    }
    let onCollectionClick = (e) => {
        let currentEle=e.currentTarget;
        let coll_Id=currentEle.id.substr(4);
        currentCollectionDetails = jQuery.extend(true, {}, TopCollectionLocal.filter(function(i){ return i.Id == coll_Id })[0]);
        $(".form-row #editcName").val(currentCollectionDetails.Name);
        $(".form-row #editcDesc").val(currentCollectionDetails.Description);
        let ul_movies= $(".form-row #mlist");
        ul_movies.html('');
        if(currentCollectionDetails.Movies == null){
            currentCollectionDetails.Movies=[];
        }
        if(currentCollectionDetails.Movies.length > 0){

            for (let i of currentCollectionDetails.Movies) {
                ul_movies.append(`<li id="mopt`+i.id+`">
                <div class="mName" data-toggle="tooltip" data-placement="top" title="`+i.title+`"><span class="mImg">
                <img class="poster" src="`+ baseImgURL + `w92/` + i.poster_path + `" alt="` + i.original_title + `">
                </span>`+i.title+`</div>
                <a id="mdel_`+i.id+`" href="#" class="btn btn-light btn-addtocol"><i class="fa fa-times-circle-o" aria-hidden="true"></i></a>
            </li>`);
            $("#mdel_"+i.id).click(onMovieDelFromCollection);
            }
        }else{
            ul_movies.append(`<li id="mopt_noitem" class="text-center no-movies">
            <h5>No movies</h5>
            </li>`);
        }

        
        $("#movielistInCollectionModal").modal('show');
        $("#btn-savecollection").click(function (e) {
           
            let form = $('#movielistInCollectionform')[0];
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
            editMovieToCollection(coll_Id, $('#editcName').val().trim(), $('#editcDesc').val().trim(), currentCollectionDetails.Movies);
        });
    }
    let onMovieDelFromCollection=(e)=>{
        let currentEle=e.currentTarget;
        let movie_Id=currentEle.id.substr(5);
        let mindex= currentCollectionDetails.Movies.findIndex(x => x.id == movie_Id);
        currentCollectionDetails.Movies.splice(mindex,1);
        $("#mopt"+movie_Id).remove();
        if(currentCollectionDetails.Movies.length == 0){
            let ul_moviesEle= $(".form-row #mlist");
            ul_moviesEle.append(`<li id="mopt_noitem" class="text-center no-movies">
            <h5>No movies</h5>
            </li>`);
        }
        
    }

    let onDeleteCollectionClick=(e)=>{
        let currentEle=e.currentTarget;
        let coll_Id=currentEle.id.substr(3);
        let cindex = TopCollectionLocal.findIndex(x => x.Id == coll_Id);
        let colName= TopCollectionLocal[cindex].Name;
        $(".modal-body #c_d_msg").text('Are you sure to delete "'+colName+'" collection?');
        $("#collectiondeleteConfirmModal").modal('show');
        $("#btn-deletecol").click(function (e) {
            
            TopCollectionLocal.splice(cindex,1);
            createJsonData("TopCollection", JSON.stringify(TopCollectionLocal));
            populateTopCollectionCards();
            showSnackBar('"'+colName+'" collection successfully deleted.');
            $("#collectiondeleteConfirmModal").modal('hide');
            updateDisplayViews(currentViewName);
        }); 
        
    }
 

    






    //Call init function
    init();

//Utility Methods
let getParentByTagName=(node, tagname)=> {
	var parent;
	if (node === null || tagname === '') return;
	parent  = node.parentNode;
	tagname = tagname.toUpperCase();

	while (parent.tagName !== "HTML") {
		if (parent.tagName === tagname) {
			return parent;
		}
		parent = parent.parentNode;
	}

	return parent;
}

let showSnackBar=(text)=>{
    var snackEle = $("#snackbar");
    snackEle.text(text);
    snackEle.show();
   setTimeout(function(){ snackEle.hide(); }, 3000);
}

})();