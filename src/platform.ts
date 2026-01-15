/**
 * Platform detection and utilities for cross-runtime compatibility.
 * Works with both Node.js and Bun.
 */

/** Supported platforms */
export type Platform = "windows" | "darwin" | "linux"

/**
 * Detect the current platform.
 * Works in both Node.js and Bun environments.
 */
export function getPlatform(): Platform {
  const platform = process.platform
  if (platform === "win32") return "windows"
  if (platform === "darwin") return "darwin"
  return "linux" // Default to Linux for other Unix-like systems
}

/**
 * Get an environment variable value.
 * Cross-runtime compatible.
 */
export function getEnv(key: string): string | undefined {
  return process.env[key]
}

/**
 * Get the user's home directory.
 * Cross-runtime and cross-platform compatible.
 */
export function getHomeDir(): string | null {
  // process.env.HOME works on Linux/macOS
  // process.env.USERPROFILE works on Windows
  const home = process.env.HOME || process.env.USERPROFILE
  return home || null
}
