/**
 * Fetches the Medium RSS feed and writes src/data/blogPosts.json.
 *
 * Runs automatically before every `npm run build`. To refresh locally
 * after publishing a new post: `npm run sync:blog`
 *
 * Medium's feed sends no CORS headers, so this must happen at build
 * time rather than in the browser.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const MEDIUM_HANDLE = '@tribhuwanbhatt7'
const FEED_URL = `https://medium.com/feed/${MEDIUM_HANDLE}`
const MAX_POSTS = 5
const WORDS_PER_MINUTE = 200

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/blogPosts.json')

const cdata = (block, tag) =>
  block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`))?.[1] ?? ''

const stripTags = (html) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/** Trim to a word boundary so excerpts never end mid-word. */
function excerpt(text, limit = 165) {
  if (text.length <= limit) return text
  const cut = text.slice(0, limit)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

function parse(xml) {
  return xml
    .split('<item>')
    .slice(1)
    .map((item) => {
      const body = stripTags(cdata(item, 'content:encoded'))
      const words = body.split(' ').filter(Boolean).length
      const published = new Date(item.match(/<pubDate>([^<]*)<\/pubDate>/)?.[1] ?? '')

      return {
        title: cdata(item, 'title'),
        // Drop Medium's ?source= tracking param.
        url: (item.match(/<link>([^<]*)<\/link>/)?.[1] ?? '').split('?')[0],
        excerpt: excerpt(body),
        date: published.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        readTime: `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min`,
      }
    })
    .filter((post) => post.title && post.url)
    .slice(0, MAX_POSTS)
}

try {
  const response = await fetch(FEED_URL, { signal: AbortSignal.timeout(15_000) })
  if (!response.ok) throw new Error(`Feed returned ${response.status}`)

  const posts = parse(await response.text())
  if (posts.length === 0) throw new Error('Feed contained no posts')

  writeFileSync(OUT, `${JSON.stringify(posts, null, 2)}\n`)
  console.log(`✓ Synced ${posts.length} Medium posts`)
} catch (error) {
  // Never fail the build on a network hiccup — the committed JSON is the fallback.
  console.warn(`⚠ Blog sync skipped (${error.message}). Using existing blogPosts.json.`)
}
