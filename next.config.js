/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
        ],
        domains: ['tailwindui.com', 'images.unsplash.com', 'lorfdthkhhtfyzxdqoxa.supabase.co'],
    }
}

module.exports = nextConfig

