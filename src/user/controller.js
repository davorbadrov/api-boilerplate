function getAll ({ db }) {
  return db.select().from('user')
}

function create ({ db }, userData) {
  return db('user')
    .returning(['id', 'name', 'email', 'created_at', 'updated_at'])
    .insert(userData)
}

module.exports = {
  getAll,
  create
}
