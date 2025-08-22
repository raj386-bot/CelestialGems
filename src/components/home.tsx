import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import ServiceGrid from "./ServiceGrid";
import GemstoneShop from "./GemstoneShop";
import CartDrawer from "./CartDrawer";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: "service" | "gemstone";
  image?: string;
}

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "gem-1",
      name: "Amethyst Crystal",
      price: 49.99,
      quantity: 1,
      type: "gemstone",
      image:
        "https://images.unsplash.com/photo-1598751337485-0d57b0c50b83?w=300&q=80",
    },
    {
      id: "service-1",
      name: "Birth Chart Reading",
      price: 129.99,
      quantity: 1,
      type: "service",
    },
  ]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, item];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D1A] to-[#000000] text-white">
      {/* Header/NavBar */}
      <header className="sticky top-0 z-40 bg-[#0D0D1A]/90 backdrop-blur-sm border-b border-[#3E1F47]/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold font-serif text-[#FFD700]"
            >
              Celestial Gems
            </motion.div>
          </div>

          <nav className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Services
            </a>
            <a
              href="#gemstones"
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Gemstones
            </a>
            <a
              href="#"
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5 text-white" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFD700] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Astrology Services Section */}
        <section id="services" className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FFD700] mb-4">
                Astrology Services
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Discover your cosmic path with our professional astrology
                services tailored to illuminate your journey.
              </p>
            </motion.div>

            <ServiceGrid
              onBookService={(service) => {
                addToCart({
                  id: service.id,
                  name: service.name,
                  price: service.price,
                  quantity: 1,
                  type: "service",
                });
                setIsCartOpen(true);
              }}
            />
          </div>
        </section>

        {/* Gemstone Shop Section */}
        <section id="gemstones" className="py-16 px-4 bg-[#0D0D1A]/50">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FFD700] mb-4">
                Celestial Gemstones
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Harness the power of the cosmos with our curated collection of
                mystical gemstones and crystals.
              </p>
            </motion.div>

            <GemstoneShop
              onAddToCart={(gemstone) => {
                addToCart({
                  id: gemstone.id,
                  name: gemstone.name,
                  price: gemstone.price,
                  quantity: 1,
                  type: "gemstone",
                  image: gemstone.image,
                });
              }}
            />
          </div>
        </section>

        {/* Astrologer Profile Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="md:w-1/3"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FFD700]/20 rounded-full blur-xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80"
                    alt="Mystical Knowledge - Open Book with Rising Sun"
                    className="w-64 h-64 object-cover rounded-full border-2 border-[#FFD700] relative z-10 mx-auto"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="md:w-2/3"
              >
                <h2 className="text-3xl font-serif font-bold text-[#FFD700] mb-4">
                  Meet Your Astrologer
                </h2>
                <h3 className="text-xl text-[#008080] mb-4">
                  Shri Ananda Madhukar
                </h3>
                <p className="text-gray-300 mb-6">
                  With over 20 years of experience in Vedic astrology and
                  spiritual guidance, Shri Ananda Madhukar combines ancient
                  Sanskrit wisdom with intuitive insights to provide profound
                  understanding of your cosmic blueprint. His readings have
                  guided thousands on their spiritual journeys, helping them
                  align with their dharmic purpose and navigate life's
                  challenges.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="px-3 py-1 bg-[#3E1F47] rounded-full text-sm">
                    Vedic Astrology
                  </span>
                  <span className="px-3 py-1 bg-[#3E1F47] rounded-full text-sm">
                    Western Astrology
                  </span>
                  <span className="px-3 py-1 bg-[#3E1F47] rounded-full text-sm">
                    Crystal Healing
                  </span>
                  <span className="px-3 py-1 bg-[#3E1F47] rounded-full text-sm">
                    Tarot Reading
                  </span>
                </div>
                <Button className="bg-[#008080] hover:bg-[#008080]/80 text-white">
                  Schedule a Consultation
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blog/Knowledge Hub Section */}
        <section className="py-16 px-4 bg-[#0D0D1A]/50">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FFD700] mb-4">
                Cosmic Knowledge
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Explore our collection of articles and guides to deepen your
                understanding of astrology and gemstone properties.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: item * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#1A1A2E] rounded-lg overflow-hidden border border-[#3E1F47]/30 hover:border-[#FFD700]/50 transition-all duration-300"
                >
                  <img
                    src={`https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80`}
                    alt="Blog post"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="text-xs text-[#008080] uppercase tracking-wider">
                      Astrology
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white mt-2 mb-3">
                      Understanding Your Moon Sign
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Discover how your moon sign influences your emotional
                      landscape and inner world.
                    </p>
                    <a
                      href="#"
                      className="text-[#FFD700] hover:underline inline-flex items-center"
                    >
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button
                variant="outline"
                className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10"
              >
                View All Articles
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#3E1F47] py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="stars"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="1" fill="white" />
                <circle cx="30" cy="40" r="1.5" fill="white" />
                <circle cx="70" cy="20" r="1" fill="white" />
                <circle cx="90" cy="60" r="2" fill="white" />
                <circle cx="50" cy="80" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stars)" />
          </svg>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#FFD700] mb-4">
                Celestial Gems
              </h3>
              <p className="text-gray-300 mb-4">
                Guiding your spiritual journey through the cosmos with premium
                astrology services and mystical gemstones.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-[#FFD700]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#FFD700]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#FFD700]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    Astrology Services
                  </a>
                </li>
                <li>
                  <a
                    href="#gemstones"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    Gemstone Shop
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">
                Customer Service
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    Returns & Refunds
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">
                Newsletter
              </h4>
              <p className="text-gray-300 mb-4">
                Subscribe to receive cosmic updates and special offers.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full bg-[#2A1633] border border-[#3E1F47] rounded-l-md focus:outline-none focus:border-[#FFD700]"
                />
                <button
                  type="submit"
                  className="bg-[#FFD700] text-black px-4 py-2 rounded-r-md hover:bg-[#FFD700]/80 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-[#3E1F47]/50 mt-10 pt-6 text-center text-gray-400 text-sm">
            <p>
              © 2023 Celestial Gems. All rights reserved. Designed with cosmic
              energy.
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}
