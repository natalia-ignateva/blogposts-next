import Head from 'next/head';
import Link from 'next/link';

const Form = () => {
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
                    <form method="post" action="">
                        <div>
                            <label>Blog name</label>
                            <input required></input>
                            <label>Email address</label>
                            <input
                                type="email"
                                placeholder="example@example.com"
                            ></input>
                            <label>Blog URL</label>
                            <input
                                type="url"
                                placeholder="https://www.example.com"
                                required
                            ></input>
                            <label>RSS feed URL</label>
                            <input
                                type="url"
                                placeholder="https://www.example.com/feed"
                                required
                            ></input>
                            <label htmlFor="about">Notes</label>
                            <textarea
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
