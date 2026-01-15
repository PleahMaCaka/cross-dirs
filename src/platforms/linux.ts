/**
 * Linux-specific directory implementations.
 * Follows the XDG Base Directory and XDG User Directory specifications.
 *
 * @see https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
 * @see https://www.freedesktop.org/wiki/Software/xdg-user-dirs/
 */

import { join } from "node:path"
import { getEnv, getHomeDir } from "../platform"

/**
 * Returns the path to the user's home directory.
 */
export function homeDir(): string | null {
  return getHomeDir()
}

/**
 * Returns the path to the user's cache directory.
 * $XDG_CACHE_HOME or $HOME/.cache
 */
export function cacheDir(): string | null {
  const xdgCache = getEnv("XDG_CACHE_HOME")
  if (xdgCache) return xdgCache

  const home = getHomeDir()
  return home ? join(home, ".cache") : null
}

/**
 * Returns the path to the user's config directory.
 * $XDG_CONFIG_HOME or $HOME/.config
 */
export function configDir(): string | null {
  const xdgConfig = getEnv("XDG_CONFIG_HOME")
  if (xdgConfig) return xdgConfig

  const home = getHomeDir()
  return home ? join(home, ".config") : null
}

/**
 * Returns the path to the user's local config directory.
 * Same as configDir on Linux: $XDG_CONFIG_HOME or $HOME/.config
 */
export function configLocalDir(): string | null {
  return configDir()
}

/**
 * Returns the path to the user's data directory.
 * $XDG_DATA_HOME or $HOME/.local/share
 */
export function dataDir(): string | null {
  const xdgData = getEnv("XDG_DATA_HOME")
  if (xdgData) return xdgData

  const home = getHomeDir()
  return home ? join(home, ".local", "share") : null
}

/**
 * Returns the path to the user's local data directory.
 * Same as dataDir on Linux: $XDG_DATA_HOME or $HOME/.local/share
 */
export function dataLocalDir(): string | null {
  return dataDir()
}

/**
 * Returns the path to the user's executable directory.
 * $XDG_BIN_HOME, or $XDG_DATA_HOME/../bin, or $HOME/.local/bin
 */
export function executableDir(): string | null {
  const xdgBin = getEnv("XDG_BIN_HOME")
  if (xdgBin) return xdgBin

  const xdgData = getEnv("XDG_DATA_HOME")
  if (xdgData) return join(xdgData, "..", "bin")

  const home = getHomeDir()
  return home ? join(home, ".local", "bin") : null
}

/**
 * Returns the path to the user's preference directory.
 * Same as configDir: $XDG_CONFIG_HOME or $HOME/.config
 */
export function preferenceDir(): string | null {
  return configDir()
}

/**
 * Returns the path to the user's runtime directory.
 * $XDG_RUNTIME_DIR
 */
export function runtimeDir(): string | null {
  return getEnv("XDG_RUNTIME_DIR") || null
}

/**
 * Returns the path to the user's state directory.
 * $XDG_STATE_HOME or $HOME/.local/state
 */
export function stateDir(): string | null {
  const xdgState = getEnv("XDG_STATE_HOME")
  if (xdgState) return xdgState

  const home = getHomeDir()
  return home ? join(home, ".local", "state") : null
}

/**
 * Returns the path to the user's audio/music directory.
 * $XDG_MUSIC_DIR or $HOME/Music
 */
export function audioDir(): string | null {
  const xdgMusic = getEnv("XDG_MUSIC_DIR")
  if (xdgMusic) return xdgMusic

  const home = getHomeDir()
  return home ? join(home, "Music") : null
}

/**
 * Returns the path to the user's desktop directory.
 * $XDG_DESKTOP_DIR or $HOME/Desktop
 */
export function desktopDir(): string | null {
  const xdgDesktop = getEnv("XDG_DESKTOP_DIR")
  if (xdgDesktop) return xdgDesktop

  const home = getHomeDir()
  return home ? join(home, "Desktop") : null
}

/**
 * Returns the path to the user's document directory.
 * $XDG_DOCUMENTS_DIR or $HOME/Documents
 */
export function documentDir(): string | null {
  const xdgDocuments = getEnv("XDG_DOCUMENTS_DIR")
  if (xdgDocuments) return xdgDocuments

  const home = getHomeDir()
  return home ? join(home, "Documents") : null
}

/**
 * Returns the path to the user's download directory.
 * $XDG_DOWNLOAD_DIR or $HOME/Downloads
 */
export function downloadDir(): string | null {
  const xdgDownload = getEnv("XDG_DOWNLOAD_DIR")
  if (xdgDownload) return xdgDownload

  const home = getHomeDir()
  return home ? join(home, "Downloads") : null
}

/**
 * Returns the path to the user's font directory.
 * $XDG_DATA_HOME/fonts or $HOME/.local/share/fonts
 */
export function fontDir(): string | null {
  const data = dataDir()
  return data ? join(data, "fonts") : null
}

/**
 * Returns the path to the user's picture directory.
 * $XDG_PICTURES_DIR or $HOME/Pictures
 */
export function pictureDir(): string | null {
  const xdgPictures = getEnv("XDG_PICTURES_DIR")
  if (xdgPictures) return xdgPictures

  const home = getHomeDir()
  return home ? join(home, "Pictures") : null
}

/**
 * Returns the path to the user's public directory.
 * $XDG_PUBLICSHARE_DIR or $HOME/Public
 */
export function publicDir(): string | null {
  const xdgPublic = getEnv("XDG_PUBLICSHARE_DIR")
  if (xdgPublic) return xdgPublic

  const home = getHomeDir()
  return home ? join(home, "Public") : null
}

/**
 * Returns the path to the user's template directory.
 * $XDG_TEMPLATES_DIR or $HOME/Templates
 */
export function templateDir(): string | null {
  const xdgTemplates = getEnv("XDG_TEMPLATES_DIR")
  if (xdgTemplates) return xdgTemplates

  const home = getHomeDir()
  return home ? join(home, "Templates") : null
}

/**
 * Returns the path to the user's video directory.
 * $XDG_VIDEOS_DIR or $HOME/Videos
 */
export function videoDir(): string | null {
  const xdgVideos = getEnv("XDG_VIDEOS_DIR")
  if (xdgVideos) return xdgVideos

  const home = getHomeDir()
  return home ? join(home, "Videos") : null
}
