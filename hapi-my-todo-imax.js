exports.plugin = {
    name: "hapi-my-todo-imax",
    version: "1.0.0",
    register: async function (server, options) {

        server.method({
            name: "imax.AddTask",
            method: addTask
        });

        server.method({
            name: "imax.DeleteTask",
            method: deleteTask
        });
        server.method({
            name: "imax.ListTask",
            method: listTask
        });
        server.method({
            name: "imax.EditTask",
            method: editTask
        })
    }
};
const editTask = (server, request) => {
    const ObjectID = request.mongo.ObjectID;
    const id = new ObjectID(request.params.id);
    const body = {
        name: request.payload.name,
        description: request.payload.description,
        status: request.payload.status,
        startdate: request.payload.startdate
    }
    return new Promise((resolve, reject) => {
        server.methods.datasource.Edit(request.mongo.db, id, body)
            .then((res) => {
                resolve(
                    {status: 200,
                    message: "Edit successful",
                    data: (res.ops && res.ops.length > 0) ? res.ops[0] : {}}
                    );
            });
    });
}

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
                if (res.result.ok == 1) {
                    resolve({
                        status: 200,
                        message: "Add successful",
                        data: (res.ops && res.ops.length > 0) ? res.ops[0] : {}
                    });
                } else {
                    reject({
                        status: 500,
                        message: "Add incomplate",
                        data: null
                    });
                }
            }).catch((error) => {
                console.log(error)
                reject({
                    status: 500,
                    message: "Add incomplate",
                    data: null
                });
            });
    });
}
const listTask = (server, request) => {
    return new Promise((resolve, reject) => {
        server.methods.datasource.List(request.mongo.db)
            .then((res) => {
                resolve(res);
            });
    });
}

const deleteTask = (server, request) => {
    const ObjectID = request.mongo.ObjectID;
    const id = new ObjectID(request.params.id);
    return new Promise((resolve, reject) => {
        server.methods.datasource.Delete(request.mongo.db,id)
            .then((res) => {
                if (res.result.n == 1) {
                    resolve({
                        status: 200,
                        message: "Delete successful",
                        data: null
                    });
                } else {
                    resolve({
                        status: 500,
                        message: "ไม่มี status นี้กรุณาลองใหม่อีกครั้ง",
                        data: null

                    });
                }
            })
            .catch((error) => {
                console.log(error)
                reject({
                    status: 500,
                    message: "message error",
                    data: null

                });
            });
    });
}
