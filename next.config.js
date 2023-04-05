module.exports = {
  images: {
    imageSizes: [18, 36, 54, 24, 48, 72, 96, 144],
    domains: [
      'dl.airtable.com',
      'emoji.slack-edge.com',
      'cloud-lp0r5yk68.vercel.app',
      'avatars.slack-edge.com',
      'secure.gravatar.com',
      'i.imgur.com',
      'www.gravatar.com',
      'ca.slack-edge.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/api",
      },
    ];
  },
};
