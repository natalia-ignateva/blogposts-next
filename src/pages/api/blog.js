export default function blog({ method, body }, { json, status }) {
    if (method !== 'POST') {
        status(405).end();
        return;
    }

    const { name, email, blogurl, feedurl, notes } = body;

    const Airtable = require('airtable');
    const myBase = new Airtable({ apiKey: process.env.APIKEY }).base(
        'appkJZ3f5To6q2NRo',
    );

    myBase('Blogs List').create(
        [{ fields: { name, email, blogurl, feedurl, notes } }],
        (err) => {
            if (err) {
                console.error(err);
                status(500).end();
                return;
            }
        },
        json({
            success: true,
        }),
    );
}
