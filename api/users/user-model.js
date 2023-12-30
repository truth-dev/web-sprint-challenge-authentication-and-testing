const db = require('../../data/dbConfig');

function add(users){
    return db('users').insert(users, 'id')
    .then(([id]) => {
        return findById(id)
    })
}

function findBy(filter){
    return db('users').where(filter)
}

function findById(id){
    return db('users').where({id}).first()
}

module.exports = {
    add,
    findBy,
    findById
}