"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/mock-data/products";
import { ProductsPanel } from "@/components/pos/ProductsPanel";
import { CartPanel } from "@/components/pos/CartPanel";
import { SaleSuccessModal } from "@/components/pos/SaleSuccessModal";
import { isOnboardingComplete } from "@/lib/mode";
import type { CartItem, Discount, PaymentMethod, Product, SaleReceipt } from "@/lib/pos-types";

const INITIAL_DISCOUNT: Discount = { mode: "amount", value: 0 };

export default function POSPage() {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (mounted && !isOnboardingComplete()) {
      router.replace("/onboarding");
    }
  }, [mounted, router]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<Discount>(INITIAL_DISCOUNT);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [amountReceived, setAmountReceived] = useState(0);
  const [receipt, setReceipt] = useState<SaleReceipt | null>(null);

  // Derived totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const rawDiscount =
    discount.mode === "percentage"
      ? (subtotal * discount.value) / 100
      : discount.value;
  const discountAmt = Math.min(rawDiscount, subtotal);
  const grandTotal = subtotal - discountAmt;
  const change = paymentMethod === "cash" ? amountReceived - grandTotal : null;

  function addToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                lineTotal: (item.quantity + 1) * item.product.price,
              }
            : item,
        );
      }
      return [...prev, { product, quantity: 1, lineTotal: product.price }];
    });
  }

  function incrementItem(productId: string) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
              lineTotal: (item.quantity + 1) * item.product.price,
            }
          : item,
      ),
    );
  }

  function decrementItem(productId: string) {
    setCartItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (!item) return prev;
      if (item.quantity === 1) return prev.filter((i) => i.product.id !== productId);
      return prev.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: i.quantity - 1, lineTotal: (i.quantity - 1) * i.product.price }
          : i,
      );
    });
  }

  function removeItem(productId: string) {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function clearCart() {
    setCartItems([]);
    setDiscount(INITIAL_DISCOUNT);
    setAmountReceived(0);
    setPaymentMethod("cash");
  }

  function completeSale() {
    const newReceipt: SaleReceipt = {
      items: cartItems,
      subtotal,
      discountAmt,
      grandTotal,
      paymentMethod,
      amountReceived: paymentMethod === "cash" ? amountReceived : null,
      change: paymentMethod === "cash" ? change : null,
      completedAt: new Date().toISOString(),
    };
    setReceipt(newReceipt);
  }

  function handleNewSale() {
    clearCart();
    setReceipt(null);
  }

  // Keyboard shortcuts: "/" focuses search, "Escape" clears cart with confirmation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const inInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      if (e.key === "/" && !inInput) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }

      if (e.key === "Escape" && cartItems.length > 0 && !receipt) {
        if (window.confirm("Clear cart and start a new sale?")) {
          clearCart();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cartItems.length, receipt]);

  if (!mounted) return null;

  return (
    <>
      {/* Full-screen 60/40 split — stacks on mobile */}
      <div className="flex h-full flex-col overflow-hidden md:flex-row">
        {/* Products panel — full width on mobile, 60% on desktop */}
        <div className="h-1/2 overflow-hidden border-b border-white/5 md:h-full md:w-[60%] md:border-b-0 md:border-r">
          <ProductsPanel
            products={MOCK_PRODUCTS}
            onAddToCart={addToCart}
            searchInputRef={searchInputRef}
          />
        </div>

        {/* Cart panel — full width on mobile, 40% on desktop */}
        <div className="h-1/2 overflow-hidden md:h-full md:w-[40%]">
          <CartPanel
            items={cartItems}
            discount={discount}
            paymentMethod={paymentMethod}
            amountReceived={amountReceived}
            subtotal={subtotal}
            discountAmt={discountAmt}
            grandTotal={grandTotal}
            change={change}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
            onRemove={removeItem}
            onDiscountChange={setDiscount}
            onMethodChange={setPaymentMethod}
            onAmountReceivedChange={setAmountReceived}
            onCompleteSale={completeSale}
          />
        </div>
      </div>

      {receipt && (
        <SaleSuccessModal
          receipt={receipt}
          onNewSale={handleNewSale}
          onViewOrder={() => {}}
        />
      )}
    </>
  );
}
