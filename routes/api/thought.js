const router = require('express').Router()

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought');

router.route('/')
    .get(getThoughts)
    .post(createThought)

router.route('/:thoughtId')
    .get(getSingleThought)
    .delete(deleteThought)

router.route('/:thoughtId/reactions/:reactionId')
    .post(createReaction)
    .delete(deleteReaction)

module.exports = router