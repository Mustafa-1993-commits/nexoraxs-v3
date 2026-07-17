declare const writeCollection: (key: unknown, value: unknown[]) => void;
declare const STORAGE_KEYS: { users: string };
writeCollection(STORAGE_KEYS.users, []);
