const db = require("../../data/dbConfig");



 async function add(users) {
    const [id] = await db('users').insert(users, 'id');
    const newUser = await findById(id);
    return newUser;
  }

function findBy(filter) {
  return db("users").where(filter)
}

function findById(id) {
  return db("users").where({ id }).first();
}



module.exports = {
  add,
  findBy,
  findById,
    
};
