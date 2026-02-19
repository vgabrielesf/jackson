import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center">
            <img src="/path/to/logo.png" alt="Company Logo" className="h-10 w-10 mr-2" />
            <span className="text-xl font-bold">Company Name</span>
        </div>
    );
};

export default Logo;