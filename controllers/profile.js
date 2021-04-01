const handleProfile = (req, res, knex) => {
  const { id } = req.params
  knex.select().from('users').where({ id }).then(user => {
    user.length ? res.json(user[0]) : res.status(400).json('Error: User doesn\'t exist')
  })
  .catch(err => res.status(400).json('Error: Request errors'))
}

module.exports = {
  handleProfile
}