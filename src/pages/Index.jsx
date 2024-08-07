import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info, Paw, Star, Sparkles, Camera, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const fetchCatFact = async () => {
  const response = await fetch("https://catfact.ninja/fact");
  const data = await response.json();
  return data.fact;
};

const fetchCatImage = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await response.json();
  return data[0].url;
};

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [catHappiness, setCatHappiness] = useState(50);
  const { data: catFact, refetch: refetchCatFact } = useQuery({
    queryKey: ["catFact"],
    queryFn: fetchCatFact,
  });
  const { data: catImage, refetch: refetchCatImage } = useQuery({
    queryKey: ["catImage"],
    queryFn: fetchCatImage,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCatHappiness((prevHappiness) => Math.max(0, prevHappiness - 5));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handlePet = () => {
    setCatHappiness((prevHappiness) => Math.min(100, prevHappiness + 10));
    setLikes((prevLikes) => prevLikes + 1);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold mb-6 text-center text-purple-800"
        >
          Purrfect Cat World
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <Carousel className="w-full max-w-xl mx-auto">
            <CarouselContent>
              <CarouselItem>
                <img 
                  src={catImage || "/placeholder.svg"}
                  alt="Adorable cat" 
                  className="mx-auto object-cover w-full h-[500px] rounded-lg shadow-lg"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-4 right-4 bg-white/80 hover:bg-white"
            onClick={() => refetchCatImage()}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div 
          className="flex justify-center mb-8 space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button 
            variant="outline" 
            onClick={handlePet}
            className="flex items-center gap-2 bg-pink-100 hover:bg-pink-200 transition-colors duration-300"
          >
            <Heart className="h-5 w-5 text-red-500" />
            Pet the cat! ({likes})
          </Button>
          <Button
            variant="outline"
            onClick={() => refetchCatFact()}
            className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 transition-colors duration-300"
          >
            <Paw className="h-5 w-5 text-purple-500" />
            Get Cat Fact
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-center mb-2 font-semibold text-purple-800">Cat Happiness</p>
          <Progress value={catHappiness} className="w-full" />
        </motion.div>

        {catFact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-lg shadow-md mb-8"
          >
            <p className="text-purple-800 font-semibold">
              <Star className="inline-block h-5 w-5 mr-2 text-yellow-500" />
              Cat Fact: {catFact}
            </p>
          </motion.div>
        )}

        <Tabs defaultValue="characteristics" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
            <TabsTrigger value="gallery">Cat Gallery</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-6 w-6 text-purple-600" />
                  Fascinating Cat Characteristics
                </CardTitle>
                <CardDescription>What makes cats truly unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none pl-6 space-y-2">
                  {[
                    "Independent and curious nature",
                    "Excellent hunters with razor-sharp claws and teeth",
                    "Incredibly flexible bodies and lightning-quick reflexes",
                    "Exceptional senses, particularly acute hearing and night vision",
                    "Complex communication through vocalizations, body language, and scent marking"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Cat className="h-5 w-5 text-purple-500" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cat className="h-6 w-6 text-purple-600" />
                  Captivating Cat Breeds
                </CardTitle>
                <CardDescription>Explore these popular feline friends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none pl-6 space-y-2">
                  {[
                    { breed: "Siamese", description: "Known for their striking blue eyes and vocal nature" },
                    { breed: "Maine Coon", description: "Gentle giants with tufted ears and luxurious fur" },
                    { breed: "Persian", description: "Recognizable by their flat faces and long, silky coats" },
                    { breed: "Bengal", description: "Wild-looking cats with mesmerizing leopard-like spots" },
                    { breed: "Scottish Fold", description: "Adorable cats characterized by their unique folded ears" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <strong className="text-purple-700">{item.breed}:</strong> {item.description}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-6 w-6 text-purple-600" />
                  Cat Gallery
                </CardTitle>
                <CardDescription>Adorable cat pictures from around the web</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1200px-Sleeping_cat_on_her_back.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Adidas_Superstar_shoes.jpg/1200px-Adidas_Superstar_shoes.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/1200px-Gustav_chocolate.jpg"
                  ].map((url, index) => (
                    <motion.img
                      key={index}
                      src={url}
                      alt={`Cat ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg shadow-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
