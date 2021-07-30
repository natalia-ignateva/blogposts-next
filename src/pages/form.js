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
            <Head></Head>
            <div>
                <header>
                    <h1>Add new blog</h1>
                    <p>
                        <Link href="/">
                            <a>Back</a>
                        </Link>
                    </p>
                </header>
                <main>
                    <p>{response}</p>
                    <form onSubmit={submitForm} method="post" action="">
                        <div>
                            <label>Blog name</label>
                            <input
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                required
                            ></input>
                            <label>Email address</label>
                            <input
                                value={email}
                                onChange={({ target: { value } }) =>
                                    setEmail(value)
                                }
                                type="email"
                                placeholder="example@example.com"
                            ></input>
                            <label>Blog URL</label>
                            <input
                                value={blogurl}
                                onChange={(event) =>
                                    setBlogurl(event.target.value)
                                }
                                type="url"
                                placeholder="https://www.example.com"
                                required
                            ></input>
                            <label>RSS feed URL</label>
                            <input
                                value={feedurl}
                                onChange={(event) =>
                                    setFeedurl(event.target.value)
                                }
                                type="url"
                                placeholder="https://www.example.com/feed"
                                required
                            ></input>
                            <label htmlFor="about">Notes</label>
                            <textarea
                                value={notes}
                                onChange={(event) =>
                                    setNotes(event.target.value)
                                }
                                rows="3"
                                placeholder="Anything you want to say"
                            ></textarea>
                            <p>
                                Your submission will be approved before
                                appearing on the site
                            </p>
                            <div>
                                <button type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default Form;
