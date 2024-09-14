import { applyMultiplier } from "./utils";

describe("applyMultiplier", () => {
  test("should multiply a number by the given multiplier", () => {
    expect(applyMultiplier(4, 10)).toBe(40);
  });

  test("should return undefined if the value is undefined", () => {
    expect(applyMultiplier(4, undefined)).toBeUndefined();
  });

  test("should return the same value if it is not a number", () => {
    expect(applyMultiplier(4, "string" as any)).toBe("string");
    expect(applyMultiplier(4, null)).toBe(null);
  });
});
