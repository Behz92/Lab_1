import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Posts.css';


function Posts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/posts', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data); // Log the fetched posts
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchPosts();
    }, []);
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleAddPost = () => {
        navigate('/new'); // Navigate to New.jsx
    };

    const handleEditPost = (postId) => {
        navigate(`/edit/${postId}`); // Navigate to Edit.jsx with postId
    };

    const handleDeletePost = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(posts.filter(post => post._id !== id)); // Update local state
        } catch (error) {
            console.error(error.response.data); // Log the error response for debugging
        }
    };
    

    return (
        <div className="posts-container">
            <h2 className="posts-header">Posts</h2>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <button className="add-button" onClick={handleAddPost}>Add Post</button>
            {posts.map(post => (
    <div key={post._id} className="post-item"> {/* Change post.id to post._id */}
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.content}</p>
        <p className="post-author">Author: {post.author}</p>
        <button className="edit-button" onClick={() => handleEditPost(post._id)}>Edit</button> {/* Pass post._id */}
        <button className="delete-button" onClick={() => handleDeletePost(post._id)}>Delete</button>
    </div>
))}

        </div>
    );
}

export default Posts;
