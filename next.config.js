const { withPayload } = require("@payloadcms/next/withPayload");
/** @type {import('next').NextConfig} */
const nextConfig = {
   // cacheComponents:true
   compiler:{
      removeConsole: process.env.NODE_ENV === 'production' ? {
         exclude: ['error', 'warn']
      } : false
   }
};

module.exports = withPayload(nextConfig);
