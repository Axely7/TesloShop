import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import Product from '../../../models/Product';

type Data = | {
    message: string
} | IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
    case 'GET':
        
        return getProductBySlug(req, res);
   
    default:
        return res.status(400).json({
            message: 'Bad request'
        })
   }
}

const getProductBySlug = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { slug } = req.query;

    await db.connect();
    const productToGet = await Product.findOne({slug}).lean();

    if(!productToGet){
        await db.disconnect();
        return res.status(404).json({message: 'No hay producto con ese Slug' + slug});
    }
    await db.disconnect();


    productToGet.images = productToGet.images.map(image => {
        return image.includes('http') ? image : `${process.env.HOST_NAME}products/${ image }`
    })


    return res.status(200).json(productToGet!)
}
