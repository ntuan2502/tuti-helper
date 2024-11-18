import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['picsum.photos'], // Thêm domain picsum.photos vào đây
    },
  };
 
export default withNextIntl(nextConfig);