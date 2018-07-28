// Credit to https://codepen.io/TimRuby/pen/jcLia

$(function () {

    $('[class*="tap-"]').each(function() {

        $(this).find('.liquid') // I Said Fill 'Er Up!
            .delay(4100)
            .animate({
                height: parseInt($(this).data('volumePercent')).toFixed(0) + '%'
            }, 2500);
    })

});
