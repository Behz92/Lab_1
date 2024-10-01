import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './New.css'; // Import the CSS file for styles

function New() {
    const [post, setPost] = useState({ title: '', content: '', author: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/posts', post, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/posts'); // Redirect to Posts after successful creation
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="new-container">
            <h2 className="new-header">Create New Post</h2>
            <form onSubmit={handleSubmit} className="new-form">
                <input
                    type="text"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    placeholder="Post Title"
                    required
                    className="new-input"
                />
                <textarea
                    value={post.content}
                    onChange={(e) => setPost({ ...post, content: e.target.value })}
                    placeholder="Post Content"
                    required
                    className="new-input"
                />
                <input
                    type="text"
                    value={post.author}
                    onChange={(e) => setPost({ ...post, author: e.target.value })}
                    placeholder="Author"
                    required
                    className="new-input"
                />
                <button type="submit" className="add-post-button">Add Post</button>
            </form>
        </div>
    );
}

export default New;
