const fetch = require('node-fetch')

module.exports = async (req, res) => {
  const { host } = req.headers
  console.log('Host', host)
  if (!host) return res.status(500).send('No host header found')
  const opts = {
    maxRecords: 1,
    filterByFormula: `{Custom Domain} = "${host}"`
  }
  const user = await fetch(
    `https://api2.hackclub.com/v0.1/Summer%20Of%20Making%20Streaks/Slack%20Accounts/?select=${JSON.stringify(
      opts
    )}&authKey=${process.env.AIRTABLE_KEY}`
  ).then(r => r.json())
  if (!user) {
    return res
      .status(404)
      .send(`Couldn’t find a scrapbook page with domain ${host}.`)
  }
  const username = user.fields['Username'] || 'zrl'
  const url = `https://streak.hackclub.com/${username}`
  const html = await fetch(url).then(r => r.text())
  res.send(html)
}
