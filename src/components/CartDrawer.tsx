import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, X } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  type: "service" | "gemstone";
}

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

const CartDrawer = ({
  isOpen = true,
  onClose = () => {},
  items = [],
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    items.length
      ? items
      : [
          {
            id: "1",
            name: "Birth Chart Reading",
            price: 120,
            image:
              "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=300&q=80",
            quantity: 1,
            type: "service",
          },
          {
            id: "2",
            name: "Amethyst Crystal",
            price: 45,
            image:
              "https://images.unsplash.com/photo-1598751337485-0d57b0c50b83?w=300&q=80",
            quantity: 2,
            type: "gemstone",
          },
          {
            id: "3",
            name: "Rose Quartz",
            price: 35,
            image:
              "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?w=300&q=80",
            quantity: 1,
            type: "gemstone",
          },
        ],
  );

  const updateQuantity = (id: string, change: number) => {
    const newQuantity = Math.max(
      1,
      cartItems.find((item) => item.id === id)?.quantity || 1 + change,
    );
    if (onUpdateQuantity) {
      onUpdateQuantity(id, newQuantity);
    } else {
      setCartItems(
        cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        }),
      );
    }
  };

  const removeItem = (id: string) => {
    if (onRemoveItem) {
      onRemoveItem(id);
    } else {
      setCartItems(cartItems.filter((item) => item.id !== id));
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-gradient-to-b from-[#0D0D1A] to-[#000000] text-white border-l border-indigo-900">
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl font-serif text-gold-400 font-bold">
            Your Mystical Cart
          </SheetTitle>
          <SheetDescription className="text-teal-300">
            {cartItems.length === 0
              ? "Your cart is empty"
              : `${cartItems.length} items in your cosmic journey`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="text-5xl mb-4">✨</div>
              <p className="text-center text-gray-400">
                Your mystical journey awaits.
                <br />
                Add items to begin.
              </p>
              <Button
                onClick={onClose}
                className="mt-6 bg-indigo-700 hover:bg-indigo-600 text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-indigo-900/30 border border-indigo-800/50"
              >
                <div
                  className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${item.image || "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=300&q=80"})`,
                  }}
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="text-sm text-teal-300 mt-1">
                    {item.type === "service" ? "Astrology Service" : "Gemstone"}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-indigo-700 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 text-gray-300 hover:bg-indigo-800 rounded-l-md"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 py-1 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 text-gray-300 hover:bg-indigo-800 rounded-r-md"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="font-medium text-gold-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-8">
            <Separator className="bg-indigo-800/50" />
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <Separator className="bg-indigo-800/50 my-2" />
              <div className="flex justify-between">
                <span className="font-medium text-white">Total</span>
                <span className="font-bold text-gold-400">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <SheetFooter className="mt-8 flex-col gap-3">
              <Button className="w-full bg-gold-400 hover:bg-gold-500 text-black font-medium">
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full border-indigo-700 text-white hover:bg-indigo-800 hover:text-white"
              >
                Continue Shopping
              </Button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
