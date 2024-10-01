const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post'); // Import Post model
const router = express.Router();
const authenticateToken = require('../middleware/authenticate');


// Use the authenticateToken middleware for all post routes
router.use(authenticateToken);

// 1. GET /posts - Retrieve all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// 2. GET /posts/:id - Retrieve a specific blog post by its ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

// 3. POST /posts - Create a new blog post
router.post('/', async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author // You can set the user from the JWT token
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// 4. PUT /posts/:id - Update an existing blog post by its ID
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');

        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// 5. DELETE /posts/:id - Delete a blog post by its ID
// 5. DELETE /posts/:id - Delete a blog post by its ID
// 5. DELETE /posts/:id - Delete a blog post by its ID
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');

        await Post.deleteOne({ _id: post._id }); // Delete the post
        res.status(204).send(); // Send a 204 No Content status on successful deletion
    } catch (error) {
        console.error('Delete error:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to delete post' });
    }
});



module.exports = router;
