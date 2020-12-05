const User = require('../models/User')

module.exports = {
  async index (req, res) {},

  async show (req, res) {
    const users = await User.find()

    res.json(users)
  },

  async store (req, res) {
    const { email } = req.body

    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create(req.body)
    }

    return res.json(user)
  },

  async update (req, res) {},

  async destroy (req, res) {}
}
