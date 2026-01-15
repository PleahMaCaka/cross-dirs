#!/usr/bin/env node
/**
 * cross-dirs CLI
 *
 * Resolve platform-specific directory placeholders in strings.
 *
 * Usage:
 *   cross-dirs "<homeDir>/myapp"          # Resolve placeholders
 *   cross-dirs --home                      # Get home directory
 *   cross-dirs --config                    # Get config directory
 *   echo "path=<configDir>" | cross-dirs   # Read from stdin (pipe)
 *
 * Placeholders:
 *   <homeDir>, <cacheDir>, <configDir>, <configLocalDir>, <dataDir>,
 *   <dataLocalDir>, <executableDir>, <preferenceDir>, <runtimeDir>,
 *   <stateDir>, <audioDir>, <desktopDir>, <documentDir>, <downloadDir>,
 *   <fontDir>, <pictureDir>, <publicDir>, <templateDir>, <videoDir>,
 *   <appDataDir> (alias for dataDir)
 */

import * as dirs from "./index"

// Directory function mapping
const dirFunctions: Record<string, () => string | null> = {
  homeDir: dirs.homeDir,
  cacheDir: dirs.cacheDir,
  configDir: dirs.configDir,
  configLocalDir: dirs.configLocalDir,
  dataDir: dirs.dataDir,
  dataLocalDir: dirs.dataLocalDir,
  executableDir: dirs.executableDir,
  preferenceDir: dirs.preferenceDir,
  runtimeDir: dirs.runtimeDir,
  stateDir: dirs.stateDir,
  audioDir: dirs.audioDir,
  desktopDir: dirs.desktopDir,
  documentDir: dirs.documentDir,
  downloadDir: dirs.downloadDir,
  fontDir: dirs.fontDir,
  pictureDir: dirs.pictureDir,
  publicDir: dirs.publicDir,
  templateDir: dirs.templateDir,
  videoDir: dirs.videoDir,
  // Alias for common use case
  appDataDir: dirs.dataDir,
}

// CLI flag to function mapping
const flagMapping: Record<string, keyof typeof dirFunctions> = {
  "--home": "homeDir",
  "--cache": "cacheDir",
  "--config": "configDir",
  "--config-local": "configLocalDir",
  "--data": "dataDir",
  "--data-local": "dataLocalDir",
  "--executable": "executableDir",
  "--preference": "preferenceDir",
  "--runtime": "runtimeDir",
  "--state": "stateDir",
  "--audio": "audioDir",
  "--desktop": "desktopDir",
  "--document": "documentDir",
  "--download": "downloadDir",
  "--font": "fontDir",
  "--picture": "pictureDir",
  "--public": "publicDir",
  "--template": "templateDir",
  "--video": "videoDir",
  "--app-data": "appDataDir",
}

/**
 * Replace all directory placeholders in a string with actual paths.
 *
 * @example
 * resolvePlaceholders("<appDataDir>/com.arixlab.note/local.db")
 * // => "C:\\Users\\Alice\\AppData\\Roaming/com.arixlab.note/local.db" (Windows)
 * // => "/home/alice/.local/share/com.arixlab.note/local.db" (Linux)
 */
export function resolvePlaceholders(input: string): string {
  let result = input

  for (const [name, fn] of Object.entries(dirFunctions)) {
    const placeholder = `<${name}>`
    if (result.includes(placeholder)) {
      const value = fn()
      if (value !== null) {
        result = result.replaceAll(placeholder, value)
      }
    }
  }

  return result
}

/**
 * Print help message.
 */
function printHelp(): void {
  console.log(`cross-dirs - Resolve platform-specific directory paths

Usage:
  cross-dirs <string>              Resolve placeholders in string
  cross-dirs <flag>                Get specific directory path
  echo "<string>" | cross-dirs     Read from stdin (supports pipes)

Flags:
  --help, -h                       Show this help message
  --version, -v                    Show version
  --list                           List all available directories

Directory Flags:
  --home                           Home directory
  --cache                          Cache directory
  --config                         Config directory (roaming)
  --config-local                   Local config directory
  --data                           Data directory (roaming)
  --data-local                     Local data directory
  --executable                     Executable directory (Linux only)
  --preference                     Preferences directory
  --runtime                        Runtime directory (Linux only)
  --state                          State directory (Linux only)
  --audio                          Audio/Music directory
  --desktop                        Desktop directory
  --document                       Documents directory
  --download                       Downloads directory
  --font                           Fonts directory
  --picture                        Pictures directory
  --public                         Public directory
  --template                       Templates directory
  --video                          Videos directory
  --app-data                       Application data directory (alias for --data)

Placeholders:
  <homeDir>, <cacheDir>, <configDir>, <configLocalDir>, <dataDir>,
  <dataLocalDir>, <executableDir>, <preferenceDir>, <runtimeDir>,
  <stateDir>, <audioDir>, <desktopDir>, <documentDir>, <downloadDir>,
  <fontDir>, <pictureDir>, <publicDir>, <templateDir>, <videoDir>,
  <appDataDir> (alias for dataDir)

Examples:
  cross-dirs "<homeDir>/.config/myapp"
  cross-dirs --config
  DATABASE_URL=$(cross-dirs "<appDataDir>/com.myapp/local.db") drizzle-kit studio
  echo "config=<configDir>/myapp" | cross-dirs
`)
}

/**
 * Print version.
 */
function printVersion(): void {
  console.log("cross-dirs 1.0.1")
}

/**
 * List all directories with their values.
 */
function printList(): void {
  console.log("Available directories:")
  console.log()

  for (const [name, fn] of Object.entries(dirFunctions)) {
    if (name === "appDataDir") continue // Skip alias in list
    const value = fn()
    const displayValue = value ?? "(not available on this platform)"
    console.log(`  ${name}: ${displayValue}`)
  }
}

/**
 * Read all data from stdin.
 */
async function readStdin(): Promise<string> {
  // Bun runtime
  if (typeof Bun !== "undefined") {
    const chunks: Uint8Array[] = []
    const reader = Bun.stdin.stream().getReader()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) chunks.push(value)
    }
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
    const result = new Uint8Array(totalLength)
    let offset = 0
    for (const chunk of chunks) {
      result.set(chunk, offset)
      offset += chunk.length
    }
    return new TextDecoder().decode(result)
  }

  // Node.js runtime
  return new Promise((resolve, reject) => {
    let data = ""
    process.stdin.setEncoding("utf8")
    process.stdin.on("data", (chunk) => {
      data += chunk
    })
    process.stdin.on("end", () => {
      resolve(data)
    })
    process.stdin.on("error", reject)
  })
}

/**
 * Check if stdin has data available (is piped).
 */
function isStdinPiped(): boolean {
  // Node.js
  if (typeof process !== "undefined" && process.stdin) {
    return !process.stdin.isTTY
  }
  return false
}

/**
 * Main CLI entry point.
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2)

  // Handle help flag
  if (args.includes("--help") || args.includes("-h")) {
    printHelp()
    process.exit(0)
  }

  // Handle version flag
  if (args.includes("--version") || args.includes("-v")) {
    printVersion()
    process.exit(0)
  }

  // Handle list flag
  if (args.includes("--list")) {
    printList()
    process.exit(0)
  }

  // Handle directory flags
  for (const arg of args) {
    if (arg.startsWith("--")) {
      const dirName = flagMapping[arg]
      if (dirName) {
        const fn = dirFunctions[dirName]
        const value = fn()
        if (value === null) {
          console.error(`Error: ${dirName} is not available on this platform`)
          process.exit(1)
        }
        console.log(value)
        process.exit(0)
      }
    }
  }

  // Check for piped input
  if (isStdinPiped()) {
    const input = await readStdin()
    const result = resolvePlaceholders(input.trim())
    console.log(result)
    process.exit(0)
  }

  // Handle string argument with placeholders
  if (args.length > 0) {
    const input = args.join(" ")
    const result = resolvePlaceholders(input)
    console.log(result)
    process.exit(0)
  }

  // No arguments and no piped input
  printHelp()
  process.exit(1)
}

// Run CLI
main().catch((error) => {
  console.error("Error:", error.message)
  process.exit(1)
})
