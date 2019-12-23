import { StorageArea } from './constants';
import { validateArgument } from './utils';

class ExtensionStorage {
  storageArea: StorageArea

  constructor(storageArea) {
    this.storageArea = storageArea;
  }

  getAllRecords(): Promise<Record<string, unknown>> {
    return new Promise<Record<string, unknown>>((resolve, reject) => {
      try {
        chrome.storage[this.storageArea].get(null, (result: Record<string, unknown>) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  getRecords(keys: string[]): Promise<Record<string, unknown>> {
    return new Promise<Record<string, unknown>>((resolve, reject) => {
      validateArgument(keys, 'array');

      try {
        chrome.storage[this.storageArea].get(keys, (result: Record<string, unknown>) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  getOneRecord(key: string): Promise<unknown> {
    return new Promise<unknown>((resolve, reject) => {
      validateArgument(key, 'string');

      try {
        chrome.storage[this.storageArea].get(key, ({ [key]: result }: Record<string, unknown>) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  setOneRecord(key: string, value: unknown): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      validateArgument(key, 'string');

      try {
        chrome.storage[this.storageArea].set({ [key]: value }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  setRecords(records: Record<string, unknown>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      validateArgument(records, 'object');

      try {
        chrome.storage[this.storageArea].set(records, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  removeOneRecord(key: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      validateArgument(key, 'string');

      try {
        chrome.storage[this.storageArea].remove(key, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  removeRecords(keys: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      validateArgument(keys, 'array');

      try {
        chrome.storage[this.storageArea].remove(keys, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  clearRecords(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage[this.storageArea].clear(() => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export const localStorage = new ExtensionStorage(StorageArea.local);
export const syncStorage = new ExtensionStorage(StorageArea.sync);

export default {
  local: localStorage,
  sync: syncStorage,
};
