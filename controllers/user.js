const { User, Thought } = require('../models');

module.exports = {
    // Gets all users
    getUser(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    // Gets a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((user) => {
                !user
                ? res.status(500).json({ msg: 'There is no user with that ID' })
                : res.json(user)
            })
            .catch((err) => {
                console.log(err)
                res.status(404).json(err)
            })
    },

    // Creates a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    // Updates a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((user) => {
            !user
            ? res.status(500).json({ msg: 'There is no user with that ID' })
            : res.json(user)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // Deletes a User
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                !user
                ? res.status(500).json({ msg: "There is no user with this ID" })
                : res.json(user)
            })
            .catch((err) => {
                console.log(err)
                res.status(404).json(err)
            })
    },

    // Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true}   
        )
        .then((user) => {
            !user
            ? res.status(500).json({ msg: "There is no find with this ID" })
            : res.json(user)
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json(err)
        })
    },

    // Delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true }   
        )
        .then((user) => {
            !user
            ? res.status(500).json({ msg: "There is no find with this ID" })
            : res.json(user)
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json(err)
        })
    }
















}