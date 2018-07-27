$(function () {
    var socket = io();
    socket.on('update volume', function(data){
        var tapContainer = $(".tap-" + data.key);

        if (tapContainer.length > 0) {
            tapContainer.find('.tap__volume').text(data.tap.volume);
        }
    });
    $('body').keydown(function(e){
        if (e.which == 81) {
            let tapId = ".tap-left";
            var volume = $(tapId).find('[data-volume-remaining]').attr('data-volume-remaining'),
                originalVolume = $(tapId).find('[data-volume-original]').attr('data-volume-original'),
                percentVolume;

            $(tapId).find('[data-volume-remaining]').attr('data-volume-remaining', parseInt(volume) - 25);
            percentVolume = (volume / originalVolume) * 100;
            console.log("Left tap remaining: " + percentVolume.toFixed(0) + "%");

            $(tapId).find('.liquid').css('height', percentVolume.toFixed(0) + '%');
            $(tapId).find('.beer-foam').css('bottom', percentVolume.toFixed(0) + '%');

            $(tapId).find('[data-volume-percent]').attr('data-volume-percent', percentVolume.toFixed(0));
        } else if (e.which == 87) {
            let tapId = ".tap-right";
            var volume = $(tapId).find('[data-volume-remaining]').attr('data-volume-remaining'),
                originalVolume = $(tapId).find('[data-volume-original]').attr('data-volume-original'),
                percentVolume;

            $(tapId).find('[data-volume-remaining]').attr('data-volume-remaining', parseInt(volume) - 25);
            percentVolume = (volume / originalVolume) * 100;
            console.log("Left tap remaining: " + percentVolume.toFixed(0) + "%");

            $(tapId).find('.liquid').css('height', percentVolume.toFixed(0) + '%');
            $(tapId).find('.beer-foam').css('bottom', percentVolume.toFixed(0) + '%');

            $(tapId).find('[data-volume-percent]').attr('data-volume-percent', percentVolume.toFixed(0));
        }
    })
});
