const { withPayload } = require("@payloadcms/next/withPayload");
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
 remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },]
  },
   // cacheComponents:true
   //Surpress console logs in production, except for errors and warnings. Still wonder why we do this 
   compiler:{
      removeConsole: process.env.NODE_ENV === 'production' ? {
         exclude: ['error', 'warn']
      } : false
   }
};

module.exports = withPayload(nextConfig);
