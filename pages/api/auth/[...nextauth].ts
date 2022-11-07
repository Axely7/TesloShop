import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "../../../database"


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {label: 'Correo:', type: 'email', placeholder: 'correo@google.com'},
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' }
      },
      async authorize(credentials){
        console.log(credentials)

        // return {name: 'Axel', correo: 'karla@hotmail.com', role: 'admin'}
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],

  // Callbacks:

  callbacks: {
    async jwt({ token, account, user }: any){
      // console.log({token, account, user})
      if(account){
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            
            break;

          case 'credentials':
            token.user = user
            break
        
        }
      }
      return token
    },

    async session({session, token, user}: any){
      // console.log({session, token, user})
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session
    }
    
  }
}

export default NextAuth(authOptions)