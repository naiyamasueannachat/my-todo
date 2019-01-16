'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    host: "0.0.0.0",
    port: process.env.PORT || 8000
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();