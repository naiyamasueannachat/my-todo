exports.plugin = {
    name: "hapi-my-todo-datasource",
    version: "1.0.0",
    register: async function (server, options) {
        server.method({
            name: "datasource.Insert",
            method: InsertTask,
        });
        server.method({
            name: "datasource.Delete",
            method: DeleteTask,
        });
        server.method({
            name: "datasource.List",
            method: ListTask,
        });
        server.method({
            name: "datasource.Edit",
            method: EditTask,
        });
    }
};
const EditTask = (db,id,body) => {
    return db.collection('mg-imax').update({_id:id},body);
};

const InsertTask = (db, body) => {
    return db.collection('mg-imax').insert(body);
};

const DeleteTask = (db, status) => {
    return db.collection('mg-imax').deleteMany({status:status});

};

const ListTask = (db) => {
    return new Promise((resolve, reject) => {
        db.collection('mg-imax').find({})
            .toArray((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
};
