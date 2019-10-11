const CheckoutsService = {
  checkoutTools(db, checkoutsObj) {
    return db
      .insert(checkoutsObj)
      .into('checkouts')
      .returning('*')
      .then(rows => {
        return rows
      })
    },
  checkUserExists(db, id) {
    return db
      .from('users')
      .where('id', id)
      .first()
  },
}

module.exports = CheckoutsService;