export class Append {

appendpopularlist = (datalist, containerid) => {
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
        let htmlcontent = $(`<div class="col-lg-4 col-md-6 col-sm-12 px-0">
                      <h3>No Movies Available</h3>
                    </div>`);
        htmlcontent.appendTo(appendContainer);
    }
}

appendMovieInfo = (data, containerid) => {
    show_hide_Element(true, '#' + containerid);
    show_hide_Element(false, '#dashboardContent');

    let appendContainer = $('#' + containerid);
    appendContainer.html('');
    let htmlcontent = $(`<section class="images inner">
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
                    <span class="release_date">`+ data.release_date + `</span>
                </span>
            </div>

            <ul class="actions">
                <li>
                    <div class="percentage">
                        <div class="c100 p90 blue">
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

}

}