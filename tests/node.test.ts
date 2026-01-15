/**
 * Tests for cross-dirs library using Node.js native test runner.
 * This file is used for Node.js testing via tsx.
 */

import assert from "node:assert"
import { describe, it } from "node:test"
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
    it("should return a valid platform", () => {
      const platform = getPlatform()
      assert.ok(["windows", "darwin", "linux"].includes(platform))
    })
  })

  describe("homeDir", () => {
    it("should return a non-null string", () => {
      const result = homeDir()
      assert.notStrictEqual(result, null)
      assert.strictEqual(typeof result, "string")
      // biome-ignore lint/style/noNonNullAssertion: i dont care
      assert.ok(result!.length > 0)
    })
  })

  describe("Base directories", () => {
    it("cacheDir should return a string or null", () => {
      const result = cacheDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("configDir should return a string or null", () => {
      const result = configDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("configLocalDir should return a string or null", () => {
      const result = configLocalDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("dataDir should return a string or null", () => {
      const result = dataDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("dataLocalDir should return a string or null", () => {
      const result = dataLocalDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("executableDir should return a string or null", () => {
      const result = executableDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("preferenceDir should return a string or null", () => {
      const result = preferenceDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("runtimeDir should return a string or null", () => {
      const result = runtimeDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("stateDir should return a string or null", () => {
      const result = stateDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })
  })

  describe("User directories", () => {
    it("audioDir should return a string or null", () => {
      const result = audioDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("desktopDir should return a string or null", () => {
      const result = desktopDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("documentDir should return a string or null", () => {
      const result = documentDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("downloadDir should return a string or null", () => {
      const result = downloadDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("fontDir should return a string or null", () => {
      const result = fontDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("pictureDir should return a string or null", () => {
      const result = pictureDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("publicDir should return a string or null", () => {
      const result = publicDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("templateDir should return a string or null", () => {
      const result = templateDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })

    it("videoDir should return a string or null", () => {
      const result = videoDir()
      if (result !== null) {
        assert.strictEqual(typeof result, "string")
      }
    })
  })

  describe("Directory values (for manual verification)", () => {
    it("print all directories", () => {
      console.log("\n--- Directory Values (Node.js) ---")
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
      console.log("----------------------------------\n")
    })
  })
})
