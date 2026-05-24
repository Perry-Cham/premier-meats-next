import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
//If using S3 storage uncomment and use this 
//import { s3Storage } from '@payloadcms/storage-s3';
//But I'm using vercel so I'm going to use this instead 
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
// Where I impor payload collections
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { ProductPages } from "./collections/Product-Pages";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const requiredEnvVars = {
DATABASE_URL: process.env.DATABASE_URL,
PAYLOAD_SECRET:  process.env.PAYLOAD_SECRET,
BLOB_READ_WRITE_TOKEN:process.env.BLOB_READ_WRITE_TOKEN
}

for(const [key, value] of Object.entries(requiredEnvVars)){
  if(requiredEnvVars[key] == undefined || value == ""){
    throw new Error(`Missing env var ${key}`);
    
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, ProductPages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL,
  }),
  sharp,
  plugins: [
  vercelBlobStorage({
    enabled:true,
    token:process.env.BLOB_READ_WRITE_TOKEN,
    collections:{
      media:true,
    }

  })
  ],
});
