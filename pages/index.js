import Head from 'next/head';
import Parser from 'rss-parser';

const Home = (props) => (
  <div>
    <Head>
      <title>Latest posts</title>
    </Head>
    <div>
      <header>
        <h1>Latest posts</h1>
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
              //.sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((value, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div>
                        <a href={value.link}>{value.title}</a>
                      </div>
                      <div>{value.name}</div>
                    </td>
                    <td>{new Date(value.date).toDateString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  </div>
);

export async function getStaticProps(context) {
  const parser = new Parser();

  const feed = await parser.parseURL('https://teacherluke.co.uk/feed/');

  const posts = feed.items.reduce(
    (acc, item) =>
      acc.concat({
        title: item.title,
        link: item.link,
        date: item.pubDate,
        name: 'Luke Thompson',
      }),
    [],
  );

  /*const posts = [];

  feed.items.forEach((item) => {
    posts.push({
      title: item.title,
      link: item.link,
      date: item.pubDate,
      name: 'Luke Thompson',
    });
  });*/
  return {
    props: {
      posts,
    },
  };
}

export default Home;
