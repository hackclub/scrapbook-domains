# [Scrapbook](https://scrapbook.hackclub.com/) Domains

This repo/function handles the custom domain functionality for [Hack Club](https://hackclub.com/)’s [Scrapbook](https://scrapbook.hackclub.com/), which was built as part of the [2020 Summer of Making](https://summer.hackclub.com/).

To set up a custom domain, refer to the [Scrapbook’s About page](https://scrapbook.hackclub.com/).

## Why does this exist?

The profile pages run in the [Next.js app](https://github.com/hackclub/scrapbook), where they’re [statically rendered](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) for performance. We want people to point their own domains to the site, but you can’t CNAME to a specific path, so we need to serve the custom domain functionality at the root path. This would be doable with [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) in Next (checking the `host` header & serving the appropriate page), but it’d mean a performance hit & higher sever load for every hit to the website, which we want to avoid. This is a single [serverless function](https://vercel.com/docs/v2/serverless-functions/introduction) to serve custom domains.

## How does this work?

Behind the scenes, when you invoke the Slack slash command to add a custom domain, it hits an [API Route](https://nextjs.org/docs/api-routes/introduction) on the [website codebase](https://github.com/hackclub/scrapbook). That function:

1. Sets the domain on your user record in Airtable
2. Uses the [Vercel API](https://vercel.com/docs/api#getting-started/introduction) to [add a custom domain](https://vercel.com/docs/api#endpoints/projects/add-a-domain-to-a-project) to this project

This project is a single serverless function with a [rewrite](https://vercel.com/docs/configuration?query=rewrite#project/rewrites) at the root to it (`api/index.js`). When that site is accessed, we:

1. Get the `host` header of your request
2. Find the user by that domain in our Airtable database, accessed over [api2](https://github.com/hackclub/api2)
3. Fetch the HTML of the profile page from the [live site](https://scrapbook.hackclub.com/)
4. Serve that HTML directly

This means social cards, etc still work as expected, because while slower than accessing the main Scrapbook domain, the custom domain serves the profile as a regular HTML page, even though it doesn’t generate any of that HTML or JS in this project.

---

By [@lachlanjc](https://lachlanjc.com) for Hack Club, 2020. MIT License.
