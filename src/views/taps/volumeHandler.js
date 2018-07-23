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
            var volume = $(tapId).find('.tap__volume').text();
            $(tapId).find('.tap__volume').text(parseInt(volume) - 1);
        } else if (e.which == 87) {
            let tapId = ".tap-right";
            var volume = $(tapId).find('.tap__volume').text();
            $(tapId).find('.tap__volume').text(parseInt(volume) - 1);
        }
    })
});
