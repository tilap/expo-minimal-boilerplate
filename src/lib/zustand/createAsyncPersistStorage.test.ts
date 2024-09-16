import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncPersistStorage } from "./createAsyncPersistStorage";

jest.mock("@react-native-async-storage/async-storage");

describe("createAsyncPersistStorage", () => {
  const storage = createAsyncPersistStorage<{ key: string }>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get item from AsyncStorage", async () => {
    const mockValue = { key: "value" };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockValue));

    const result = await storage.getItem("testKey");
    expect(result).toEqual(mockValue);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("testKey");
  });

  it("should return null if item does not exist", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const result = await storage.getItem("nonExistentKey");
    expect(result).toBeNull();
  });

  it("should set item in AsyncStorage", async () => {
    const mockValue = { key: "value", state: "someState" };
    await storage.setItem("testKey", { state: mockValue });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify({ state: mockValue }),
    );
  });

  it("should remove item from AsyncStorage", async () => {
    await storage.removeItem("testKey");

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("testKey");
  });
});
