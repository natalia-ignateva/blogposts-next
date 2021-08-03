import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Router from 'next/router';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [blogurl, setBlogurl] = useState('');
    const [feedurl, setFeedurl] = useState('');
    const [notes, setNotes] = useState('');
    const [response, setResponse] = useState('');

    const submitForm = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch('/api/blog', {
                method: 'POST',
                body: JSON.stringify({ name, email, blogurl, feedurl, notes }),
                headers: { 'Content-Type': 'application/json' },
            });

            const { success, message } = await res.json();

            if (success) {
                alert('Thank you for submitting new blog!');
                Router.push('/');
            } else {
                setResponse(message);
            }
        } catch ({ message }) {
            setResponse(
                `An error occured while submitting the form:\n${message}`,
            );
        }
    };

    return (
        <div>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css"
                />
            </Head>
            <div>
                <header>
                    <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-items-center">
                            <h1 className="text-3xl font-bold leading-tight text-gray-900">
                                Add new blog
                            </h1>
                        </div>
                    </div>
                    <p className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <Link href="/">
                            <div>
                                <a className="rounded-full cursor-pointer px-5 py-3 bg-blue-500 text-white text-semibold text-center hover:bg-blue-800">
                                    Back
                                </a>
                            </div>
                        </Link>
                    </p>
                </header>
                <main>
                    <p className="text-center pb-5">{response}</p>
                    <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                        <form
                            className="mt-5 md:mt-0 md:col-span-2"
                            onSubmit={submitForm}
                            method="post"
                            action=""
                        >
                            <div>
                                <label className="block text-sm font-medium leading-5 text-gray-700">
                                    Blog name
                                </label>
                                <input
                                    className="mb-5 mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    required
                                ></input>
                                <label className="block text-sm font-medium leading-5 text-gray-700">
                                    Email address
                                </label>
                                <input
                                    className="mb-5 mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    value={email}
                                    onChange={({ target: { value } }) =>
                                        setEmail(value)
                                    }
                                    type="email"
                                    placeholder="example@example.com"
                                ></input>
                                <label className="block text-sm font-medium leading-5 text-gray-700">
                                    Blog URL
                                </label>
                                <input
                                    className="mb-5 mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    value={blogurl}
                                    onChange={(event) =>
                                        setBlogurl(event.target.value)
                                    }
                                    type="url"
                                    placeholder="https://www.example.com"
                                    required
                                ></input>
                                <label className="block text-sm font-medium leading-5 text-gray-700">
                                    RSS feed URL
                                </label>
                                <input
                                    className="mb-5 mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    value={feedurl}
                                    onChange={(event) =>
                                        setFeedurl(event.target.value)
                                    }
                                    type="url"
                                    placeholder="https://www.example.com/feed"
                                    required
                                ></input>
                                <label
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                    htmlFor="about"
                                >
                                    Notes
                                </label>
                                <textarea
                                    className="mb-5 mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    value={notes}
                                    onChange={(event) =>
                                        setNotes(event.target.value)
                                    }
                                    rows="3"
                                    placeholder="Anything you want to say"
                                ></textarea>
                                <div>
                                    <div className="flex justify-end items-center">
                                        <p className="text-xs p-5 font-weight-400 text-green-600">
                                            Your submission will be approved
                                            before appearing on the site
                                        </p>
                                        <div>
                                            <button
                                                className="rounded-full cursor-pointer  px-5 py-3 bg-green-500 text-white text-semibold text-center hover:bg-green-800 text-base"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Form;
