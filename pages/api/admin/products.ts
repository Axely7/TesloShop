import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = 
| {message: string}
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            return getProducts(req, res);
            
        case 'PUT':

        case 'POST':
    
        default:
            return res.status(400).json({message: 'Bad request'})
    }

    
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {

   await db.connect()

   const products = await Product.find()
    .sort({title: 'asc'})
    .lean()

   await db.disconnect()

   // Actualizar imagenes

   res.status(200).json(products);
}
