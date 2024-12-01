import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        // Fetch the user from the database using their email
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error.message);
        return session; // Return session even if an error occurs
      }
    },

    async signIn({ account, profile }) {
      try {
        await connectToDB();

        // Check if the user already exists in the database
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          // Create a new user in the database
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s+/g, "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true; // Allow the sign-in
      } catch (error) {
        console.error("Error in signIn callback:", error.message);
        return false; // Reject the sign-in
      }
    },
  },
});

export { handler as GET, handler as POST };
