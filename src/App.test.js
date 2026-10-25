import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { webcrypto } from "node:crypto";
import { createPasswordHash, loadSavedLanguage, loadSavedStock, uiText, verifyPassword } from "./App.jsx";

const storage = new Map();

beforeEach(() => {
  storage.clear();
  vi.stubGlobal("crypto", webcrypto);
  vi.stubGlobal("localStorage", {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("shop account behavior", () => {
  it("keeps each shop's stock separate and starts non-demo accounts empty", () => {
    storage.set("dukaan-mitra.stock.1111111111", JSON.stringify([{ id: "item-a" }]));

    expect(loadSavedStock("1111111111")).toEqual([{ id: "item-a" }]);
    expect(loadSavedStock("2222222222")).toEqual([]);
    expect(loadSavedStock("7045643088").length).toBeGreaterThan(0);
  });

  it("verifies saved passwords on later sign-ins without storing plaintext", async () => {
    const savedCredentials = await createPasswordHash("sample-password");

    expect(savedCredentials).not.toHaveProperty("password");
    await expect(verifyPassword("sample-password", savedCredentials.passwordSalt, savedCredentials.passwordHash)).resolves.toBe(true);
    await expect(verifyPassword("wrong-password", savedCredentials.passwordSalt, savedCredentials.passwordHash)).resolves.toBe(false);
  });
});

describe("interface translations", () => {
  it("restores a supported language preference and safely defaults invalid values", () => {
    storage.set("dukaan-mitra.language", "hi");
    expect(loadSavedLanguage()).toBe("hi");

    storage.set("dukaan-mitra.language", "unknown");
    expect(loadSavedLanguage()).toBe("en");
  });

  it("translates stock and accessibility labels into Hindi and Marathi", () => {
    expect(uiText("Close window", "hi")).toBe("विंडो बंद करें");
    expect(uiText("New", "mr")).toBe("नवीन");
  });

  it("keeps unknown labels unchanged instead of returning empty text", () => {
    expect(uiText("A user-created product name", "hi")).toBe("A user-created product name");
  });
});
