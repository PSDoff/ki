$(function () {
    var socket = io();

    socket.on('update volume', function (data) {
        var tapContainer = $(".tap-" + data.key);

        var volume = data.tap.volume,
            originalVolume = data.tap.initialVolume,
            percentVolume = ((volume / originalVolume) * 100).toFixed(2);

        if (tapContainer.length > 0) {
            tapContainer.find('.beer-container').addClass('pouring');
            setTimeout(function () {
                tapContainer.find('.beer-container').removeClass('pouring');
            }, 2500);
            // tapContainer.find('.liquid').css('height', percentVolume + '%');
            // tapContainer.find('.beer-foam').css('bottom', percentVolume + '%');

            tapContainer.find('.volume').css('height', percentVolume + '%');
            tapContainer.attr('data-volume-percent', percentVolume);
        }
    });

    $('body').keydown(function (e) {
        if (e.which == 81) {
            let tapId = ".tap-left";
            var volume = $(tapId).attr('data-volume-remaining'),
                originalVolume = $(tapId).attr('data-volume-original'),
                percentVolume = ((volume / originalVolume) * 100).toFixed(0);

            if (percentVolume > 0) {
                $(tapId).attr('data-volume-remaining', parseInt(volume) - 25);
                // $(tapId).find('.liquid').css('height', percentVolume + '%');
                // $(tapId).find('.beer-foam').css('bottom', percentVolume + '%');
                $(tapId).attr('data-volume-percent', percentVolume);

                $(tapId).find('.beer-container').addClass('pouring');
                setTimeout(function () {
                    $(tapId).find('.beer-container').removeClass('pouring');
                }, 2500);

                $(tapId).find('.volume').css('height', percentVolume + '%');
            }
        } else if (e.which == 87) {
            let tapId = ".tap-right";
            var volume = $(tapId).attr('data-volume-remaining'),
                originalVolume = $(tapId).attr('data-volume-original'),
                percentVolume = ((volume / originalVolume) * 100).toFixed(0);

            if (percentVolume > 0) {
                $(tapId).attr('data-volume-remaining', parseInt(volume) - 25);
                // $(tapId).find('.liquid').css('height', percentVolume + '%');
                // $(tapId).find('.beer-foam').css('bottom', percentVolume + '%');
                $(tapId).attr('data-volume-percent', percentVolume);

                $(tapId).find('.beer-container').addClass('pouring');
                setTimeout(function(){
                    $(tapId).find('.beer-container').removeClass('pouring');
                }, 2500);

                $(tapId).find('.volume').css('height', percentVolume + '%');
            }
        }
    })
});
