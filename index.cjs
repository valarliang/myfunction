const http = require('http')
const fs = require('fs')
const path = require('path')
const compilerSfc = require('@vue/compiler-sfc')
const compilerDom = require('@vue/compiler-dom')
const httpPort = 80
http.createServer((req, res) => {
  const url = req.url
  let content = ''
  if (url === '/') {
    content = fs.readFileSync('test.html', 'utf8')
    content = content.replace('<script', `<script>
  window.process = { env: { NODE_ENV: 'dev' } }
</script>
<script`
      )
    res.end(content)
    return
  } else if (url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1))
    content = fs.readFileSync(p, 'utf8')
  } else if (url.startsWith('/@modules/')) {
    const moduleDir = path.resolve(__dirname, 'node_modules', url.replace('/@modules/', ''))
    const module = require(moduleDir + '/package.json').module
    const p = path.resolve(moduleDir, module)
    content = fs.readFileSync(p, 'utf8')
  } else if (url.endsWith('.css')) {
    const p = path.resolve(__dirname, url.slice(1))
    const file = fs.readFileSync(p, 'utf8')
    content = `
const css = '${file.replace(/\n/g, '')}'
const link = document.createElement('style')
link.setAttribute('type', 'text/css')
link.innerHTML = css
document.head.appendChild(link)
export default css`
  } else if (url.includes('.vue')) {
    const p = path.resolve(__dirname, url.split('?')[0].slice(1))
    const { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf8'))
    const type = url.split('?')[1]?.split('&')[0]?.split('=')[1]
    if (!type) {
      content = `${descriptor.script.content.replace('export default', 'const script =')}
import { render } from '${url}?type=template'
import '${url}?type=style'
script.render = render
export default script`
    } else if (type === 'template') {
      const template = descriptor.template
      content = compilerDom.compile(template.content, { mode: 'module' }).code
    } else if (type === 'style') {}
  }
  res.writeHead(200, { 'Content-Type': 'application/javascript;' })
  res.end(rewriteImport(content))
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})

function rewriteImport(content) {
  return content.replace(/ from ['"]([^'"]+)['"]/g, (s0,s1) => 
    s1[0] === '.' || s1[0] === '/' ? s0 : ` from '/@modules/${s1}'`
  )
}