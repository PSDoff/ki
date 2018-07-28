// Credit to https://codepen.io/TimRuby/pen/jcLia

$(function () {

    $('[class*="tap-"]').each(function() {

        $(this).find('.pour') //Pour Me Another Drink, Bartender!
            .delay(1200)
            .animate({
                height: '100%'
            }, 1500)
            .delay(1000)
            .slideUp(500);

        $(this).find('.liquid') // I Said Fill 'Er Up!
            .delay(4100)
            .animate({
                height: parseInt($(this).data('volumePercent')).toFixed(0) + '%'
            }, 2500);

        $(this).find('.beer-foam') // Keep that Foam Rollin' Toward the Top! Yahooo!
            .delay(4100)
            .animate({
                bottom: parseInt($(this).data('volumePercent')).toFixed(0) + '%'
            }, 2500);
    })

});
