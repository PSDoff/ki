$(function () {
    var socket = io();

    socket.on('update volume', function(data) {
        var tapContainer = $(".tap-" + data.key);

        var volume = data.tap.volume,
            originalVolume = data.tap.initialVolume,
            percentVolume = ((volume / originalVolume) * 100).toFixed(2);
            roundedPercentVolume = ((volume / originalVolume) * 100).toFixed(0);

        if (tapContainer.length > 0) {
            tapContainer.find('.beer-container').addClass('pouring');
            setTimeout(function () {
                tapContainer.find('.beer-container').removeClass('pouring');
            }, 2500);
            tapContainer.find('.beer-battery .percent-remaining').text(percentVolume);
            // tapContainer.find('.beer-foam').css('bottom', percentVolume + '%');

            tapContainer.find('.volume').css('height', percentVolume + '%');
            tapContainer.attr('data-volume-percent', percentVolume);
        }
    });

    socket.on('pouring', function(data) {
        console.log(`${data.tap} pouring: ${data.volume}`);
    });

    socket.on('pouring complete', function(data) {
        console.log(`${data.tap} complete: ${data.volume}`);
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
                setTimeout(function () {
                    $(tapId).find('.beer-container').removeClass('pouring');
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
                setTimeout(function(){
                    $(tapId).find('.beer-container').removeClass('pouring');
                }, 2500);

                $(tapId).find('.volume').css('height', percentVolume + '%');
                $(tapId).find('.beer-battery .percent-remaining').text(percentVolume);
            }
        }
    })
});
