import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info, Paw, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const fetchCatFact = async () => {
  const response = await fetch("https://catfact.ninja/fact");
  const data = await response.json();
  return data.fact;
};

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { data: catFact, refetch: refetchCatFact } = useQuery({
    queryKey: ["catFact"],
    queryFn: fetchCatFact,
  });

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              src={catImages[currentImageIndex]}
              alt="Adorable cat" 
              className="mx-auto object-cover w-full h-[500px] rounded-lg mb-8 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {catImages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center mb-8 space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setLikes(likes + 1)}
            className="flex items-center gap-2"
          >
            <Heart className="h-5 w-5 text-red-500" />
            Like this cat! ({likes})
          </Button>
          <Button
            variant="outline"
            onClick={() => refetchCatFact()}
            className="flex items-center gap-2"
          >
            <Paw className="h-5 w-5 text-purple-500" />
            Get Cat Fact
          </Button>
        </div>

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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
