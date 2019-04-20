const functions = require('firebase-functions');
const base = require('firebase-admin');
const axios = require('axios');

base.initializeApp(functions.config().firebase);

// Firebase Cloud Functions

exports.chat = functions.https.onRequest((request, response) => {
    let payload = request.body;
    response.sendStatus(200);
    if ( payload.event && payload.event.user ) {
        let channel = payload.event.channel;
        let left = getTap('left');
        let right = getTap('right');
        Promise.all([left, right]).then(values => {
            postSlackMessage(defaultMessage(values[0]), channel);
            postSlackMessage(defaultMessage(values[1]), channel);
        });
    } 
});

exports.runningLow = functions.database.ref('/pours/{pourId}').onCreate((snap, context) => { 
    const pour = snap.val();
    const percentage = getLowWarning(pour.beforeVolume, pour.afterVolume);
    if (percentage != null) {
        message = runningLowMessage(pour, percentage);
        postSlackMessage(message, '#kegerator');
        return true;
    }
    return false;
});

// Helper functions

function postSlackMessage(message, channel) {
    const slackApi = axios.create({
        baseURL: 'https://slack.com/api',
        headers: {
            'Authorization': `Bearer ${functions.config().slack.token}`,
            'Content-Type': 'application/json'
        }
      });

    slackApi.post('/chat.postMessage', {
        channel: channel,
        text: message
    });
}

function runningLowMessage(pour, percentage) {
    return `The ${pour.tap} keg, ${pour.keg.name}, is at ${formatPercentage(percentage)}%!`;
}

function getTap(id) {
    return new Promise((resolve, reject) => {
        var ref = base.database().ref(`/taps/${id}`);
        ref.once("value").then((snap) => {
            var tap = snap.val();
            if (tap) {
                tap['key'] = snap.key;
                getKeg(tap.keg).then((keg) => {
                    tap['keg'] = keg;
                    resolve(tap);
                });
            } else {
                reject(new Error('Tap not found.'));
            }
        });
    });
}

function getKeg(id) {
    return new Promise((resolve, reject) => {
        var ref = base.database().ref(`/kegs/${id}`);
        ref.once("value").then((snap) => {
            var keg = snap.val();
            if (keg) {
                keg['key'] = snap.key;
                resolve(keg);
            } else {
                reject(new Error('Keg not found.'));
            }
        });
    });
}

function defaultMessage(tap) {
    return `${tap.keg.name} is on the ${tap.key} tap. The keg is ${formatPercentage(getPercentage(tap.volume))}% full.`
}

function getPercentage(volume) {
    return parseFloat(volume) / 4400.0;
}

function formatPercentage(percentage) {
    return Math.floor(percentage * 100)
}

function getLowWarning(beforeVolume, afterVolume) {
    const levels = [0.75, 0.50, 0.25, 0.10, 0.5, 0];
    for ( i = 0; i < levels.length; i++ ) {
        level = levels[i];
        if (getPercentage(beforeVolume) > level && level >= getPercentage(afterVolume)) {
            return level;
        }
    }
}