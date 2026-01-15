# `cross-dirs`

## Introduction
- a tiny low-level library with a minimal API
- that provides the platform-specific, user-accessible locations
- for retrieving and storing configuration, cache and other data
- on Linux, Windows (≥ Vista), macOS and other platforms
- **works with both Node.js and Bun**

Inspired by [`dirs`](https://codeberg.org/dirs/dirs-rs), the original Rust crate.

The library provides the location of these directories by leveraging the mechanisms defined by
- the [XDG base directory](https://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html) and
  the [XDG user directory](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/) specifications on Linux
- the [Known Folder](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378457.aspx) API on Windows
- the [Standard Directories](https://developer.apple.com/library/content/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html#//apple_ref/doc/uid/TP40010672-CH2-SW6)
  guidelines on macOS

## Platforms
This library supports Linux, macOS and Windows.
Other platforms are also supported; they use the Linux conventions.

## Usage
#### Dependency

```bash
bun add cross-dirs    # Bun
npm install cross-dirs # npm
```

#### Example

Library run by user Alice:

```typescript
import * as dirs from 'cross-dirs';

dirs.homeDir();
// Lin: "/home/alice"
// Win: "C:\\Users\\Alice"
// Mac: "/Users/Alice"

dirs.audioDir();
// Lin: "/home/alice/Music"
// Win: "C:\\Users\\Alice\\Music"
// Mac: "/Users/Alice/Music"

dirs.configDir();
// Lin: "/home/alice/.config"
// Win: "C:\\Users\\Alice\\AppData\\Roaming"
// Mac: "/Users/Alice/Library/Application Support"

dirs.executableDir();
// Lin: "/home/alice/.local/bin"
// Win: null
// Mac: null
```

## Features

| Function | Linux | Windows | macOS |
| --- | --- | --- | --- |
| `homeDir` | `$HOME` | `{FOLDERID_Profile}` | `$HOME` |
| `cacheDir` | `$XDG_CACHE_HOME` | `{FOLDERID_LocalAppData}` | `$HOME/Library/Caches` |
| `configDir` | `$XDG_CONFIG_HOME` | `{FOLDERID_RoamingAppData}` | `$HOME/Library/Application Support` |
| `configLocalDir` | `$XDG_CONFIG_HOME` | `{FOLDERID_LocalAppData}` | `$HOME/Library/Application Support` |
| `dataDir` | `$XDG_DATA_HOME` | `{FOLDERID_RoamingAppData}` | `$HOME/Library/Application Support` |
| `dataLocalDir` | `$XDG_DATA_HOME` | `{FOLDERID_LocalAppData}` | `$HOME/Library/Application Support` |
| `executableDir` | `$XDG_BIN_HOME` | `null` | `null` |
| `preferenceDir` | `$XDG_CONFIG_HOME` | `{FOLDERID_LocalAppData}` | `$HOME/Library/Preferences` |
| `runtimeDir` | `$XDG_RUNTIME_DIR` | `null` | `null` |
| `stateDir` | `$XDG_STATE_HOME` | `null` | `null` |
| `audioDir` | `XDG_MUSIC_DIR` | `{FOLDERID_Music}` | `$HOME/Music` |
| `desktopDir` | `XDG_DESKTOP_DIR` | `{FOLDERID_Desktop}` | `$HOME/Desktop` |
| `documentDir` | `XDG_DOCUMENTS_DIR` | `{FOLDERID_Documents}` | `$HOME/Documents` |
| `downloadDir` | `XDG_DOWNLOAD_DIR` | `{FOLDERID_Downloads}` | `$HOME/Downloads` |
| `fontDir` | `$XDG_DATA_HOME/fonts` | `null` | `$HOME/Library/Fonts` |
| `pictureDir` | `XDG_PICTURES_DIR` | `{FOLDERID_Pictures}` | `$HOME/Pictures` |
| `publicDir` | `XDG_PUBLICSHARE_DIR` | `{FOLDERID_Public}` | `$HOME/Public` |
| `templateDir` | `XDG_TEMPLATES_DIR` | `{FOLDERID_Templates}` | `null` |
| `videoDir` | `XDG_VIDEOS_DIR` | `{FOLDERID_Videos}` | `$HOME/Movies` |

## Differences from dirs-rs

This library uses environment variables to determine directory paths, while dirs-rs uses native APIs:

| Platform | dirs-rs | cross-dirs |
| --- | --- | --- |
| Windows | `SHGetKnownFolderPath` API | `%APPDATA%`, `%LOCALAPPDATA%`, `%USERPROFILE%` |
| Linux | `user-dirs.dirs` file parsing | XDG environment variables |
| macOS | Same | Same |

In practice, this means cross-dirs returns the same paths as dirs-rs for default configurations.

## Related

- [dirs-rs](https://codeberg.org/dirs/dirs-rs) – Rust library that inspired this project
- [directories-rs](https://codeberg.org/dirs/directories-rs) – higher-level library with app-specific paths

## License

MIT
