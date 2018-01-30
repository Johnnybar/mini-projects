(function(){

var btn = $("#go")
var more = $("#more")
var nextUrl;
var offset = 0;
var infiniteCheck = location.search.indexOf('scroll==infinite') > -1;

function checkScroll(){
        var windowHeight = $(window).height();
        var docHeight = $(document).height();
        var scrollTop = $(document).scrollTop();
        if(scrollTop + windowHeight >= docHeight - 10){
            if(infiniteCheck){
                more.trigger('click');
            }
        }
        else {
            setTimeout(checkScroll, 500)
        }
}

btn.on('click', function() {
    var inp = $("input").val()
    var type = $("select").val();
    $("#folks").empty();

    $.ajax({
        url: "https://elegant-croissant.glitch.me/spotify",
        method: 'GET',
        offset:0,
        data: {
            q: inp,
            type: type
        },
        success: function(results) {

            var results = results.artists || results.albums
            for (var i = 0; i < results.items.length; i++) {
                if (results.items[i].images[0]){
                    var image = results.items[i].images[0] && results.items[i].images[0].url
                }
                else{
                    image = "https://seeklogo.com/images/S/spotify-2015-logo-560E071CB7-seeklogo.com.png"
                }
                var info = results.items[i].name
                var link = results.items[i].external_urls.spotify

                $("#folks").append("<div class='person'><img src=" + image + "></div>")
                $("#folks").append("<div class='name'>"+ info + "</div>")
                $("#folks").append("<a class = 'button' href='" + link+ "'>Click here to listen on Spotify</a>")

            }
            $("h3").html("Your results for: " + inp);
            $("#more").css({"visibility":"visible"})
            checkScroll()

console.log(results);
        }
    })
})


more.on('click', function() {

    var inp = $("input").val()
    var type = $("select").val();
    offset+=20;
    $.ajax({
        url: "https://elegant-croissant.glitch.me/spotify",
        method: 'GET',
        data: {
            q: inp,
            type: type,
            nextUrl:nextUrl,
            offset:offset
        },
        success: function(results) {
            nextUrl = results.next && results.next.replace(
                'api.spotify.com/v1/search',
                'elegant-croissant.glitch.me/spotify'
            )
            var results = results.artists || results.albums
            for (var i = 0; i < results.items.length; i++) {
                if (results.items[i].images[0]){
                    var image = results.items[i].images[0] && results.items[i].images[0].url
                }
                else{
                    image = "https://seeklogo.com/images/S/spotify-2015-logo-560E071CB7-seeklogo.com.png"
                }
                var info = results.items[i].name
                var link = results.items[i].external_urls.spotify

                $("#folks").append("<div class='person'><img src=" + image + "></div>")
                $("#folks").append("<div class='name'>"+ info + "</div>")
                $("#folks").append("<a class = 'button' href='" + link+ "'>Click here to listen on Spotify</a>")

            }
            $("#more").css({"visibility":"visible"})
            checkScroll()
        }
    })
});


})()
