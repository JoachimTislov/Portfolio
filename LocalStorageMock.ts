export class LocalStorageMock {
  private store: { [key: string]: string };


  get length(): number {
    return Object.keys(this.store).length;
  }

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}