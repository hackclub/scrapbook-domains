const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { host } = req.headers;
  if (!host) {
    return res.status(500).send("No host header found");
  }
  console.log("Host", host);
  // If you’re viewing the production site not from a custom domain
  if (
    [
      req.headers["x-vercel-deployment-url"],
      "summer-domains.vercel.app",
      "summer-domains.hackclub.dev",
    ].includes(host)
  ) {
    return res.send(`
      <title>Hacker Detected</title>
      <h1>Hello, hacker!</h1>
      <a href="https://github.com/hackclub/summer-domains">What’s this?</a>
    `);
  }
  // Find the user who set up the custom domain this site is being accessed from
  const user = await fetch(
    "https://scrapbook.hackclub.com/api/users/"
  )
    .then((r) => r.json())
    .then((r) => r.filter(function(user){
        return user.customDomain == host;
    }))
    .catch(() =>
      res.status(500).send("Encountered error locating appropriate profile")
    );
  console.log("User", user);
  // If the domain isn’t set up on a user
  if (user.length == 0) {
    return res
      .status(404)
      .send(`Unable to find a scrapbook page with domain ${host}.`);
  }
  // Get the username of the user
  const username = user[0].username|| "zrl";
  const url = `https://scrapbook.hackclub.com/${username}`;
  console.log("URL", url);
  // Directly serve the HTML of the profile page
  const html = await fetch(url)
    .then((r) => r.text())
    .catch(() =>
      res.status(500).send("Encountered error serving profile page")
    );
  res.send(html);
};
