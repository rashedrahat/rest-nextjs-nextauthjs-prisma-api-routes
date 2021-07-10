import {proceedUserCreation} from '../../../util/helpers'

// POST /api/auth/signup
// Required fields in body: email, password
// Optional fields in body: name
export default async function handle(req, res) {
    if (req.method === 'POST') proceedUserCreation(req, res)
    else res.status(400).json({msg: `Unable to proceed the HTTP ${req.method} request!`})
}