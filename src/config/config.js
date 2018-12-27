const global = {
    firebase: {
        name: 'keg-intelligence'
    },
    testMode: false,
    maintenanceMode: false,
    pourFinishingFrequency: 500, // Check flow state every n milliseconds.
    flowThreshold: 4, // Minimum flow required to count as flowing. (sensor ticks per pourFinishingFrequency milliseconds)
    defaultKegVolume: 4400,
    restartInterval: 2 * 60 * 60 * 1000, // App dies every n milliseconds. This keeps the Arduino from sleeping. App gets rebooted by forever.
    production: true
};

const dev = {
    firebase: {
        name: 'keg-intelligence-dev'
    },
    production: false
};

const config = {
    dev
};

const env = process.env.NODE_ENV;

if (env) {
    module.exports = Object.assign(global, config[env]);
} else {
    module.exports = global;
}