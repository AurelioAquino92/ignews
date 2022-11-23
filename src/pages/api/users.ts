import { NextApiRequest, NextApiResponse } from "next"

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: 'Aurelio'},
        { id: 2, name: 'Brenda'},
        { id: 3, name: 'Luna'}
    ]

    return response.json(users)
}