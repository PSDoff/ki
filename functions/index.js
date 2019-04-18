const functions = require('firebase-functions');
const base = require('firebase-admin');
const axios = require('axios');

base.initializeApp(functions.config().firebase);

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

exports.leftRunningLow = functions.database.ref('/taps/left').onUpdate((snap, context) => {
    const snapshot = snap.after;
    const tap = snapshot.val();
    const percentage = getLowWarning(tap.volume);

    if (percentage != null) {
        runningLowMessage('left', tap, percentage).then(message => {
            postSlackMessage(message, '#kegerator');
        })
        return true;
    }
    return false;
});

exports.rightRunningLow = functions.database.ref('/taps/right').onUpdate((snap, context) => {
    const snapshot = snap.after;
    const tap = snapshot.val();
    const percentage = getLowWarning(tap.volume);
    
    if (percentage != null) {
        runningLowMessage('right', tap, percentage).then(message => {
            postSlackMessage(message, '#kegerator');
        })
        return true;
    }
    return false;
});

function runningLowMessage(key, tap, percentage) {
    return new Promise((resolve, reject) => {
        getKeg(tap.keg).then(keg => {
            resolve(`The ${key} keg, ${keg.name}, is at ${percentage}%!`)
        });
    });
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
    return `${tap.keg.name} is on the ${tap.key} tap. The keg is ${getPercentage(tap.volume)}% full.`
}

function getPercentage(volume) {
    return Math.floor(volume / 4400 * 100);
}

function getLowWarning(volume) {
    switch(volume) {
        case 4400:
            return '100';
        case 1100:
            return '25';
        case 440:
            return '10';
        case 220:
            return '5';
        case 0:
            return '0';
        default:
            return null;
    }
}