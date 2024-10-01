import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Edit.css'; // Import the CSS file for styles

const Edit = () => {
    const { id } = useParams(); // Access the ID from the URL
    const [post, setPost] = useState({ title: '', content: '', author: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPost(response.data); // Set the post data for editing
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/posts/${id}`, post, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/posts'); // Redirect to Posts after successful update
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="edit-container">
            <h2 className="edit-header">Edit Post</h2>
            <form onSubmit={handleSubmit} className="edit-form">
                <input
                    type="text"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    placeholder="Post Title"
                    required
                    className="edit-input"
                />
                <textarea
                    value={post.content}
                    onChange={(e) => setPost({ ...post, content: e.target.value })}
                    placeholder="Post Content"
                    required
                    className="edit-input"
                />
                <input
                    type="text"
                    value={post.author}
                    onChange={(e) => setPost({ ...post, author: e.target.value })}
                    placeholder="Author"
                    required
                    className="edit-input"
                />
                <button type="submit" className="update-post-button">Update Post</button>
            </form>
        </div>
    );
}

export default Edit;
