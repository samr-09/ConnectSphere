import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

/* =========================
   ADD POST
========================= */
export const addPost = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { content, post_type } = req.body;
        const images = req.files;

        let image_urls = [];

        if (images && images.length) {
            image_urls = await Promise.all(
                images.map(async (image) => {
                    const fileBuffer = fs.readFileSync(image.path);

                    const response = await imagekit.upload({
                        file: fileBuffer,
                        fileName: image.originalname,
                        folder: "posts",
                    });

                    const url = imagekit.url({
                        path: response.filePath,
                        transformation: [
                            { quality: "auto" },
                            { format: "webp" },
                            { width: "1280" },
                        ],
                    });

                    return url;
                })
            );
        }

        await Post.create({
            user: userId,
            content,
            image_urls,
            post_type,
        });

        res.json({ success: true, message: "Post created successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/* =========================
   GET FEED POSTS  ✅ FIXED
========================= */
export const getFeedPosts = async (req, res) => {
    try {
        const { userId } = req.auth();
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // user + connections + following
        const userIds = [userId, ...user.connections, ...user.following];

        // 🔥 lean() is CRITICAL
        const posts = await Post.find({ user: { $in: userIds } })
            .populate("user")
            .sort({ createdAt: -1 })
            .lean();

        // 🔥 ADD COMMENT COUNT (reload-safe)
        for (let post of posts) {
            const count = await Comment.countDocuments({
                postId: post._id,
            });
            post.comments_count = count;
        }

        res.json({ success: true, posts });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/* =========================
   LIKE / UNLIKE POST
========================= */
export const likePost = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { postId } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.json({ success: false, message: "Post not found" });
        }

        if (post.likes_count.includes(userId)) {
            post.likes_count = post.likes_count.filter(
                (id) => id !== userId
            );
            await post.save();
            res.json({ success: true, message: "Post unliked" });
        } else {
            post.likes_count.push(userId);
            await post.save();
            res.json({ success: true, message: "Post liked" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

/* =========================
   SHARE POST
========================= */
export const sharePost = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { postId } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.json({ success: false, message: "Post not found" });
        }

        // prevent duplicate share
        if (!post.shares.includes(userId)) {
            post.shares.push(userId);
            await post.save();
        }

        res.json({
            success: true,
            message: "Post shared successfully",
            shares: post.shares,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
