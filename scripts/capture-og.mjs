/**
 * Regenerates public/og-cover.jpg — the image social platforms show when
 * the site is shared. It's a screenshot of the real home screen, so run
 * this after the hero changes: `npm run og`
 *
 * Builds first, serves dist/ on a local port, shoots it with headless
 * Chrome at 2x, then downsamples to the 1200x630 card size.
 *
 * macOS-only: uses the system Chrome and `sips`. Both ship with the OS
 * (Chrome apart), which is why there's no Puppeteer dependency here.
 */
import { createServer } from 'node:http'
import { execFile, execFileSync } from 'node:child_process'
import { promisify } from 'node:util'
import { readFileSync, mkdtempSync, rmSync } from 'node:fs'
import { extname, join, resolve, dirname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

// Chrome and sips must not be *Sync*: a blocked event loop can't answer the
// requests Chrome makes to the server below, and the capture hangs forever.
const run = promisify(execFile)

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const OUT = join(ROOT, 'public/og-cover.jpg')
const PORT = 4181
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
}

/**
 * Reveal wrappers start at opacity 0 and animate in on intersection, which
 * headless Chrome never triggers — without this the shot is an empty
 * gradient. Force anything framer-motion has inlined to its resting state,
 * and drop the loading gate.
 */
const PATCH = `<style>.fixed.inset-0.z-\\[100\\]{display:none !important}</style>
<script>
window.addEventListener('load', function () {
  setTimeout(function () {
    document.querySelectorAll('*').forEach(function (el) {
      if (el.style && el.style.opacity !== '') {
        el.style.setProperty('opacity', '1', 'important')
        el.style.setProperty('transform', 'none', 'important')
      }
    })
  }, 300)
})
</script>
</head>`

console.log('Building…')
execFileSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' })

const server = createServer((req, res) => {
  const path = decodeURIComponent(req.url.split('?')[0])
  // Resolve inside dist/ only — a local tool, but no reason to serve the disk.
  const file = normalize(join(DIST, path === '/' ? '/index.html' : path))
  if (!file.startsWith(DIST)) return res.writeHead(403).end()

  try {
    const body = readFileSync(file)
    const type = TYPES[extname(file)] ?? 'application/octet-stream'
    res.writeHead(200, { 'content-type': type })
    // index.html is served patched; the built file on disk stays clean.
    res.end(extname(file) === '.html' ? body.toString().replace('</head>', PATCH) : body)
  } catch {
    res.writeHead(404).end()
  }
})

await new Promise((ok) => server.listen(PORT, ok))

const tmp = mkdtempSync(join(tmpdir(), 'og-'))
const raw = join(tmp, 'raw.png')

try {
  console.log('Capturing…')
  await run(CHROME, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    // Its own profile, or this blocks on the lock held by a running Chrome.
    `--user-data-dir=${join(tmp, 'profile')}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--force-device-scale-factor=2',
    '--window-size=1200,630',
    '--virtual-time-budget=10000',
    `--screenshot=${raw}`,
    `http://localhost:${PORT}/`,
  ])

  await run('sips', [
    '-s', 'format', 'jpeg',
    '-s', 'formatOptions', '82',
    '--resampleHeightWidth', '630', '1200',
    raw, '--out', OUT,
  ])

  console.log(`✓ Wrote ${OUT.replace(`${ROOT}/`, '')}`)
} finally {
  server.close()
  rmSync(tmp, { recursive: true, force: true })
}
