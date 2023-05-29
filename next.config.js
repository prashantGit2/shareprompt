/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverComponentsExternalPackages: ["mongoose"],
    },
    isIsr: false,
    images: {
        domains: ['lh3.googleusercontent.com'],
      },
    webpack(config){
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config;
    }

}

module.exports = nextConfig
