const global = {
    firebase: {
        name: 'keg-intelligence'
    },
    testMode: false,
    maintenanceMode: false,
    pourFinishingFrequency: 3000,
    defaultKegVolume: 5000,
};

const dev = {
    firebase: {
        name: 'keg-intelligence-dev'
    },
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