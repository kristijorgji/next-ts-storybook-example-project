import { NextIronRequest, withSession } from '../../utils/auth';
import { NextApiResponse } from 'next';

export default withSession(async (req: NextIronRequest, res: NextApiResponse) => {
    try {
        const credentials: { email: string; password: string } = req.body;
        // here you can call external api or do custom logic to validate credentials

        const r = { status: 404 };
        if (credentials.email === 'k@test.com' && credentials.password === 'test') {
            r.status = 200;
        }

        if (r.status === 200) {
            const session = {
                id: 1,
                token: '1-2-2-2-2-2',
            };
            req.session.set('user', session);
            await req.session.save();
            res.json(session);
        } else {
            res.status(401);
            res.end();
        }
    } catch (error) {
        // @ts-ignore
        const { response: fetchResponse } = error;
        // @ts-ignore
        res.status(fetchResponse?.status || 500).json(error.data);
    }
});
