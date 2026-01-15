/**
 * cross-dirs example
 * Demonstrates all available functions
 */

import {
  audioDir,
  cacheDir,
  configDir,
  configLocalDir,
  dataDir,
  dataLocalDir,
  desktopDir,
  documentDir,
  downloadDir,
  executableDir,
  fontDir,
  getPlatform,
  homeDir,
  pictureDir,
  preferenceDir,
  publicDir,
  runtimeDir,
  stateDir,
  templateDir,
  videoDir
} from "../src/index"

console.log("cross-dirs example")
console.log("==================")
console.log()
console.log("Platform:", getPlatform())
console.log()

console.log("=== Base Directories ===")
console.log("homeDir:        ", homeDir())
console.log("cacheDir:       ", cacheDir())
console.log("configDir:      ", configDir())
console.log("configLocalDir: ", configLocalDir())
console.log("dataDir:        ", dataDir())
console.log("dataLocalDir:   ", dataLocalDir())
console.log("executableDir:  ", executableDir())
console.log("preferenceDir:  ", preferenceDir())
console.log("runtimeDir:     ", runtimeDir())
console.log("stateDir:       ", stateDir())
console.log()

console.log("=== User Directories ===")
console.log("audioDir:       ", audioDir())
console.log("desktopDir:     ", desktopDir())
console.log("documentDir:    ", documentDir())
console.log("downloadDir:    ", downloadDir())
console.log("fontDir:        ", fontDir())
console.log("pictureDir:     ", pictureDir())
console.log("publicDir:      ", publicDir())
console.log("templateDir:    ", templateDir())
console.log("videoDir:       ", videoDir())
