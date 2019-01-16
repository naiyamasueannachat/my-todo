exports.plugin = {
    name: "hapi-my-todo-datasource",
    version: "1.0.0",
    register: async function (server, options) {
        server.method({
            name: "datasource.Insert",
            method: InsertProduct,
        });
    }
};

const InsertProduct = (db, body) => {
    return db.collection('mg-imax').insert(body);
}
