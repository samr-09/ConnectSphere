import React, { useState } from 'react';
import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const PostCard = ({ post }) => {
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const currentUser = useSelector((state) => state.user.value);

    const [likes, setLikes] = useState(post.likes_count || []);
    const [shares, setShares] = useState(post.shares || []);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

    // ✅ IMPORTANT FIX
    const [commentCount, setCommentCount] = useState(
        post.comments_count || post.comments?.length || 0
    );

    const postWithHashtags = post.content?.replace(
        /(#\w+)/g,
        '<span class="text-indigo-600">$1</span>'
    );

    /* LIKE */
    const handleLike = async () => {
        const { data } = await api.post(
            '/api/post/like',
            { postId: post._id },
            { headers: { Authorization: `Bearer ${await getToken()}` } }
        );

        if (data.success) {
            setLikes((prev) =>
                prev.includes(currentUser._id)
                    ? prev.filter((id) => id !== currentUser._id)
                    : [...prev, currentUser._id]
            );
        }
    };

    /* FETCH COMMENTS */
    const fetchComments = async () => {
        const { data } = await api.get(`/api/comment/${post._id}`);
        if (data.success) {
            setComments(data.comments);
            setCommentCount(data.comments.length); // ✅ sync count
        }
    };

    /* ADD COMMENT */
    const handleAddComment = async () => {
        if (!commentText.trim()) return;

        const { data } = await api.post(
            '/api/comment',
            { postId: post._id, text: commentText },
            { headers: { Authorization: `Bearer ${await getToken()}` } }
        );

        if (data.success) {
            setComments([data.comment, ...comments]);
            setCommentText('');
            setCommentCount((prev) => prev + 1); // ✅ increase instantly
        }
    };

    /* SHARE */
    const handleShare = async () => {
        const { data } = await api.post(
            '/api/post/share',
            { postId: post._id },
            { headers: { Authorization: `Bearer ${await getToken()}` } }
        );

        setShares(data.shares);

        const url = window.location.origin + '/post/' + post._id;
        navigator.share
            ? navigator.share({ url })
            : navigator.clipboard.writeText(url);

        toast.success('Post shared');
    };

    return (
        <div className="bg-white rounded-2xl shadow p-5 space-y-4 w-full">

            {/* USER */}
            <div
                onClick={() => navigate('/profile/' + post.user._id)}
                className="flex gap-3 cursor-pointer"
            >
                <img
                    src={post.user.profile_picture}
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <div className="flex items-center gap-1">
                        <span>{post.user.full_name}</span>
                        <BadgeCheck className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-sm text-gray-500">
                        @{post.user.username} • {moment(post.createdAt).fromNow()}
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            {post.content && (
                <div
                    dangerouslySetInnerHTML={{ __html: postWithHashtags }}
                    className="text-sm"
                />
            )}

            {/* IMAGES */}
            {post.image_urls.length > 0 && (
                <div
                    className={
                        post.image_urls.length === 1
                            ? 'w-full rounded-xl overflow-hidden'
                            : 'grid grid-cols-2 gap-2'
                    }
                >
                    {post.image_urls.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            className={
                                post.image_urls.length === 1
                                    ? 'w-full max-h-[520px] object-cover rounded-xl'
                                    : 'w-full h-56 object-cover rounded-lg'
                            }
                            alt=""
                        />
                    ))}
                </div>
            )}

            {/* ACTIONS */}
            <div className="flex gap-6 border-t pt-2 text-sm text-gray-600">
                <div className="flex gap-1 items-center">
                    <Heart
                        onClick={handleLike}
                        className={`cursor-pointer ${
                            likes.includes(currentUser._id)
                                ? 'text-red-500 fill-red-500'
                                : ''
                        }`}
                    />
                    <span>{likes.length}</span>
                </div>

                <div className="flex gap-1 items-center">
                    <MessageCircle
                        className="cursor-pointer"
                        onClick={() => {
                            setShowComments(!showComments);
                            if (!showComments) fetchComments();
                        }}
                    />
                    <span>{commentCount}</span>
                </div>

                <div className="flex gap-1 items-center">
                    <Share2 className="cursor-pointer" onClick={handleShare} />
                    <span>{shares.length}</span>
                </div>
            </div>

            {/* COMMENTS */}
            {showComments && (
                <div className="pt-3 space-y-3">
                    <div className="flex gap-2">
                        <input
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 border rounded px-3 py-1"
                        />
                        <button
                            onClick={handleAddComment}
                            className="text-indigo-600"
                        >
                            Post
                        </button>
                    </div>

                    {comments.map((c) => (
                        <div key={c._id} className="flex gap-2 text-sm">
                            <img
                                src={c.user.profile_picture}
                                className="w-7 h-7 rounded-full"
                            />
                            <div>
                                <span className="font-medium">
                                    {c.user.username}
                                </span>
                                <p>{c.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostCard;
