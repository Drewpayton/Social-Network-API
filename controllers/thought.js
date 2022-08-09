const { User, Thought } = require('../models');

module.exports = {
    // Gets all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },

    // Gets a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('__v')
            .then((thought) => 
                !thought
                    ? res.status(404).json({ msg: "No thought with this id" })
                    : res.json(thought)
            )
    },

    // Creates a thought
    createThought(req, res) {
        Thought.create(req.body)
           .then((thought) => res.json(thought))
           .catch((err) => res.status(404).json(err))
    },

    // Deletes a thought
    deleteThought(req, res) {

    }




};
