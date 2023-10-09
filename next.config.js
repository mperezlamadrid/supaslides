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
        domains: ['kanuclezxsxdsqkuzadp.supabase.co', 'tailwindui.com', 'images.unsplash.com', 'eedqrpjrmjwpmtdwamyq.supabase.co', 'steqjyagbnnlrvmzxyqt.supabase.co'],
    }
}

module.exports = nextConfig

