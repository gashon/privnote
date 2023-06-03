const storagePrefix = 'G_H';

type StorageDocument<T> = {
  data: T;
  created_at: Date;
  updated_at: Date;
  expires_at?: Date;
};

type Storage = {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, expires_at?: Date): void;
  remove(key: string): void;
  exists(key: string): boolean | null;
  getMeta(key: string): Omit<StorageDocument<any>, 'data'> | null;
  getKey(key: string): string;
  isMounted(): boolean;
  isAvailable(): boolean;
};

const storage: Storage = {
  get<T>(key: string): T | null {
    if (!this.isMounted()) return null;

    const item = localStorage.getItem(this.getKey(key));
    const doc: StorageDocument<T> = item ? JSON.parse(item) : null;

    if (doc && doc.expires_at && new Date(doc.expires_at) < new Date()) {
      this.remove(key);
      return null;
    }

    return doc ? doc.data : null;
  },
  set<T>(key: string, value: T, expires_at?: Date): void {
    if (!this.isMounted()) return;

    const prev = this.getMeta(key);

    const doc: StorageDocument<T> = {
      data: value,
      created_at: prev?.created_at ?? new Date(),
      updated_at: new Date(),
      expires_at,
    };

    localStorage.setItem(this.getKey(key), JSON.stringify(doc));
  },
  remove(key: string): void {
    if (!this.isMounted()) return;

    localStorage.removeItem(this.getKey(key));
  },
  exists(key: string): boolean | null {
    if (!this.isMounted()) return null;

    return !!localStorage.getItem(this.getKey(key));
  },
  getKey(key: string): string {
    return `${storagePrefix}_${key}`;
  },
  getMeta(key: string): Omit<StorageDocument<any>, 'data'> | null {
    const item = localStorage.getItem(`${storagePrefix}_${key}`);
    const doc: StorageDocument<any> = item ? JSON.parse(item) : null;

    if (doc) delete doc.data;

    return doc as Omit<StorageDocument<any>, 'data'> | null;
  },
  isMounted(): boolean {
    return typeof window !== 'undefined';
  },
  isAvailable(): boolean {
    try {
      localStorage.setItem('available_check', 'available_check');
      localStorage.removeItem('available_check');
      return true;
    } catch (e) {
      return false;
    }
  },
};

export const dropDownStorageHandler = {
  key: 'dropdown:state',
  get: () => {
    const dropDownState = storage.get<string[]>(dropDownStorageHandler.key);
    return dropDownState;
  },
  add: (dropDownId: string | undefined) => {
    if (!dropDownId) return;

    const dropDownState = dropDownStorageHandler.get();
    if (dropDownState)
      storage.set(dropDownStorageHandler.key, [...dropDownState, dropDownId]);
    else storage.set(dropDownStorageHandler.key, [dropDownId]);

    dropDownStorageHandler.INTERNAL_validateFormat();
  },
  remove: (dropDownId: string | undefined) => {
    if (!dropDownId) return;

    const dropDownState = dropDownStorageHandler.get();
    if (!dropDownState) return;

    const newDropDownState = dropDownState.filter(
      (dropDown) => dropDown !== dropDownId,
    );
    storage.set(dropDownStorageHandler.key, newDropDownState);

    dropDownStorageHandler.INTERNAL_validateFormat();
    return;
  },
  isOpen: (dropDownId: string | undefined) => {
    if (!dropDownId) return false;

    const dropDownState = dropDownStorageHandler.get();
    if (dropDownState) {
      return dropDownState.includes(dropDownId);
    }
    return false;
  },
  clear: () => {
    storage.remove(dropDownStorageHandler.key);
  },
  INTERNAL_validateFormat: () => {
    const dropDownState = storage.get(dropDownStorageHandler.key);
    if (!dropDownState) return;

    // verify is array and contains strings
    if (
      !Array.isArray(dropDownState) ||
      !dropDownState.every((x) => typeof x === 'string')
    ) {
      console.error(
        "Invalid format for dropdown storage. Expected type 'Array<string>'",
      );
      dropDownStorageHandler.clear();
      return;
    }
  },
};

export default storage;
