const { withPayload } = require("@payloadcms/next/withPayload");
/** @type {import('next').NextConfig} */
const nextConfig = {
    cacheComponents:true
};

module.exports = withPayload(nextConfig);
