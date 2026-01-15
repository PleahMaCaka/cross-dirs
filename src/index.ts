/**
 * cross-dirs - Platform-specific user directory paths
 *
 * A tiny low-level library with a minimal API that provides the platform-specific,
 * user-accessible locations for retrieving and storing configuration, cache and other data
 * on Linux, Windows (≥ Vista), and macOS.
 *
 * This is a TypeScript port of the Rust `dirs` crate.
 * @see https://codeberg.org/dirs/dirs-rs
 *
 * Works with both Node.js and Bun runtimes.
 *
 * @example
 * ```typescript
 * import { homeDir, configDir, cacheDir } from 'cross-dirs';
 *
 * console.log(homeDir());    // /home/alice (Linux)
 * console.log(configDir());  // /home/alice/.config (Linux)
 * console.log(cacheDir());   // /home/alice/.cache (Linux)
 * ```
 */

import { getPlatform, type Platform } from "./platform"
import * as darwin from "./platforms/darwin"
import * as linux from "./platforms/linux"
import * as windows from "./platforms/windows"

// Platform-specific implementation type
type PlatformImpl = typeof windows & typeof darwin & typeof linux

/**
 * Get the platform-specific implementation module.
 */
function getImpl(): PlatformImpl {
  const platform = getPlatform()
  switch (platform) {
    case "windows":
      return windows
    case "darwin":
      return darwin
    default:
      return linux
  }
}

// Re-export types
export type { Platform }
export { getPlatform } from "./platform"

/**
 * Returns the path to the user's home directory.
 *
 * | Platform | Value                | Example          |
 * | -------- | -------------------- | ---------------- |
 * | Linux    | `$HOME`              | /home/alice      |
 * | macOS    | `$HOME`              | /Users/Alice     |
 * | Windows  | `{FOLDERID_Profile}` | C:\Users\Alice   |
 */
export function homeDir(): string | null {
  return getImpl().homeDir()
}

/**
 * Returns the path to the user's cache directory.
 *
 * | Platform | Value                                   | Example                      |
 * | -------- | --------------------------------------- | ---------------------------- |
 * | Linux    | `$XDG_CACHE_HOME` or `$HOME`/.cache     | /home/alice/.cache           |
 * | macOS    | `$HOME`/Library/Caches                  | /Users/Alice/Library/Caches  |
 * | Windows  | `{FOLDERID_LocalAppData}`               | C:\Users\Alice\AppData\Local |
 */
export function cacheDir(): string | null {
  return getImpl().cacheDir()
}

/**
 * Returns the path to the user's config directory.
 *
 * | Platform | Value                                     | Example                                    |
 * | -------- | ----------------------------------------- | ------------------------------------------ |
 * | Linux    | `$XDG_CONFIG_HOME` or `$HOME`/.config     | /home/alice/.config                        |
 * | macOS    | `$HOME`/Library/Application Support       | /Users/Alice/Library/Application Support   |
 * | Windows  | `{FOLDERID_RoamingAppData}`               | C:\Users\Alice\AppData\Roaming             |
 */
export function configDir(): string | null {
  return getImpl().configDir()
}

/**
 * Returns the path to the user's local config directory.
 *
 * | Platform | Value                                     | Example                                    |
 * | -------- | ----------------------------------------- | ------------------------------------------ |
 * | Linux    | `$XDG_CONFIG_HOME` or `$HOME`/.config     | /home/alice/.config                        |
 * | macOS    | `$HOME`/Library/Application Support       | /Users/Alice/Library/Application Support   |
 * | Windows  | `{FOLDERID_LocalAppData}`                 | C:\Users\Alice\AppData\Local               |
 */
export function configLocalDir(): string | null {
  return getImpl().configLocalDir()
}

/**
 * Returns the path to the user's data directory.
 *
 * | Platform | Value                                        | Example                                    |
 * | -------- | -------------------------------------------- | ------------------------------------------ |
 * | Linux    | `$XDG_DATA_HOME` or `$HOME`/.local/share     | /home/alice/.local/share                   |
 * | macOS    | `$HOME`/Library/Application Support          | /Users/Alice/Library/Application Support   |
 * | Windows  | `{FOLDERID_RoamingAppData}`                  | C:\Users\Alice\AppData\Roaming             |
 */
export function dataDir(): string | null {
  return getImpl().dataDir()
}

/**
 * Returns the path to the user's local data directory.
 *
 * | Platform | Value                                        | Example                                    |
 * | -------- | -------------------------------------------- | ------------------------------------------ |
 * | Linux    | `$XDG_DATA_HOME` or `$HOME`/.local/share     | /home/alice/.local/share                   |
 * | macOS    | `$HOME`/Library/Application Support          | /Users/Alice/Library/Application Support   |
 * | Windows  | `{FOLDERID_LocalAppData}`                    | C:\Users\Alice\AppData\Local               |
 */
export function dataLocalDir(): string | null {
  return getImpl().dataLocalDir()
}

/**
 * Returns the path to the user's executable directory.
 *
 * | Platform | Value                                                          | Example                |
 * | -------- | -------------------------------------------------------------- | ---------------------- |
 * | Linux    | `$XDG_BIN_HOME` or `$XDG_DATA_HOME`/../bin or `$HOME`/.local/bin | /home/alice/.local/bin |
 * | macOS    | –                                                              | –                      |
 * | Windows  | –                                                              | –                      |
 */
export function executableDir(): string | null {
  return getImpl().executableDir()
}

/**
 * Returns the path to the user's preference directory.
 *
 * | Platform | Value                                     | Example                          |
 * | -------- | ----------------------------------------- | -------------------------------- |
 * | Linux    | `$XDG_CONFIG_HOME` or `$HOME`/.config     | /home/alice/.config              |
 * | macOS    | `$HOME`/Library/Preferences               | /Users/Alice/Library/Preferences |
 * | Windows  | `{FOLDERID_LocalAppData}`                 | C:\Users\Alice\AppData\Local     |
 */
export function preferenceDir(): string | null {
  return getImpl().preferenceDir()
}

/**
 * Returns the path to the user's runtime directory.
 *
 * | Platform | Value                | Example          |
 * | -------- | -------------------- | ---------------- |
 * | Linux    | `$XDG_RUNTIME_DIR`   | /run/user/1001/  |
 * | macOS    | –                    | –                |
 * | Windows  | –                    | –                |
 */
export function runtimeDir(): string | null {
  return getImpl().runtimeDir()
}

/**
 * Returns the path to the user's state directory.
 *
 * | Platform | Value                                         | Example                  |
 * | -------- | --------------------------------------------- | ------------------------ |
 * | Linux    | `$XDG_STATE_HOME` or `$HOME`/.local/state     | /home/alice/.local/state |
 * | macOS    | –                                             | –                        |
 * | Windows  | –                                             | –                        |
 */
export function stateDir(): string | null {
  return getImpl().stateDir()
}

/**
 * Returns the path to the user's audio/music directory.
 *
 * | Platform | Value                | Example              |
 * | -------- | -------------------- | -------------------- |
 * | Linux    | `XDG_MUSIC_DIR`      | /home/alice/Music    |
 * | macOS    | `$HOME`/Music        | /Users/Alice/Music   |
 * | Windows  | `{FOLDERID_Music}`   | C:\Users\Alice\Music |
 */
export function audioDir(): string | null {
  return getImpl().audioDir()
}

/**
 * Returns the path to the user's desktop directory.
 *
 * | Platform | Value                  | Example                |
 * | -------- | ---------------------- | ---------------------- |
 * | Linux    | `XDG_DESKTOP_DIR`      | /home/alice/Desktop    |
 * | macOS    | `$HOME`/Desktop        | /Users/Alice/Desktop   |
 * | Windows  | `{FOLDERID_Desktop}`   | C:\Users\Alice\Desktop |
 */
export function desktopDir(): string | null {
  return getImpl().desktopDir()
}

/**
 * Returns the path to the user's document directory.
 *
 * | Platform | Value                    | Example                  |
 * | -------- | ------------------------ | ------------------------ |
 * | Linux    | `XDG_DOCUMENTS_DIR`      | /home/alice/Documents    |
 * | macOS    | `$HOME`/Documents        | /Users/Alice/Documents   |
 * | Windows  | `{FOLDERID_Documents}`   | C:\Users\Alice\Documents |
 */
export function documentDir(): string | null {
  return getImpl().documentDir()
}

/**
 * Returns the path to the user's download directory.
 *
 * | Platform | Value                    | Example                  |
 * | -------- | ------------------------ | ------------------------ |
 * | Linux    | `XDG_DOWNLOAD_DIR`       | /home/alice/Downloads    |
 * | macOS    | `$HOME`/Downloads        | /Users/Alice/Downloads   |
 * | Windows  | `{FOLDERID_Downloads}`   | C:\Users\Alice\Downloads |
 */
export function downloadDir(): string | null {
  return getImpl().downloadDir()
}

/**
 * Returns the path to the user's font directory.
 *
 * | Platform | Value                                                  | Example                        |
 * | -------- | ------------------------------------------------------ | ------------------------------ |
 * | Linux    | `$XDG_DATA_HOME`/fonts or `$HOME`/.local/share/fonts   | /home/alice/.local/share/fonts |
 * | macOS    | `$HOME`/Library/Fonts                                  | /Users/Alice/Library/Fonts     |
 * | Windows  | –                                                      | –                              |
 */
export function fontDir(): string | null {
  return getImpl().fontDir()
}

/**
 * Returns the path to the user's picture directory.
 *
 * | Platform | Value                   | Example                 |
 * | -------- | ----------------------- | ----------------------- |
 * | Linux    | `XDG_PICTURES_DIR`      | /home/alice/Pictures    |
 * | macOS    | `$HOME`/Pictures        | /Users/Alice/Pictures   |
 * | Windows  | `{FOLDERID_Pictures}`   | C:\Users\Alice\Pictures |
 */
export function pictureDir(): string | null {
  return getImpl().pictureDir()
}

/**
 * Returns the path to the user's public directory.
 *
 * | Platform | Value                   | Example             |
 * | -------- | ----------------------- | ------------------- |
 * | Linux    | `XDG_PUBLICSHARE_DIR`   | /home/alice/Public  |
 * | macOS    | `$HOME`/Public          | /Users/Alice/Public |
 * | Windows  | `{FOLDERID_Public}`     | C:\Users\Public     |
 */
export function publicDir(): string | null {
  return getImpl().publicDir()
}

/**
 * Returns the path to the user's template directory.
 *
 * | Platform | Value                    | Example                                                  |
 * | -------- | ------------------------ | -------------------------------------------------------- |
 * | Linux    | `XDG_TEMPLATES_DIR`      | /home/alice/Templates                                    |
 * | macOS    | –                        | –                                                        |
 * | Windows  | `{FOLDERID_Templates}`   | C:\Users\Alice\AppData\Roaming\Microsoft\Windows\Templates |
 */
export function templateDir(): string | null {
  return getImpl().templateDir()
}

/**
 * Returns the path to the user's video directory.
 *
 * | Platform | Value                 | Example               |
 * | -------- | --------------------- | --------------------- |
 * | Linux    | `XDG_VIDEOS_DIR`      | /home/alice/Videos    |
 * | macOS    | `$HOME`/Movies        | /Users/Alice/Movies   |
 * | Windows  | `{FOLDERID_Videos}`   | C:\Users\Alice\Videos |
 */
export function videoDir(): string | null {
  return getImpl().videoDir()
}
