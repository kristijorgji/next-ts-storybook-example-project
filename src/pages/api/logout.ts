import { NextIronRequest, UserSession, withSession } from '../../utils/auth';
import { NextApiResponse } from 'next';

export default withSession(async (req: NextIronRequest, res: NextApiResponse) => {
    const user = req.session.get('user') as UserSession | undefined;
    if (user) {
        // you can invalidate some token or do your action here, api call or nothing
    }

    req.session.destroy();
    res.status(200);
    res.end();
});
