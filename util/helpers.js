import prisma from '../lib/prisma'

const proceedUserCreation = async (req, res) => {
    try {
        const { email, password, name } = req.body
        if (email && password) {
            const exist = await prisma.user.findUnique({ where: { email } })
            if (exist) {
                res.status(400).json({ success: false, msg: 'The email has already been taken!' })
            } else {
                // New user creation
                const result = await prisma.user.create({
                    data: {
                      email,
                      password,
                      name
                    },
                });

                // New money record creation for the newly registered user
                if (result.id) {
                    await prisma.money.create({
                        data: {
                          userId: result.id,
                          userBalance: 0.00
                        },
                    });
                }
                const msg = req.url === '/api/auth/signup' ? 'Signed up successfully.' : 'User created successfully.'
                res.status(201).json({ success: true, msg })
            }
        } else {
            if(!email && !password) res.status(400).json({ success: false, msg: 'Validation error!', errors: `Email & Password fields can't be empty!` })
            else if(!email) res.status(400).json({ success: false, msg: 'Validation error!', errors: `Email field can't be empty!` })
            else if(!password) res.status(400).json({ success: false, msg: 'Validation error!', errors: `Password field can't be empty!` })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: 'Something went wrong.' })
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    proceedUserCreation
}