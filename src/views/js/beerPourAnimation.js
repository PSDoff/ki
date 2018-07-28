// Credit to https://codepen.io/TimRuby/pen/jcLia

$(document).ready(function () {

    $('.pour') //Pour Me Another Drink, Bartender!
        .delay(2000)
        .animate({
            height: '360px'
        }, 1500)
        .delay(1600)
        .slideUp(500);

    $('.liquid') // I Said Fill 'Er Up!
        .delay(3400)
        .animate({
            height: parseInt($(this).parents('[data-volume-percent]').data('volume-percentage')).toFixed(0) + '%'
        }, 2500);

    $('.beer-foam') // Keep that Foam Rollin' Toward the Top! Yahooo!
        .delay(3400)
        .animate({
            bottom: parseInt($(this).parents('[data-volume-percent]').data('volume-percentage')).toFixed(0) + '%'
        }, 2500);
});
