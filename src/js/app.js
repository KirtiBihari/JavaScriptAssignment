
 import {CommonAPIService} from './CommonAPIService.js';
 import {Append} from './append.js';

 let commonApi = new CommonAPIService();
 let appendObj=new Append();

 export class App{
     constructor(){

     }


  init = function() {
    document.addEventListener('DOMContentLoaded', function(){
        commonApi.getConfig();
        $('#btn_moviesearch').click(onSearchClick);
        createCollectionFormBind();
    });
    
}

onSearchClick = function(evt) {
    let searchtext = $('#input_moviesearch').val().trim();
    searchByKey('movie', searchtext);
}

onPopularMovieClick = function(evt) {
    let currentEle = evt.currentTarget;
    getMovieInfoById('movie', currentEle.id.substr(1))
};






createCollectionFormBind=function(){
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


 //example.updatedata("kk");
}