import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { FormattedFrameWithVariants } from "@/types/frame";

interface CartItem {
    frame: FormattedFrameWithVariants;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (frameId: string) => void;
    incrementQuantity: (frameId: string) => void;
    decrementQuantity: (frameId: string) => void;
    resetCart: () => void;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (item: CartItem) => {
                const cart = get().cart;
                set({ cart: [...cart, item] });
            },

            removeFromCart: (frameId: string) => {
                set({
                    cart: get().cart.filter((cartItem) => cartItem.frame.id !== frameId),
                });
            },

            incrementQuantity: (frameId: string) => {
                set({
                    cart: get().cart.map((cartItem) =>
                        cartItem.frame.id === frameId
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem,
                    ),
                });
            },

            decrementQuantity: (frameId: string) => {
                set({
                    cart: get().cart.map((cartItem) =>
                        cartItem.frame.id === frameId && cartItem.quantity > 1
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem,
                    ),
                });
            },
            resetCart: () => {
                set({ cart: [] });
            },
        }),
        {
            name: "user-cart",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
