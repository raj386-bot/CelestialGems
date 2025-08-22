import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Sparkles,
  Moon,
  Sun,
  Star,
  Compass,
  Clock,
  Zap,
  Gem,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  duration: string;
}

interface ServiceGridProps {
  services?: Service[];
  onBookService?: (service: Service) => void;
}

const ServiceGrid = ({
  services = defaultServices,
  onBookService = () => {},
}: ServiceGridProps) => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for each card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -10,
      boxShadow: "0 10px 25px rgba(62, 31, 71, 0.2)",
      transition: {
        duration: 0.3,
      },
    },
  };

  // Function to render the appropriate icon based on the service's icon property
  const renderIcon = (iconName: string) => {
    const iconProps = { className: "h-8 w-8 text-teal-500 mb-4" };

    switch (iconName) {
      case "sparkles":
        return <Sparkles {...iconProps} />;
      case "moon":
        return <Moon {...iconProps} />;
      case "sun":
        return <Sun {...iconProps} />;
      case "star":
        return <Star {...iconProps} />;
      case "compass":
        return <Compass {...iconProps} />;
      case "clock":
        return <Clock {...iconProps} />;
      case "zap":
        return <Zap {...iconProps} />;
      case "gem":
        return <Gem {...iconProps} />;
      default:
        return <Star {...iconProps} />;
    }
  };

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-b from-[#0D0D1A] to-[#000000]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            <span className="text-[#FFD700]">Astrology</span> Services
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover cosmic insights and guidance through our premium astrology
            services, tailored to illuminate your path and reveal celestial
            influences.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover="hover"
            >
              <Card className="h-full bg-[#1A1A2E] border border-[#3E1F47]/30 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3E1F47]/5 to-transparent pointer-events-none" />
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="rounded-full p-3 bg-[#3E1F47]/20 mb-4">
                      {renderIcon(service.icon)}
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-white mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between w-full mt-auto">
                      <div className="flex items-center text-gray-300 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="text-[#FFD700] font-semibold text-right">
                        <div>${service.price}</div>
                        <div className="text-xs text-gray-400">
                          ₹{Math.round(service.price * 83)}
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4 bg-[#008080] hover:bg-[#006666] text-white"
                      onClick={() => onBookService(service)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Default services data
const defaultServices: Service[] = [
  {
    id: "1",
    name: "Birth Chart Reading",
    description:
      "Comprehensive analysis of your natal chart revealing personality traits, strengths, and life path.",
    price: 120,
    icon: "star",
    duration: "60 min",
  },
  {
    id: "2",
    name: "Compatibility Analysis",
    description:
      "Detailed examination of relationship dynamics between two individuals based on their charts.",
    price: 150,
    icon: "sparkles",
    duration: "75 min",
  },
  {
    id: "3",
    name: "Transit Forecast",
    description:
      "Predictions for upcoming months based on planetary movements and their impact on your chart.",
    price: 100,
    icon: "moon",
    duration: "45 min",
  },
  {
    id: "4",
    name: "Career Guidance",
    description:
      "Astrological insights into your professional path, strengths, and optimal career directions.",
    price: 135,
    icon: "compass",
    duration: "60 min",
  },
  {
    id: "5",
    name: "Solar Return Reading",
    description:
      "Analysis of your upcoming year based on your solar return chart, highlighting key themes.",
    price: 90,
    icon: "sun",
    duration: "45 min",
  },
  {
    id: "6",
    name: "Electional Astrology",
    description:
      "Finding the most auspicious time for important events like weddings, business launches, etc.",
    price: 180,
    icon: "clock",
    duration: "90 min",
  },
  {
    id: "7",
    name: "Remedial Measures",
    description:
      "Personalized recommendations for gemstones, rituals, and practices to balance planetary energies.",
    price: 110,
    icon: "gem",
    duration: "50 min",
  },
  {
    id: "8",
    name: "Emergency Reading",
    description:
      "Urgent astrological guidance for pressing life situations and immediate decision-making.",
    price: 200,
    icon: "zap",
    duration: "30 min",
  },
];

export default ServiceGrid;
