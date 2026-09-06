import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Vinext's dynamic-route exporter requests URLs without a trailing slash.
  // postbuild also writes directory indexes for GitHub Pages and static hosts.
  trailingSlash: false,
};

export default nextConfig;
