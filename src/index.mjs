console.log('_PATHNAME_', window.location.pathname)

const pathnames = [
  '/jump',
  '/night',
  '/shadows',
  '/ruins',
  '/pillars',
  '/cave',
  '/leap-of-faith',
]

const { pathname } = window.location

if (pathname === '/') {
  import('./levels/index.mjs')
} else if (pathnames.includes(pathname)) {
  import(`./levels${pathname}.mjs`)
}
