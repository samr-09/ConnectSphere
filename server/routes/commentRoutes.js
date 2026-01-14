import express from 'express';
import { protect } from '../middlewares/auth.js';
import Comment from '../models/Comment.js';

const router = express.Router();

/* =========================
   CREATE COMMENT
========================= */
router.post('/', protect, async (req, res) => {
    try {
        const { userId } = req.auth();   // ✅ FIX
        const { postId, text } = req.body;

        if (!text) {
            return res.json({ success: false, message: "Comment cannot be empty" });
        }

        const comment = await Comment.create({
            post: postId,
            user: userId,
            text
        });

        res.json({ success: true, comment });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
});

/* =========================
   GET COMMENTS OF A POST
========================= */
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate('user', 'username profile_picture')
            .sort({ createdAt: -1 });

        res.json({ success: true, comments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
});

export default router;
