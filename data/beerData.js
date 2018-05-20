var rp = require('request-promise');
    cheerio = require('cheerio');

var leftBeer = "tom-green-summer-stout",
    rightBeer = "lug-tread";

var beersOnTap = [leftBeer, rightBeer];
var leftBeerMeta, rightBeerMeta;

for (var i = 0, len = beersOnTap.length; i < len; i++) {

    var options = {
        uri: 'https://beaus.ca/beer/' + beersOnTap[i],
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            var title = $('.beer-header h1').text();
            var shortDesc = $('.beer-header span').text();
            var tastingNotes = $('h3:contains("Tasting Notes")').next('p').text();
            // Our parsed meta data object
            var metadata = {
                title: title,
                shortDesc: shortDesc,
                tastingNotes: tastingNotes
            };

            console.log(metadata);

            if (i == 0) {
                exports.leftBeerMeta = leftBeerMeta;
            } else {
                exports.rightBeerMeta = rightBeerMeta;
            }
        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
        });
}


// console.log(leftBeerMeta);
