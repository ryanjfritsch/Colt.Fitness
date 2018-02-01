
window.addEventListener("load", function(event) {
    document.getElementById("styleLine").classList.add("animatedStyle");
    document.getElementById("headerNav").classList.add("animatedHeader");
    document.getElementById("bkimg").classList.add("animatedHero");
    document.getElementById("overlay").classList.add("animatedOverlay");
    adjustNavBar();

    // INSTAGRAM SCRIPT

    var userFeed = new Instafeed({
        get: 'user',
        userId: ,
        accessToken: '',
        resolution: 'standard_resolution',
        sortBy: 'most-recent',
        template: '<div><a href="{{link}}" target="_blank"><img src="{{image}}" /></a></div>',
        limit: 6
    });
    userFeed.run();

});


$('#getStarted').click(function() {
    $("header").css("background-color", "rgba(0, 0, 0, 0.9)");
    $('html,body').animate({
        scrollTop: $(".features").offset().top - 68},
        800);
});

// PERFORM ACTIONS ON PAGE SCROLL
$(window).scroll(function(){
    adjustNavBar();
});

var adjustNavBar = function(){
    if($( window ).width() > 800){
            if ($(this).scrollTop() >= ($(".features").offset().top) - 70) {
                $("header").css("background-color", "rgba(0, 0, 0, 0.9)");
            } else {
                $("header").css("background-color", "rgba(0, 0, 0, 0)");
            }
    } else {
        if ($(this).scrollTop() >= 2) {
            $("header").css("background-color", "rgba(0, 0, 0, 0.9)");
        } else {
            $("header").css("background-color", "rgba(0, 0, 0, 0)");
        }
    }
}
