/**
 * macOS-specific directory implementations.
 * Follows Apple's Standard Directories guidelines.
 */

import { join } from "node:path"
import { getHomeDir } from "../platform"

/**
 * Returns the path to the user's home directory.
 */
export function homeDir(): string | null {
  return getHomeDir()
}

/**
 * Returns the path to the user's cache directory.
 * ~/Library/Caches
 */
export function cacheDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Library", "Caches") : null
}

/**
 * Returns the path to the user's config directory.
 * ~/Library/Application Support
 */
export function configDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Library", "Application Support") : null
}

/**
 * Returns the path to the user's local config directory.
 * Same as configDir on macOS: ~/Library/Application Support
 */
export function configLocalDir(): string | null {
  return configDir()
}

/**
 * Returns the path to the user's data directory.
 * ~/Library/Application Support
 */
export function dataDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Library", "Application Support") : null
}

/**
 * Returns the path to the user's local data directory.
 * Same as dataDir on macOS: ~/Library/Application Support
 */
export function dataLocalDir(): string | null {
  return dataDir()
}

/**
 * Returns the path to the user's executable directory.
 * Not available on macOS - returns null.
 */
export function executableDir(): string | null {
  return null
}

/**
 * Returns the path to the user's preference directory.
 * ~/Library/Preferences
 */
export function preferenceDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Library", "Preferences") : null
}

/**
 * Returns the path to the user's runtime directory.
 * Not available on macOS - returns null.
 */
export function runtimeDir(): string | null {
  return null
}

/**
 * Returns the path to the user's state directory.
 * Not available on macOS - returns null.
 */
export function stateDir(): string | null {
  return null
}

/**
 * Returns the path to the user's audio/music directory.
 * ~/Music
 */
export function audioDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Music") : null
}

/**
 * Returns the path to the user's desktop directory.
 * ~/Desktop
 */
export function desktopDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Desktop") : null
}

/**
 * Returns the path to the user's document directory.
 * ~/Documents
 */
export function documentDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Documents") : null
}

/**
 * Returns the path to the user's download directory.
 * ~/Downloads
 */
export function downloadDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Downloads") : null
}

/**
 * Returns the path to the user's font directory.
 * ~/Library/Fonts
 */
export function fontDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Library", "Fonts") : null
}

/**
 * Returns the path to the user's picture directory.
 * ~/Pictures
 */
export function pictureDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Pictures") : null
}

/**
 * Returns the path to the user's public directory.
 * ~/Public
 */
export function publicDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Public") : null
}

/**
 * Returns the path to the user's template directory.
 * Not available on macOS - returns null.
 */
export function templateDir(): string | null {
  return null
}

/**
 * Returns the path to the user's video directory.
 * ~/Movies
 */
export function videoDir(): string | null {
  const home = getHomeDir()
  return home ? join(home, "Movies") : null
}
