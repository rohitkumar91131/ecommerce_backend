import fetch from 'node-fetch';
import lqip from 'lqip-modern';

export default async function getBase64(url){
    try{
        const res = await fetch(url);
        const buffer = await res.arrayBuffer();
        const base64 = Buffer.from(buffer);
        const {metadata} = await lqip(base64);
        console.log(metadata.dataURIBase64)
        return metadata.dataURIBase64;
    }
    catch(err){
        return null;
    }
}

getBase64("http://localhost:3000/logo.svg")