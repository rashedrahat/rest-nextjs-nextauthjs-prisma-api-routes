import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'

// POST /api/money/update
// Required fields in body: userId, userBalance
export default async function handle(req, res) {
    if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (!session) res.status(401).json({ success: false, msg: 'Unauthorized! Please login first to update user balance.' })
        else {
            try {
                const { userId, userBalance } = req.body
                if (userId && userBalance) {
                    if (typeof userBalance == "number" && typeof userId == "number") {
                        const exist = await prisma.money.findFirst({ where: { userId } })
                        if (!exist) {
                            res.status(404).json({ success: false, msg: `No user found with id: ${userId}!` })
                        } else {
                            // User balance updation
                            const result = await prisma.money.update({
                                where: { userId },
                                data: { userBalance },
                                select: {userBalance: true}
                            });
                            res.status(200).json({ success: true, msg: 'Updated successfully.', data: result })
                        }
                    } else {
                        if (typeof userId != "number" && typeof userBalance != "number") res.status(400).json({ success: false, msg: 'Invalid User Id & Balance! It has to be a valid number.' })
                        else if(typeof userId != "number") res.status(400).json({ success: false, msg: 'Invalid User Id! It has to be a valid number.' })
                        else if(typeof userBalance != "number") res.status(400).json({ success: false, msg: 'Invalid User Balance! It has to be a valid number.' })
                    }
                } else {
                    if(!userId && !userBalance) res.status(400).json({ success: false, msg: 'Validation error!', errors: `User Id & User Balance fields can't be empty!` })
                    else if(!userId) res.status(400).json({ success: false, msg: 'Validation error!', errors: `User Id field can't be empty!` })
                    else if(!userBalance) res.status(400).json({ success: false, msg: 'Validation error!', errors: `User Balance field can't be empty!` })
                }
            } catch (error) {
                console.log(error)
                res.status(500).json({ success: false, msg: 'Something went wrong.' })
            } finally {
                await prisma.$disconnect()
            }
        }
    } else res.status(400).json({msg: `Unable to proceed the HTTP ${req.method} request!`})
}