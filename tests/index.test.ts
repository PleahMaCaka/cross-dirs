/**
 * Tests for cross-dirs library.
 * Works with both Bun and Node.js (via tsx).
 */

import { describe, expect, test } from "bun:test"
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

describe("cross-dirs", () => {
  describe("getPlatform", () => {
    test("should return a valid platform", () => {
      const platform = getPlatform()
      expect(["windows", "darwin", "linux"]).toContain(platform)
    })
  })

  describe("homeDir", () => {
    test("should return a non-null string", () => {
      const result = homeDir()
      expect(result).not.toBeNull()
      expect(typeof result).toBe("string")
      expect(result?.length).toBeGreaterThan(0)
    })
  })

  describe("Base directories", () => {
    test("cacheDir should return a string or null", () => {
      const result = cacheDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("configDir should return a string or null", () => {
      const result = configDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("configLocalDir should return a string or null", () => {
      const result = configLocalDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("dataDir should return a string or null", () => {
      const result = dataDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("dataLocalDir should return a string or null", () => {
      const result = dataLocalDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("executableDir should return a string or null", () => {
      const result = executableDir()
      // Only available on Linux
      if (getPlatform() === "linux") {
        expect(result).not.toBeNull()
      }
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("preferenceDir should return a string or null", () => {
      const result = preferenceDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("runtimeDir should return a string or null", () => {
      const result = runtimeDir()
      // Only available on Linux with XDG_RUNTIME_DIR set
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("stateDir should return a string or null", () => {
      const result = stateDir()
      // Only available on Linux
      if (getPlatform() === "linux" && result !== null) {
        expect(typeof result).toBe("string")
      }
    })
  })

  describe("User directories", () => {
    test("audioDir should return a string or null", () => {
      const result = audioDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("desktopDir should return a string or null", () => {
      const result = desktopDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("documentDir should return a string or null", () => {
      const result = documentDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("downloadDir should return a string or null", () => {
      const result = downloadDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("fontDir should return a string or null", () => {
      const result = fontDir()
      // Not available on Windows
      if (getPlatform() !== "windows" && result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("pictureDir should return a string or null", () => {
      const result = pictureDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("publicDir should return a string or null", () => {
      const result = publicDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("templateDir should return a string or null", () => {
      const result = templateDir()
      // Not available on macOS
      if (getPlatform() !== "darwin" && result !== null) {
        expect(typeof result).toBe("string")
      }
    })

    test("videoDir should return a string or null", () => {
      const result = videoDir()
      if (result !== null) {
        expect(typeof result).toBe("string")
      }
    })
  })

  describe("Platform-specific paths", () => {
    const platform = getPlatform()
    const home = homeDir()

    if (platform === "windows") {
      test("Windows paths should use backslashes", () => {
        expect(home).toContain("\\")
        expect(cacheDir()).toContain("AppData")
        expect(configDir()).toContain("AppData\\Roaming")
      })
    }

    if (platform === "darwin") {
      test("macOS paths should use Library", () => {
        expect(cacheDir()).toContain("Library/Caches")
        expect(configDir()).toContain("Library/Application Support")
      })
    }

    if (platform === "linux") {
      test("Linux paths should follow XDG spec", () => {
        const cache = cacheDir()
        const config = configDir()
        const data = dataDir()

        // Either uses XDG env var or follows XDG defaults
        if (cache && !process.env.XDG_CACHE_HOME) {
          expect(cache).toContain(".cache")
        }
        if (config && !process.env.XDG_CONFIG_HOME) {
          expect(config).toContain(".config")
        }
        if (data && !process.env.XDG_DATA_HOME) {
          expect(data).toContain(".local/share")
        }
      })
    }
  })
})

// Print all directories for manual verification
describe("Directory values (for manual verification)", () => {
  test("print all directories", () => {
    console.log("\n--- Directory Values ---")
    console.log("Platform:", getPlatform())
    console.log("")
    console.log("homeDir:", homeDir())
    console.log("")
    console.log("cacheDir:", cacheDir())
    console.log("configDir:", configDir())
    console.log("configLocalDir:", configLocalDir())
    console.log("dataDir:", dataDir())
    console.log("dataLocalDir:", dataLocalDir())
    console.log("executableDir:", executableDir())
    console.log("preferenceDir:", preferenceDir())
    console.log("runtimeDir:", runtimeDir())
    console.log("stateDir:", stateDir())
    console.log("")
    console.log("audioDir:", audioDir())
    console.log("desktopDir:", desktopDir())
    console.log("documentDir:", documentDir())
    console.log("downloadDir:", downloadDir())
    console.log("fontDir:", fontDir())
    console.log("pictureDir:", pictureDir())
    console.log("publicDir:", publicDir())
    console.log("templateDir:", templateDir())
    console.log("videoDir:", videoDir())
    console.log("------------------------\n")
  })
})
