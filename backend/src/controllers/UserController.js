const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const users = await User.find();
    return res.json(users);
  },

  async store(req, res) {
    const { name } = req.body;

    let user = await User.findOne({ name });

    if (!user) {
      user = await User.create({ name });
    }

    return res.json(user);
  }
};
