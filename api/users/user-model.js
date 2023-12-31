const db = require("../../data/dbConfig");


// In your Users model
 async function add(user) {
    const [id] = await db('users').insert(user, 'id');
    return findById(id);
  }

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users").where({ id }).first();
}



module.exports = {
  add,
  findBy,
  findById,
    
};
