/* eslint-disable no-unused-vars */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied
                // const user = await Auth.findOne({ where: { email: credentials.email } });
                // if (user) {
                //     const isValid = await bcrypt.compare(credentials.password, user.password);
                //     if (isValid) {
                //         const getUser = await Auth.findOne({
                //             where: { email: user.email },
                //             attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
                //         });
                //         return getUser;
                //     }
                //     throw new Error('Credentials do not match');
                // } else {
                //     throw new Error('No user found');
                // }
            },
        }),
    ],
});
