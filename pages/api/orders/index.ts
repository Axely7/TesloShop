import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers';

type Data = {
    message: string
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            
            return createOrder(res, res)
        
    
        default:
            return res.status(400).json({message: 'Bad Request'})
    }
    
}

const createOrder = async (res: NextApiResponse<Data>, res1: NextApiResponse<Data>) => {
    return res.status(201).json({message: 'Hola mundo'})
}
