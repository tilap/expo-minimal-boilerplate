import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "./index";

describe("Storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testKey = "testKey";
  const testData = { foo: "bar", num: 42 };

  describe("set", () => {
    it("should store data successfully", async () => {
      const storage = new Storage<typeof testData>(testKey);
      const result = await storage.set(testData);

      expect(result).toBe(true);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(testKey, JSON.stringify(testData));
    });

    it("should return false on error", async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error("Storage error"));
      const storage = new Storage<typeof testData>(testKey);
      const result = await storage.set(testData);

      expect(result).toBe(false);
    });
  });

  describe("get", () => {
    it("should retrieve data successfully", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(testData));
      const storage = new Storage<typeof testData>(testKey);
      const result = await storage.get();

      expect(result).toEqual(testData);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(testKey);
    });

    it("should return null if no data is found", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      const storage = new Storage<typeof testData>(testKey);
      const result = await storage.get();

      expect(result).toBeNull();
    });

    it("should return null on error", async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error("Retrieval error"));
      const storage = new Storage<typeof testData>(testKey);
      const result = await storage.get();

      expect(result).toBeNull();
    });
  });

  describe("remove", () => {
    it("should remove data successfully", () => {
      const storage = new Storage<typeof testData>(testKey);
      const result = storage.remove();

      expect(result).toBe(true);
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(testKey);
    });

    it("should return false on error", () => {
      (AsyncStorage.removeItem as jest.Mock).mockImplementationOnce(() => {
        throw new Error("Removal error");
      });
      const storage = new Storage<typeof testData>(testKey);
      const result = storage.remove();

      expect(result).toBe(false);
    });
  });
});
