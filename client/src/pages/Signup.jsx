import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/sign-in');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-50'>
            <div className='max-w-xl w-full mx-auto p-8 bg-white rounded-lg shadow-md'>
                <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input type='text' placeholder='Username' className='border p-3 rounded-lg text-lg' id="name" onChange={handleChange} />
                    <input type='text' placeholder='Email' className='border p-3 rounded-lg text-lg' id="email" onChange={handleChange} />
                    <input type='password' placeholder='Password' className='border p-3 rounded-lg text-lg' id="password" onChange={handleChange} />
                    <button disabled={loading} className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-700 disabled:opacity-80'>
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                </form>

                <div className='flex gap-2 mt-5'>
                    <p>Have an account</p>
                    <Link to='/signin'>
                        <span className='text-blue-700'>Sign in</span>
                    </Link>
                </div>

                {error && <p className='text-red-600 mt-5'>{error}</p>}
            </div>
        </div>
    );
};

export default Signup;
