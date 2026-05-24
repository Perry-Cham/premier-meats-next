const { withPayload } = require("@payloadcms/next/withPayload");
/** @type {import('next').NextConfig} */
const nextConfig = {
   allowedDevOrigins: ['192.168.43.116'],
   // cacheComponents:true
   compiler:{
      removeConsole: process.env.NODE_ENV === 'production' ? {
         exclude: ['error', 'warn']
      } : false
   }
};

module.exports = withPayload(nextConfig);
