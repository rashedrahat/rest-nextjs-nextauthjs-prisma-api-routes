import { getSession } from 'next-auth/client'
import { proceedUserCreation } from '../../../util/helpers'

// POST /api/user/create
// Required fields in body: email, password
// Optional fields in body: name
export default async function handle(req, res) {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    if (!session) res.status(401).json({ success: false, msg: 'Unauthorized! Please login first to create an user.' })
    else proceedUserCreation(req, res)
  } else {
    res.status(400).json({msg: `Unable to proceed the HTTP ${req.method} request!`})
  }
}