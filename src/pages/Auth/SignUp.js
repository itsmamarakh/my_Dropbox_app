import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../components/store/AuthStore';
import { Oval } from 'react-loader-spinner';
import Alert from '../../ui/alerts/Alert';
import './signIn.css'

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const emailField = emailRef.current.value;
        const passwordField = passwordRef.current.value;
        const passwordConfirmField = passwordConfirmRef.current.value;
        if(passwordField !== passwordConfirmField) {
            return setError("Passwords don't match!");
        }

        try {
            setError('');
            setLoading(true);
            await signUp(emailField, passwordField);
        } catch (error) {
            setError("Failed to create an account!");
        }

        setMessage("Succesfuly created account");
        setLoading(false);
        navigate("/");
    }

    return (
        <>
        <div className="bg2 h-screen bg-slate-100 flex items-center justify-center">
            <div className="border drop-shadow-2xl bg-white rounded-lg py-9 px-4 max-w-xs w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl tracking-tight font-bold text-gray-900">
                        Sign Up
                    </h2>
                </div>
                {
                    message && (
                        <Alert type={"success"}>{ message }</Alert>
                    )
                }
                {
                    error && (
                        <Alert type={"error"}>{ error }</Alert>
                    )
                }
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email
                            </label>
                            <input
                                ref={emailRef}
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email..."
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                ref={passwordRef}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-4 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password..."
                            />
                        </div>

                        <div>
                            <label htmlFor="password-confirm" className="sr-only">
                                Password Confirm
                            </label>
                            <input
                                ref={passwordConfirmRef}
                                id="password-confirm"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-4 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password Confirm..."
                            />
                        </div>
                    </div>
        
                    <div>
                        <button
                                type="submit"
                                className="group mx-auto flex justify-center items-center py-2 px-7 rounded border border-transparent text-sm bg-blue-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-blue-700"
                            >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {
                                    loading &&
                                    <Oval
                                    height={17}
                                    width={17}
                                    color="#fff"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#fff"
                                    strokeWidth={4}
                                    strokeWidthSecondary={2}
                                    />
                                }
                            </span>
                            Sign Up
                        </button>
                    </div>
                    <div className="!mt-4 text-center">
                        <Link className="font-medium text-black hover:text-blue-900" to={"/signin"}>Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
};

export default SignUp;