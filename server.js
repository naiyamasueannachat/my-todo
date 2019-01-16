"use strict";

const Hapi = require("hapi");

const dbOpts = {
    url:
        "mongodb://admin:admin@cluster0-shard-00-00-sdzlc.gcp.mongodb.net:27017,cluster0-shard-00-01-sdzlc.gcp.mongodb.net:27017,cluster0-shard-00-02-sdzlc.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
    settings: {
        poolSize: 10
    },
    decorate: true
};
// Create a server with a host and port
const server = Hapi.server({
    host: "0.0.0.0",
    port: process.env.PORT || 8000
});

server.route({
    method: "GET",
    path: "/users/{id}",
    async handler(request) {
        const db = request.mongo.db;
        const ObjectID = request.mongo.ObjectID;

        try {
            const result = await db
                .collection("account")
                .findOne({ _id: new ObjectID(request.params.id) });
            return result;
        } catch (err) {
            throw Boom.internal("Internal MongoDB error", err);
        }
    }
});

//add data
server.route({
    method: "POST",
    path: "/imax/add",
    handler: (request, reply) => {
        return server.methods.imax.AddTask(server, request)
        .then(reply);
    }
});

//delete data
server.route({
    method: "DELETE",
    path: '/imax/del/{id}',
    handler: (request, reply) => {
        return server.methods.imax.DeleteTask(server, request)
        .then(reply);
    }
});

//list data
server.route({
    method: "GET",
    path: '/imax/list',
    handler: (request, reply) => {
        return server.methods.imax.ListTask(server, request)
        .then(reply);
    }
});
//edit data 
server.route({
    method: "PUT",
    path: '/imax/edit/{id}',
    handler: (request, reply) => {
        return server.methods.imax.EditTask(server,request)
        .then(reply);
    
    }

});


// Start the server
const start = async function () {
    try {
        await server.register([
            {
                plugin: require("hapi-mongodb"),
                options: dbOpts
            },
            require("./hapi-my-todo-imax"),
            require("./hapi-my-todo-datasource")
        ]);
        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log("Server running at:", server.info.uri);
};

start();
