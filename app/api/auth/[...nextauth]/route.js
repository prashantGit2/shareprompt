import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@utils/database";
import User from "@models/user";

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({session}){
            /* This code is retrieving the user's session object and finding the corresponding user in the
            database based on their email. It then sets the user's ID in the session object to the ID of
            the corresponding user in the database. Finally, it returns the updated session object. This
            is useful for maintaining a consistent user session across requests and ensuring that the
            correct user information is used throughout the application. */
            const sessionUser = await User.findOne({email: session.user.email});
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}){
            try {
                //serverless => 
                await connectToDatabase();
                // check if a user exists
                const user = await User.findOne({email: profile.email});
                // if not, create a new user
                if (!user){
                    await User.create({
                        email: profile.email,
                        image: profile.picture,
                        username: profile.name.replace(" ","").toLowerCase(),
                    });
                }
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        },
    }
    
  
}
// console.log({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// })

const handler = NextAuth(options);

export {handler as GET, handler as POST}