import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistStorage, StorageValue } from "zustand/middleware";

/**
 * Generic AsyncStorage adapter for Zustand
 *
 * @returns PersistStorage<T>
 *
 * @todo use superjson instead of json.stringify
 *
 * @example
 * ```
 * import { create } from "zustand";
 * import { PersistStorage, StorageValue } from "zustand/middleware";
 *
 * type State = {};
 * type Store = {};
 *
 * const storage = createAsyncPersistStorage<State>();
 *
 * export const usePreferencesStore = create<Store>()(
 *   persist<State>(
 *     (set, get) => (...),
 *     {
 *       name: "..",
 *       storage,
 *     },
 *   ),
 * );
 *
 * ```
 */
export function createAsyncPersistStorage<T>(): PersistStorage<T> {
  return {
    getItem: (name) =>
      AsyncStorage.getItem(name).then((value) =>
        value !== null ? JSON.parse(value) : null,
      ) as Promise<StorageValue<T> | null>,
    setItem: (name, value) => AsyncStorage.setItem(name, JSON.stringify(value)),
    removeItem: (name: string) => AsyncStorage.removeItem(name),
  };
}
