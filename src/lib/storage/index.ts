import AsyncStorage from "@react-native-async-storage/async-storage";

type Obj = {
  [key: string]: string | boolean | number | null | Obj;
};

export class Storage<Data extends Obj | Obj[]> {
  protected key: string;

  constructor(key: string) {
    this.key = key;
  }

  async set(value: Data): Promise<boolean> {
    try {
      const stringifiedValue = JSON.stringify(value);
      await AsyncStorage.setItem(this.key, stringifiedValue);
      return true;
    } catch {
      return false;
    }
  }

  async get(): Promise<Data | null> {
    try {
      const value = await AsyncStorage.getItem(this.key);
      return value === null ? null : JSON.parse(value);
    } catch {
      return null;
    }
  }

  remove(): boolean {
    try {
      AsyncStorage.removeItem(this.key);
      return true;
    } catch {
      return false;
    }
  }
}

export type IStorage<Data extends Obj | Obj[]> = Storage<Data>;
