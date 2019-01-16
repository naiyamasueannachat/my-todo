exports.plugin = {
    name: "hapi-my-todo-imax",
    version: "1.0.0",
    register: async function (server, options) {

        server.method({
            name: "imax.AddProduct",
            method: addProduct
        });
    }
};

    const addProduct = (server, request) => {
        const body = {
            name: request.payload.name,
            price: request.payload.price,
        }
        return new Promise((resolve, reject) => {
            server.methods.datasource.Insert(request.mongo.db, body)
                .then((res) => {
                    resolve({
                        status: 200,
                        message: "Add successful",
                        data: (res.ops && res.ops.length > 0) ? res.ops[0] : {}
                    });
                }).catch((err) => {
                    reject({
                        status: 500,
                        message: "Add incomplate",
                        data: err
                    });
                })
        });
    
    }