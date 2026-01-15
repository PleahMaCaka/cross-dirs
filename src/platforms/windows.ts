/**
 * Windows-specific directory implementations.
 * Uses Windows environment variables which map to Known Folders.
 */

import { join } from "node:path"
import { getEnv } from "../platform"

/**
 * Returns the path to the user's home directory.
 * Maps to FOLDERID_Profile via USERPROFILE environment variable.
 */
export function homeDir(): string | null {
  return getEnv("USERPROFILE") || null
}

/**
 * Returns the path to the user's cache directory.
 * Maps to FOLDERID_LocalAppData via LOCALAPPDATA environment variable.
 */
export function cacheDir(): string | null {
  return getEnv("LOCALAPPDATA") || null
}

/**
 * Returns the path to the user's config directory.
 * Maps to FOLDERID_RoamingAppData via APPDATA environment variable.
 */
export function configDir(): string | null {
  return getEnv("APPDATA") || null
}

/**
 * Returns the path to the user's local config directory.
 * Maps to FOLDERID_LocalAppData via LOCALAPPDATA environment variable.
 */
export function configLocalDir(): string | null {
  return getEnv("LOCALAPPDATA") || null
}

/**
 * Returns the path to the user's data directory.
 * Maps to FOLDERID_RoamingAppData via APPDATA environment variable.
 */
export function dataDir(): string | null {
  return getEnv("APPDATA") || null
}

/**
 * Returns the path to the user's local data directory.
 * Maps to FOLDERID_LocalAppData via LOCALAPPDATA environment variable.
 */
export function dataLocalDir(): string | null {
  return getEnv("LOCALAPPDATA") || null
}

/**
 * Returns the path to the user's executable directory.
 * Not available on Windows - returns null.
 */
export function executableDir(): string | null {
  return null
}

/**
 * Returns the path to the user's preference directory.
 * Maps to FOLDERID_LocalAppData via LOCALAPPDATA environment variable.
 */
export function preferenceDir(): string | null {
  return getEnv("LOCALAPPDATA") || null
}

/**
 * Returns the path to the user's runtime directory.
 * Not available on Windows - returns null.
 */
export function runtimeDir(): string | null {
  return null
}

/**
 * Returns the path to the user's state directory.
 * Not available on Windows - returns null.
 */
export function stateDir(): string | null {
  return null
}

/**
 * Returns the path to the user's audio/music directory.
 * Uses USERPROFILE\Music as default.
 */
export function audioDir(): string | null {
  const home = homeDir()
  return home ? join(home, "Music") : null
}

/**
 * Returns the path to the user's desktop directory.
 * Uses USERPROFILE\Desktop as default.
 */
export function desktopDir(): string | null {
  const home = homeDir()
  return home ? join(home, "Desktop") : null
}

/**
 * Returns the path to the user's document directory.
 * Uses USERPROFILE\Documents as default.
 */
export function documentDir(): string | null {
  const home = homeDir()
  return home ? join(home, "Documents") : null
}

/**
 * Returns the path to the user's download directory.
 * Uses USERPROFILE\Downloads as default.
 */
export function downloadDir(): string | null {
  const home = homeDir()
  return home ? join(home, "Downloads") : null
}

/**
 * Returns the path to the user's font directory.
 * Not available on Windows - returns null.
 */
export function fontDir(): string | null {
  return null
}

/**
 * Returns the path to the user's picture directory.
 * Uses USERPROFILE\Pictures as default.
 */
export function pictureDir(): string | null {
  const home = homeDir()
  return home ? join(home, "Pictures") : null
}

/**
 * Returns the path to the user's public directory.
 * Uses PUBLIC environment variable.
 */
export function publicDir(): string | null {
  return getEnv("PUBLIC") || null
}

/**
 * Returns the path to the user's template directory.
 * Uses APPDATA\Microsoft\Windows\Templates as default.
 */
export function templateDir(): string | null {
  const appData = getEnv("APPDATA")
  return appData ? join(appData, "Microsoft", "Windows", "Templates") : null
}

/**
 * Returns the path to the user's video directory.
 * Uses USERPROFILE\Videos as default.
 */
export function videoDir(): string | null {
  const home = homeDir()
  return home ? join(home, "Videos") : null
}
