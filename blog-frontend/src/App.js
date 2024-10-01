import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Posts from './Posts';
import New from './New';
import Edit from './Edit';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/new" element={<New />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </Router>
    );
}

export default App;
