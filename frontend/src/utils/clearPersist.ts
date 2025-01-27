import storage from "redux-persist/lib/storage";

export const clearPersistData = (key: string) => {
  storage.removeItem(key);
};
