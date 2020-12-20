module.exports = {
  async rewrites() {
    return [
      {
        "source": "/",
        "destination": "/api"
      },
      {
        "source": "/:slug*",
        "destination": "https://scrapbook.hackclub.com/:slug*"
      }
    ]
  },
}