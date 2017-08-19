
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      const now = new Date();

      // Inserts seed entries
      return knex('user').insert([
        { id: 1, name: 'john doe', email: 'john@mail.com', password: 'jidajh89qwpohdgiuqojdbiuhsjlnbkdhiljn'/*, created_at: now, updated_at: now */ },
        { id: 2, name: 'jane doe', email: 'jane@mail.com', password: 'jdiashdjpoadupo2 jvqdij2“u1i2n qdhabksnilas'/*, created_at: now, updated_at: now */ },
        { id: 3, name: 'jonah doe', email: 'jonah@mail.com', password: 'dnasidjaishoih2jibiudbqhwaosuhjshbch'/*, created_at: now, updated_at: now*/ }
      ]);
    });
};
