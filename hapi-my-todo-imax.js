exports.plugin = {
    name: "hapi-my-todo-imax",
    version: "1.0.0",
    register: async function (server, options) {

        server.method({
            name: "imax.AddTask",
            method: addTask
        });
    }
};

    const addTask = (server, request) => {
        const body = {
            name: request.payload.name,
            description: request.payload.description,
            status: request.payload.status,
            startdate: request.payload.startdate

        }
        return new Promise((resolve, reject) => {
            server.methods.datasource.Insert(request.mongo.db, body)
                .then((res) => {
                    console.log(res)
                    resolve({
                        status: 200,
                        message: "Add successful",
                        data: (res.ops && res.ops.length > 0) ? res.ops[0] : {}
                    });
                }).catch((error) => {
                    console.log(error)
                    reject({
                        status: 500,
                        message: "Add incomplate",
                        data: null
                    });
                })
        });
    
    }