/**
 * Storage adapter mirroring @react-native-async-storage/async-storage.
 * Provides offline persistence for progress sync queues, cached metadata, and reader preferences.
 */
class StorageService {
  private memoryFallback: Map<string, string> = new Map();

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  public async getItem(key: string): Promise<string | null> {
    if (this.isLocalStorageAvailable()) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        console.warn('Storage read warning:', e);
      }
    }
    return this.memoryFallback.get(key) || null;
  }

  public async setItem(key: string, value: string): Promise<void> {
    if (this.isLocalStorageAvailable()) {
      try {
        window.localStorage.setItem(key, value);
        return;
      } catch (e) {
        console.warn('Storage write warning:', e);
      }
    }
    this.memoryFallback.set(key, value);
  }

  public async removeItem(key: string): Promise<void> {
    if (this.isLocalStorageAvailable()) {
      try {
        window.localStorage.removeItem(key);
        return;
      } catch (e) {
        console.warn('Storage remove warning:', e);
      }
    }
    this.memoryFallback.delete(key);
  }

  public async getObject<T>(key: string, fallback: T): Promise<T> {
    const raw = await this.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  public async setObject<T>(key: string, value: T): Promise<void> {
    await this.setItem(key, JSON.stringify(value));
  }
}

export const appStorage = new StorageService();
