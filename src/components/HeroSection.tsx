import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { CalendarIcon, ShoppingBag } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  consultationCta?: string;
  shopCta?: string;
  onConsultationClick?: () => void;
  onShopClick?: () => void;
}

const HeroSection = ({
  title = "Discover Your Cosmic Path",
  subtitle = "Expert astrology readings and premium gemstones to align your energy and transform your life",
  consultationCta = "Book Consultation",
  shopCta = "Shop Gemstones",
  onConsultationClick = () => {},
  onShopClick = () => {},
}: HeroSectionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation for stars and constellations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || 600;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Create stars
    const stars: {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
    }[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        speed: 0.1 + Math.random() * 0.3,
      });
    }

    // Create zodiac constellations (simplified)
    const constellations = [
      // Simplified Aries
      [
        { x: 0.2, y: 0.3 },
        { x: 0.25, y: 0.35 },
        { x: 0.3, y: 0.32 },
      ],
      // Simplified Taurus
      [
        { x: 0.5, y: 0.2 },
        { x: 0.55, y: 0.25 },
        { x: 0.6, y: 0.2 },
        { x: 0.65, y: 0.25 },
      ],
      // Simplified Gemini
      [
        { x: 0.8, y: 0.3 },
        { x: 0.82, y: 0.35 },
        { x: 0.85, y: 0.4 },
        { x: 0.87, y: 0.35 },
        { x: 0.9, y: 0.3 },
      ],
    ];

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Move stars
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        // Twinkle effect
        star.opacity = Math.sin(Date.now() * 0.001 * star.speed) * 0.5 + 0.5;
      });

      // Draw constellations
      constellations.forEach((constellation) => {
        ctx.strokeStyle = "rgba(255, 215, 0, 0.3)";
        ctx.lineWidth = 0.5;

        for (let i = 0; i < constellation.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(
            constellation[i].x * canvas.width,
            constellation[i].y * canvas.height,
          );
          ctx.lineTo(
            constellation[i + 1].x * canvas.width,
            constellation[i + 1].y * canvas.height,
          );
          ctx.stroke();
        }

        constellation.forEach((point) => {
          ctx.beginPath();
          ctx.arc(
            point.x * canvas.width,
            point.y * canvas.height,
            1.5,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = "rgba(255, 215, 0, 0.8)";
          ctx.fill();
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-gradient-to-b from-[#0D0D1A] to-[#000000] overflow-hidden">
      {/* Animated background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      ></canvas>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 text-white font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            onClick={onConsultationClick}
            className="bg-[#3E1F47] hover:bg-[#3E1F47]/90 text-white px-6 py-2 rounded-full flex items-center gap-2"
            size="lg"
          >
            <CalendarIcon size={18} />
            {consultationCta}
          </Button>

          <Button
            onClick={onShopClick}
            className="bg-[#008080] hover:bg-[#008080]/90 text-white px-6 py-2 rounded-full flex items-center gap-2"
            size="lg"
          >
            <ShoppingBag size={18} />
            {shopCta}
          </Button>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[#FFD700]/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-[#008080]/10 blur-3xl"></div>
      </div>
    </div>
  );
};

export default HeroSection;
