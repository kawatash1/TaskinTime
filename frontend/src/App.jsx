import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Completed from './pages/Completed';
import Future from './pages/Future';
import Priority from './pages/Priority';
import Favorites from './pages/Favorites';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/Profile';
import TaskDetails from './components/Tasks/TaskDetails.jsx';

// Импортируем Header
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main className="main">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/completed" element={<Completed />} />
                        <Route path="/future" element={<Future />} />
                        <Route path="/priority" element={<Priority />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/task/:id" element={<TaskDetails />} />

                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
        
    );
}

export default App;