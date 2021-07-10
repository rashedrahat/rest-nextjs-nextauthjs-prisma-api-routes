import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import prisma from '../../../lib/prisma'

const options = {
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "something@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials
                const user = await prisma.user.findFirst({ where: { email, password } })
            
                // If no error and we have user data, return it
                if (user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ]
}

export default (req, res) => NextAuth(req, res, options)