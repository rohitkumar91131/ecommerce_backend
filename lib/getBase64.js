import fetch from 'node-fetch';
import lqip from 'lqip-modern';

export default async function getBase64(url){
    try{
        const res = await fetch(url);
        const buffer = await res.arrayBuffer();
        const base64 = Buffer.from(buffer);
        const {metadata} = await lqip(base64);
        return metadata.dataURIBase64;
    }
    catch(err){
        return null;
    }
}

getBase64("https://res.cloudinary.com/dkaxd3wha/image/upload/v1757185664/image_phea9i.jpg")