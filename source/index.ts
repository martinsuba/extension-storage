enum StorageArea {
  sync = 'sync',
  local = 'local',
}

class ExtensionStorage {
  storageArea: StorageArea

  constructor(storageArea) {
    this.storageArea = storageArea;
  }
}

const localStorage = new ExtensionStorage(StorageArea.local);
const syncStorage = new ExtensionStorage(StorageArea.sync);

export default {
  local: localStorage,
  sync: syncStorage,
};
