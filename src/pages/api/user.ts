import { NextIronRequest, UserSession, withSession } from '../../utils/auth';
import { NextApiResponse } from 'next';

export default withSession(async (req: NextIronRequest, res: NextApiResponse) => {
    const user = req.session.get('user') as UserSession | undefined;

    if (user) {
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed
        res.json({
            isLoggedIn: true,
            user: {
                id: user.id,
            },
        });
    } else {
        res.json({
            isLoggedIn: false,
        });
    }
});
