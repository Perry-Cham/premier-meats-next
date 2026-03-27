import path from 'path';
import fs from 'fs'

async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file); // The raw file from an input or buffer
  formData.append('alt', 'Fresh Organic Chicken');

  const response = await fetch('http://localhost:3000/api/media', {
    method: 'POST',
    body: formData,
    // Note: Do NOT manually set 'Content-Type' header; 
    // the browser/node will set it with the correct "boundary" for you.
  });

  const data = await response.json();
  return data.doc.id; // Payload returns the created document in the 'doc' field
}

export async function main() {
  const pathname = path.join(path.dirname(import.meta.url), "all_documents.json")
  console.log(pathname)
  const data = fs.readFileSync('./all_documents.json');
  const pData = JSON.parse(data.toString('utf-8'))
  console.log(pData);
  pData.forEach(p => {
    for (const [key, value] of Object.entries(p)) {
      const image = fs.readFileSync(p['image'])
      const filename = p['image'].split('/')[2]
      console.log(p, image, image.length, filename)
    }
  })

  // 1. Create the Media (Image) document
  // This uploads the physical file to your storage provider
  /*  const uploadedImage = await payload.create({
     collection: 'media', 
     data: {
       alt: 'Fresh Beef Ribs',
     },
     // The 'filePath' is the absolute path to the image on your machine/server
     filePath: path.resolve(__dirname, './temp-assets/ribs.jpg'),
   });
 
   // 2. Create the Product document
   // Use the ID from the uploaded image in the 'images' array
   const newProduct = await payload.create({
     collection: 'products',
     data: {
       name: 'Premium Beef Ribs',
       category: 'Meat',
       subcategory: 'Beef',
       price: 25.99,
       featured: true,
       // Matches your 'images' array field schema
       images: [
         {
           image: uploadedImage.id, // The ID from Step 1
           alt: 'A close up of premium beef ribs',
         },
       ],
       _status: 'published', // Required if versions/drafts are enabled
     },
   });
 
   return newProduct; */
}
main();