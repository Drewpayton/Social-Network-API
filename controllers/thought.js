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
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => {
                !thought
                ? res.status(404).json({ msg: "No thought with this ID"})
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    // Create a reaction from thoughts
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({ msg: 'No thought with that ID'})
                : res.json(thought)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // Delete the reactions
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
            { runValidators: true, new: true }
        )
        .then((thought) => {
            !thought
                ? res.status(500).json({ msg: 'There is find for this ID' })
                : res.json(thought)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    }
};
