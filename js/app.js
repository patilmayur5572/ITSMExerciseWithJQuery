
(function(){
    //Create the XHR Object
let xhr = new XMLHttpRequest;
var productionCompanies = [];
//Call the open function, GET-type of request, url, true-asynchronous
//Key removed for Security Reasons
xhr.open('GET', 'https://api.themoviedb.org/3/movie/550?api_key=XXXXXXXXXXXXXXXXXXXXXXX', true)
//call the onload 
xhr.onload = function() 
    {
        //check if the status is 200(means everything is okay)
        if (this.status === 200) 
            {
                //return server response as an object with JSON.parse
                let movieData = JSON.parse(this.responseText);
                productionCompanies = movieData.production_companies;
                setData(movieData);
            }else{
                alert("Something went wrong with server!!")
            }
    }
//call send
xhr.send();


//Function to set data within document and bind it to HTML
function setData(movieData){
    
        $("#moviePoster").attr("src","https://image.tmdb.org/t/p/w500"+ movieData.poster_path);
        $("#movieTitle").text(movieData.original_title);
        $("#movieOverview").text(movieData.overview);
    
        var productionWithLogos = [];
        var productionWithoutLogos = [];
    
        productionCompanies.forEach(function(element) {
            if(element.logo_path !=null){
                productionWithLogos.push(element);            
            }
            else{
                productionWithoutLogos.push(element);            
            }
        });
    
            displayWithLogos(productionWithLogos);
            displayWithoutLogos(productionWithoutLogos);       
    }
    
    //Function to display Logos of the Production House
    function displayWithLogos(productionWithLogos){
        productionWithLogos.forEach(function(element) {
            var img = $('<img />').attr({
                'id': 'productionHouse' + element.id,
                'src': "https://image.tmdb.org/t/p/w500"+ element.logo_path,
                'alt': element.name,
                'title': element.name,
                'height':'20%', 
                'width':'20%'
            }).appendTo('#productionCompanies');
        });
    }
    
    //Function to diplay just Names of the Production Hosue WITHOUT Logos
    function displayWithoutLogos(productionWithoutLogos){
        productionWithoutLogos.forEach(function(element) {       
            $("<p/>").attr({'id': 'productionHouse' + element.id}).text(element.name).appendTo('#productionCompaniesWithoutLogo');            
        });
    }
})();

