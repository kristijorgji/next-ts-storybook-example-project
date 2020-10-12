import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../../types/Post';

const posts = require('./data');

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.statusCode = 200;
    res.json(posts.map((p: Post) => p.id));
};
