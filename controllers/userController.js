const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
          .then((courses) => res.json(courses))
          .catch((err) => res.status(500).json(err));
      },
};
