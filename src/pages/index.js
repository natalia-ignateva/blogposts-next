import Head from 'next/head';
import Link from 'next/link';
import Parser from 'rss-parser';
import Airtable from 'airtable';

const Home = (props) => (
    <div>
        <Head>
            <title>Latest posts</title>
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
                            Latest posts
                        </h1>
                    </div>
                </div>
                <p className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <Link href="/form">
                        <div>
                            <a className="rounded-full cursor-pointer px-5 py-3 bg-blue-500 text-white text-semibold text-center hover:bg-blue-800">
                                Add a new blog
                            </a>
                        </div>
                    </Link>
                </p>
            </header>
            <main className="px-6 py-3 max-w-2xl mx-auto sm:px-6 lg:px-8">
                <table>
                    <thead>
                        <tr>
                            <th className=" py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.posts
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="pt-4 text-base leading-5 font-medium text-gray-900 hover:text-gray-600">
                                                <a href={value.link}>
                                                    {value.title}
                                                </a>
                                            </div>
                                            <div className="pt-3 text-xs leading-5 font-weight-400 text-gray-900 hover:text-gray-600">
                                                <a href={value.link}>
                                                    {value.name}
                                                </a>
                                            </div>
                                            <div className="border-b border-gray-200 pb-4 text-xs leading-5 font-weight-400 text-gray-400">
                                                {new Date(
                                                    value.date,
                                                ).toDateString()}
                                            </div>
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

        data.items.slice(0, 5).forEach((item) => {
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
