/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
                protocol: "https"
            },
            {
                hostname: "cloudflare-ipfs.com",
                protocol: "https"
            },
            {
                hostname: "syow2vy5k302osau.public.blob.vercel-storage.com",
                protocol: "https"
            },
            {
                hostname: "lh3.googleusercontent.com",
                protocol: "https"
            }
        ]
    }
}

module.exports = nextConfig
