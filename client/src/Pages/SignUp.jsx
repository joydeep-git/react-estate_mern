import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await fetch("/api/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success === false) {
                setLoading(false);
                alert(data.message);
            } else {
                alert("User created successfully!");
                navigate('/sign-in')
            }

            setLoading(false);

            setFormData({
                username: "",
                email: "",
                password: ""
            });
        } catch (err) {
            setLoading(false);
            alert(err);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center my-6 p-3'>
            <h1 className='font-bold text-4xl mb-4 text-center'>Create Account</h1>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 items-center bg-slate-100 p-6 rounded-md max-w-md w-full'>

                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder='Enter Username'
                    className='border border-slate-500 p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
                    value={formData.username}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter email '
                    className='border border-slate-500 p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name='password'
                    id='password'
                    placeholder='Enter Password'
                    className='border border-slate-500 p-2 rounded-md w-full focus:outline-none  placeholder:text-xl'
                    value={formData.password}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full uppercase'>{loading ? "Loading..." : "Sign Up"}</button>
                <button className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full uppercase'>Continue with Google</button>

                <p className='text-lg'>
                    Already have an account? <Link to='/sign-in' className='text-blue-500 hover:underline font-semibold'>Sign In</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;