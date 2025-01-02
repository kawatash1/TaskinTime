import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <Link to="/"><h1>TaskinTime</h1></Link>
            <nav className="nav">
                <Link to="/">Dashboard</Link>
                <Link to="/completed">Completed</Link>
                <Link to="/future">Future</Link>
                <Link to="/priority">Priority</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>

            </nav>
        </header>
    );
}

export default Header;