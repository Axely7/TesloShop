import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';

type Data = 
| {message: string}
| IProduct[]
| IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            return getProducts(req, res);
            
        case 'PUT':
            return updateProduct(req, res);

        case 'POST':
            return createProduct(req, res);
    
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
async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { _id = '', images = [] } = req.body as IProduct

    if( !isValidObjectId(_id) ){
        return res.status(400).json({ message: 'El id del producto no es válido' })
    }

    if(images.length < 2){
        return res.status(400).json({ message: 'Es necesario al menos 2 imágenes' })

    }

    try {
        await db.connect();

        const producto = await Product.findById(_id);

        if(!producto){
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con ese ID' })

        }

        // TODO: eliminar fotos en Cloudinary

        await producto.update(req.body);

        await db.disconnect();

        return res.status(200).json(producto)

    } catch (error) {
        console.log(error)
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' })
    }
}

async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    const { images = [] } = req.body as IProduct;

    if(images.length < 2){
        return res.status(400).json({ message: 'El producto necesita al menos 2 imágenes' })
    }

    try {
        await db.connect();

        const productInDB = await Product.findOne({ slug: req.body.slug });
        if(productInDB){
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe un producto con ese slug' })
        }

        const product = new Product(req.body);

        await product.save()
        await db.disconnect();

        return res.status(200).json(product)
        
    } catch (error) {
        console.log(error)
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' })
    }

}

