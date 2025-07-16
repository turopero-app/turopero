import { View, Text, TouchableOpacity, Image } from "react-native";
import { Heart, MessageCircle, Share } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MediaCarousel } from "./MediaCarousel";
import { Post } from "types/post";
import { useState } from "react";

type Props = {
  post: Post;
  isVisible: boolean;
  availableHeight: number;
  screenWidth: number;
};

export function PostCard({ post, isVisible, availableHeight, screenWidth }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (offsetX: number) => {
    const newIndex = Math.round(offsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={{ height: availableHeight }} className="relative">
      <View style={{ width: screenWidth, height: availableHeight }}>
        <MediaCarousel
          media={post.media}
          postId={post.id}
          isVisible={isVisible}
          screenWidth={screenWidth}
          screenHeight={availableHeight}
          onScroll={handleScroll}
          currentIndex={currentIndex}
        />
      </View>

      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}
        className="absolute bottom-12 left-0 right-0 px-4 py-4 z-10"
      >
        <Text className="text-white font-bold text-lg mb-1">{post.title}</Text>
        <Text className="text-white text-sm mb-2">{post.description}</Text>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-lg font-bold">💳 {post.credits} créditos</Text>
          <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
            <Text className="text-black font-semibold text-sm">Comprar</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View
        style={{ right: 12, bottom: availableHeight * 0.24 }}
        className="absolute items-center gap-y-10 z-20"
      >
        <Image
          source={{ uri: post.avatar }}
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <Heart color="white" size={26} />
        <MessageCircle color="white" size={26} />
        <Share color="white" size={26} />
      </View>
    </View>
  );
}
