import { NextApiRequest, NextApiResponse } from 'next';

const posts = require('./data');

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.statusCode = 200;
    res.json(posts);
};
