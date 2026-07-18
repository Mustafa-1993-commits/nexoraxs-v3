/** Browser-neutral compatibility access to the existing POS success reference. */
export interface LegacyPosLastOrderPort {
  read(): string | null;
  write(orderId: string): void;
  clear(): void;
}

