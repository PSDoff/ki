const global = {
    firebase: {
        name: 'keg-intelligence'
    },
    testMode: false,
    maintenanceMode: false,
    pourFinishingFrequency: 3000,
    defaultKegVolume: 4400,
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