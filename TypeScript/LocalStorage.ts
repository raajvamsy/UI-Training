export class LocalStorageMock {
  store: Object;
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = JSON.stringify(value);
  }
  removeItem(key: string) {
    delete this.store[key];
  }
}
