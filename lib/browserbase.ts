import { Browserbase } from "@browserbasehq/sdk"

export const browserbase = new Browserbase({
  apiKey: process.env.SCRAPING_API_KEY || process.env.BROWSERBASE_API_KEY,
})
