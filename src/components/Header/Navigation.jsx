import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="flex space-x-4">
            <Link to="/" className="text-gray-800 dark:text-gray-200 hover:underline">
                Home
            </Link>
            <Link to="/services" className="text-gray-800 dark:text-gray-200 hover:underline">
                Services
            </Link>
            <Link to="/contact" className="text-gray-800 dark:text-gray-200 hover:underline">
                Contact
            </Link>
        </nav>
    );
};

export default Navigation;