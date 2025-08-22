import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Star, Filter } from "lucide-react";

interface GemstoneProps {
  gemstones?: GemstoneType[];
  onAddToCart?: (gemstone: GemstoneType) => void;
}

interface GemstoneType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  planet: string;
  category: string;
  weightCarat: number;
  rating: number;
}

const GemstoneShop: React.FC<GemstoneProps> = ({
  gemstones = defaultGemstones,
  onAddToCart = () => {},
}) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedPlanet, setSelectedPlanet] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredGemstones, setFilteredGemstones] =
    useState<GemstoneType[]>(gemstones);

  // Filter gemstones based on selected filters
  React.useEffect(() => {
    const filtered = gemstones.filter((gemstone) => {
      const matchesPlanet =
        selectedPlanet === "all" || gemstone.planet === selectedPlanet;
      const matchesCategory =
        selectedCategory === "all" || gemstone.category === selectedCategory;
      const matchesPrice =
        gemstone.price >= priceRange[0] && gemstone.price <= priceRange[1];
      return matchesPlanet && matchesCategory && matchesPrice;
    });
    setFilteredGemstones(filtered);
  }, [gemstones, selectedPlanet, selectedCategory, priceRange]);

  return (
    <div className="w-full bg-gradient-to-b from-[#0D0D1A] to-[#000000] py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Mystical Gemstones
          </h2>
          <p className="text-teal-300 text-lg max-w-2xl mx-auto">
            Discover our collection of powerful gemstones, each with unique
            cosmic properties and energies.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#1A1A2E] rounded-xl p-6 mb-10 shadow-lg border border-indigo-900/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            <h3 className="text-xl font-serif text-white flex items-center">
              <Filter className="mr-2 h-5 w-5 text-[#FFD700]" />
              Filter Gemstones
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Planetary Association
              </label>
              <Select value={selectedPlanet} onValueChange={setSelectedPlanet}>
                <SelectTrigger className="bg-[#2D2D3A] border-indigo-900/50 text-white">
                  <SelectValue placeholder="All Planets" />
                </SelectTrigger>
                <SelectContent className="bg-[#2D2D3A] border-indigo-900/50 text-white">
                  <SelectItem value="all">All Planets</SelectItem>
                  <SelectItem value="sun">Sun</SelectItem>
                  <SelectItem value="moon">Moon</SelectItem>
                  <SelectItem value="mercury">Mercury</SelectItem>
                  <SelectItem value="venus">Venus</SelectItem>
                  <SelectItem value="mars">Mars</SelectItem>
                  <SelectItem value="jupiter">Jupiter</SelectItem>
                  <SelectItem value="saturn">Saturn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="bg-[#2D2D3A] border-indigo-900/50 text-white">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-[#2D2D3A] border-indigo-900/50 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="crystal">Crystal</SelectItem>
                  <SelectItem value="precious">Precious</SelectItem>
                  <SelectItem value="semi-precious">Semi-Precious</SelectItem>
                  <SelectItem value="birthstone">Birthstone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Gemstone Display */}
        <Tabs defaultValue="grid" className="w-full">
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGemstones.length > 0 ? (
                filteredGemstones.map((gemstone) => (
                  <Card
                    key={gemstone.id}
                    className="bg-[#1A1A2E] border-indigo-900/30 overflow-hidden group hover:shadow-[0_0_15px_rgba(0,128,128,0.5)] transition-all duration-300"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={gemstone.image}
                        alt={gemstone.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="secondary"
                          className="bg-[#3E1F47] text-[#FFD700]"
                        >
                          {gemstone.planet}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-serif font-medium text-white">
                          {gemstone.name}
                        </h3>
                        <div className="text-[#FFD700] font-bold text-right">
                          <div>${gemstone.price}</div>
                          <div className="text-xs text-gray-400">
                            ₹{Math.round(gemstone.price * 83)}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {gemstone.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star
                            className="h-4 w-4 text-[#FFD700] mr-1"
                            fill="#FFD700"
                          />
                          <span className="text-gray-300 text-sm">
                            {gemstone.rating}
                          </span>
                        </div>
                        <span className="text-teal-300 text-sm">
                          {gemstone.weightCarat} carat
                        </span>
                      </div>
                      <Button
                        onClick={() => onAddToCart(gemstone)}
                        className="w-full mt-4 bg-gradient-to-r from-[#3E1F47] to-[#008080] hover:from-[#4F2F57] hover:to-[#009999] text-white group-hover:shadow-[0_0_10px_rgba(255,215,0,0.3)]"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-300 text-lg">
                    No gemstones match your current filters.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedPlanet("all");
                      setSelectedCategory("all");
                      setPriceRange([0, 1000]);
                    }}
                    className="mt-4 border-teal-500 text-teal-300 hover:bg-teal-900/20"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list">
            <div className="space-y-4">
              {filteredGemstones.length > 0 ? (
                filteredGemstones.map((gemstone) => (
                  <Card
                    key={gemstone.id}
                    className="bg-[#1A1A2E] border-indigo-900/30 overflow-hidden group hover:shadow-[0_0_15px_rgba(0,128,128,0.5)] transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-1/4 h-48 md:h-auto">
                        <img
                          src={gemstone.image}
                          alt={gemstone.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge
                            variant="secondary"
                            className="bg-[#3E1F47] text-[#FFD700]"
                          >
                            {gemstone.planet}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4 md:p-6 w-full md:w-3/4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-serif font-medium text-white">
                              {gemstone.name}
                            </h3>
                            <div className="text-[#FFD700] font-bold text-lg text-right">
                              <div>${gemstone.price}</div>
                              <div className="text-sm text-gray-400">
                                ₹{Math.round(gemstone.price * 83)}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">
                            {gemstone.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-[#2D2D3A] text-teal-300">
                              {gemstone.category}
                            </Badge>
                            <Badge className="bg-[#2D2D3A] text-teal-300">
                              {gemstone.weightCarat} carat
                            </Badge>
                            <div className="flex items-center bg-[#2D2D3A] px-2 py-1 rounded-md">
                              <Star
                                className="h-4 w-4 text-[#FFD700] mr-1"
                                fill="#FFD700"
                              />
                              <span className="text-gray-300 text-sm">
                                {gemstone.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => onAddToCart(gemstone)}
                          className="w-full md:w-auto self-end bg-gradient-to-r from-[#3E1F47] to-[#008080] hover:from-[#4F2F57] hover:to-[#009999] text-white"
                        >
                          <PlusCircle className="mr-2 h-4 w-4" /> Add to Cart
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-300 text-lg">
                    No gemstones match your current filters.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedPlanet("all");
                      setSelectedCategory("all");
                      setPriceRange([0, 1000]);
                    }}
                    className="mt-4 border-teal-500 text-teal-300 hover:bg-teal-900/20"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Default gemstones data for preview
const defaultGemstones: GemstoneType[] = [
  {
    id: "1",
    name: "Amethyst Crystal",
    description:
      "A powerful stone for spiritual growth and protection. Enhances intuition and promotes calm.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    planet: "jupiter",
    category: "crystal",
    weightCarat: 8.5,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Rose Quartz",
    description:
      "The stone of unconditional love. Opens the heart chakra and attracts loving relationships.",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
    planet: "venus",
    category: "semi-precious",
    weightCarat: 6.2,
    rating: 4.7,
  },
  {
    id: "3",
    name: "Lapis Lazuli",
    description:
      "Enhances wisdom, truth and self-awareness. Stimulates enlightenment and spiritual journey.",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
    planet: "saturn",
    category: "precious",
    weightCarat: 7.8,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Citrine",
    description:
      "Known as the merchant's stone. Attracts wealth, prosperity and success in business.",
    price: 119.99,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    planet: "sun",
    category: "crystal",
    weightCarat: 5.4,
    rating: 4.6,
  },
  {
    id: "5",
    name: "Moonstone",
    description:
      "Balances emotions and enhances intuition. Connected to the divine feminine energy.",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
    planet: "moon",
    category: "birthstone",
    weightCarat: 4.2,
    rating: 4.9,
  },
  {
    id: "6",
    name: "Black Obsidian",
    description:
      "A powerful protection stone that shields against negativity and clears psychic smog.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    planet: "mars",
    category: "crystal",
    weightCarat: 9.0,
    rating: 4.5,
  },
  {
    id: "7",
    name: "Clear Quartz",
    description:
      "The master healer. Amplifies energy and thought, and connects to the higher self.",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
    planet: "mercury",
    category: "crystal",
    weightCarat: 7.1,
    rating: 4.7,
  },
  {
    id: "8",
    name: "Emerald",
    description:
      "Promotes loyalty, unconditional love, and stimulates the heart chakra.",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
    planet: "venus",
    category: "precious",
    weightCarat: 3.8,
    rating: 5.0,
  },
];

export default GemstoneShop;
