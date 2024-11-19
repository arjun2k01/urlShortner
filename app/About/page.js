import React from 'react';
import Link from 'next/link';

const About = () => {
    return (
        <div className='mx-auto max-w-lg bg-white my-16 p-8 rounded-lg flex flex-col gap-4'>
            <h1 className='font-bold text-2xl'>About Us</h1>
            <p>Welcome to our URL shortener app! Our goal is to provide a simple and efficient way to shorten long URLs.</p>
            <p>We believe in simplifying the web and making it easier to share links.</p>

            <Link href="/about" className="text-blue-500 hover:underline">
                Back to Home
            </Link>
        </div>
    );
};

export default About;
