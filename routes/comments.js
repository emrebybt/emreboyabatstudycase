const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comments");

router.post('/addComment', commentController.postComment);
router.get('/lastCommentsByGender', commentController.getLastCommentsByGender);

module.exports = router;
