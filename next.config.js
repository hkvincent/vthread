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
                hostname: "dhzu9iazkoiza1a2.public.blob.vercel-storage.com",
                protocol: "https"
            }
        ]
    }
}

module.exports = nextConfig
