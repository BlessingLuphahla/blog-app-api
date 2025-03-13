const router = require('express').Router();
const Post = require('../models/Post');

// GET BY ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) res.status(404).json('Post not found.');

        res.status(200).json(post);
    } catch(error) {
        res.status(500).json(error);
    }
});

// GET ALL
router.get('/', async (req, res) => {
    try {
        const { author, category } = req.query;
        let posts;
        
        if (author) {
            posts = await Post.find({ author: author });
        } else if (category) {
            posts = await Post.find({ categories: {
                $in: [category]
            }});
        } else {
            posts = await Post.find();
        }

        res.status(200).json(posts.reverse());
    } catch(error) {
        res.status(500).json(error);
    }
});

// CREATE
router.post('/', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const post = await newPost.save();

        res.status(201).json(post);
    } catch(error) {
        res.status(500).json(error);
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.author === req.body?.author) {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
    
            res.status(200).json(updatedPost);
        } else {
            res.status(401).json('You can not update the post.');
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json('Post not found.');

        if (post.author === req.body?.author) {
            await post.delete();

            res.status(200).json('Post has been deleted.');
        } else {
            res.status(404).json('You can not delete the post.');
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;