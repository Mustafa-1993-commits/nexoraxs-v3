declare const writeCollection: (key: unknown, value: unknown[]) => void;
declare const STORAGE_KEYS: { orders: string };
writeCollection(STORAGE_KEYS.orders, []);
