const express = require("express")
const { getAllRrviews, createReview} = require("../Controllers/reviewController")
const { authenticate ,restrict} = require("./../auth/verifyToken")
const router = express.Router({mergeParams: true}) // mergeParams is used make accessibility from the parent (doctor) route

router.route('/').get(getAllRrviews).post(authenticate,restrict(['patient']), createReview)

module.exports = router;