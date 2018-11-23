// Credit to https://codepen.io/TimRuby/pen/jcLia

$(function () {

    $('[class*="tap-"]').each(function() {

        $(this).find('.beer-battery .volume') // I Said Fill 'Er Up!
            .animate({
                height: parseInt($(this).data('volumePercent')).toFixed(0) + '%'
            }, 700);
    })    

});
