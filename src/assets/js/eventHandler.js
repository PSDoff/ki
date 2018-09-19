$(function () {
    var socket = io();

    socket.on('update volume', function(data) {
        var tapContainer = $(".tap-" + data.key);

        var volume = data.tap.volume,
            originalVolume = data.tap.initialVolume,
            percentVolume = ((volume / originalVolume) * 100).toFixed(2);
            roundedPercentVolume = ((volume / originalVolume) * 100).toFixed(0);

        if (tapContainer.length > 0) {
            tapContainer.find('.beer-battery .percent-remaining').text(roundedPercentVolume + '%');
            // tapContainer.find('.beer-foam').css('bottom', percentVolume + '%');

            tapContainer.find('.volume').css('height', percentVolume + '%');
            tapContainer.attr('data-volume-percent', percentVolume);
        }
    });

    socket.on('pouring', function(data) {
        var tapContainer = $(".tap-" + data.tap);
        console.log('pouring ' + data.tap);
        tapContainer.find('.beer-container').addClass('pouring');
        tapContainer.find('.tap-poster img').addClass('pouring');

    });

    socket.on('not pouring', function(data) {
        var tapContainer = $(".tap-" + data.tap);
        tapContainer.find('.beer-container').removeClass('pouring');
        tapContainer.find('.tap-poster img').removeClass('pouring');
    });

    socket.on('pouring complete', function(data) {
        var tapContainer = $(".tap-" + data.tap);
        tapContainer.find('.beer-container').removeClass('pouring');
        tapContainer.find('.tap-poster img').removeClass('pouring');
    });

    socket.on('maintenance', function(data) {
        var maintenanceOverlay = $("#maintenance-overlay");
        if (data.enabled) {
            maintenanceOverlay.show();
        } else {
            maintenanceOverlay.hide();
        }
    });

    socket.on('keg tapped', function(data) {
        location.reload();
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
                $(tapId).find('.tap-poster img').addClass('pouring');

                setTimeout(function () {
                    $(tapId).find('.beer-container').removeClass('pouring');
                    $(tapId).find('.tap-poster img').removeClass('pouring');
                }, 2500);

                $(tapId).find('.volume').css('height', percentVolume + '%');
                $(tapId).find('.beer-battery .percent-remaining').text(percentVolume);
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
                $(tapId).find('.tap-poster img').addClass('pouring');

                setTimeout(function(){
                    $(tapId).find('.beer-container').removeClass('pouring');
                    $(tapId).find('.tap-poster img').removeClass('pouring');
                }, 2500);

                $(tapId).find('.volume').css('height', percentVolume + '%');
                $(tapId).find('.beer-battery .percent-remaining').text(percentVolume);
            }
        }
    })
});
