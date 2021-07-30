import Head from 'next/head';
import Link from 'next/link';
import Parser from 'rss-parser';
import Airtable from 'airtable';

const Home = (props) => (
    <div>
        <Head>
            <title>Latest posts</title>
        </Head>
        <div>
            <header>
                <h1>Latest posts</h1>
                <p>
                    <Link href="/form">
                        <a>Add a new blog</a>
                    </Link>
                </p>
            </header>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Post</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.posts
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div>
                                                <a href={value.link}>
                                                    {value.title}
                                                </a>
                                            </div>
                                            <div>{value.name}</div>
                                        </td>
                                        <td>
                                            {new Date(
                                                value.date,
                                            ).toDateString()}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </main>
        </div>
    </div>
);

export default Home;

export async function getStaticProps() {
    const parser = new Parser();

    const base = new Airtable({ apiKey: process.env.APIKEY }).base(
        'appkJZ3f5To6q2NRo',
    );

    const records = await base('Blogs List')
        .select({
            view: 'Grid view',
        })
        .firstPage();

    const feeds = records
        .filter((record) => {
            if (record.get('approved') === true) return true;
        })
        .map((record) => {
            return {
                id: record.id,
                name: record.get('name'),
                blogurl: record.get('blogurl'),
                feedurl: record.get('feedurl'),
            };
        });

    const posts = [];

    for (const feed of feeds) {
        console.log(feed.feedurl);
        const data = await parser.parseURL(feed.feedurl);

        data.items.slice(0, 10).forEach((item) => {
            posts.push({
                title: item.title,
                link: item.link,
                date: item.pubDate,
                name: feed.name,
            });
        });
    }

    return {
        props: {
            posts,
        },
    };
}
