import { spawnSync } from 'child_process'
import { existsSync, readdirSync } from 'fs'
import { join } from 'path'

const cwd = process.cwd()

const missing = []
const packages = ['gsap', 'lucide-react', 'react-router', '@babel/types']

for (const pkg of packages) {
  const pkgPath = join(cwd, 'node_modules', pkg)
  let isBroken = true
  if (existsSync(pkgPath)) {
    try {
      const files = readdirSync(pkgPath)
      if (files.length > 1) { // It has files inside, not just an empty directory
        isBroken = false
      }
    } catch (e) {
      isBroken = true
    }
  }
  
  if (isBroken) {
    missing.push(pkg)
    console.log(`Broken or Missing: ${pkg}`)
  } else {
    console.log(`OK: ${pkg}`)
  }
}

if (missing.length === 0) {
  console.log('All packages present!')
  process.exit(0)
}

console.log(`Installing: ${missing.join(' ')}`)

const result = spawnSync(
  'npm',
  ['install', ...missing, '--ignore-scripts', '--no-audit', '--no-fund'],
  { cwd, stdio: 'inherit', shell: true, timeout: 120000 }
)

console.log('Exit code:', result.status)
if (result.error) console.log('Error:', result.error.message)
