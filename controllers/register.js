const handleRegister = async (req, res, knex, bcrypt) => {
  const { email, name, password } = req.body
  if (!email || !name || !password) {
    return res.status(400).json('Invalid data submitted')
  }
  const saltRounds = 5
  const hash = await bcrypt.hash(password, saltRounds)
  await knex.transaction(trx => {
    trx.insert ({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      trx('users')
      .returning('*')
      .insert({
        email: loginEmail[0],
        name: name,
        joined: new Date()
      })
      .then(user => res.json(user[0]))
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('Unable to register. ' + err.detail))
}


module.exports = {
  handleRegister: handleRegister
}