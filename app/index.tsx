import { View, Text, FlatList, useWindowDimensions, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState, useRef } from "react";
import { Heart, Home, Layers, MessageCircle, Plus, Search, Share, User } from "lucide-react-native";
import type { ViewToken } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Video,ResizeMode  } from "expo-av";

export type MediaItem = {
  type: 'image' | 'video';
  uri: string;
};

export type Post = {
  id: string;
  user: string;
  avatar: string;
  title: string;
  description: string;
  credits: number;
  media: MediaItem[];
  likes: number;
  comments: number;
};

export function useVisiblePosts() {
  const [visiblePostIds, setVisiblePostIds] = useState<string[]>([]);
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const ids = viewableItems.map((viewable) => viewable.item?.id).filter(Boolean);
      setVisiblePostIds(ids);
    }
  ).current;
  return { visiblePostIds, onViewableItemsChanged };
}

export default function Index() {
  const [availableHeight, setAvailableHeight] = useState(0);
  const { visiblePostIds, onViewableItemsChanged } = useVisiblePosts();
  const screenWidth = useWindowDimensions().width;
  const [carouselIndexes, setCarouselIndexes] = useState<Record<string, number>>({});
  const videoRefs = useRef<Record<string, Video | null>>({});

  const handleScroll = (postId: string, offsetX: number) => {
    const newIndex = Math.round(offsetX / screenWidth);
    setCarouselIndexes((prev) => ({ ...prev, [postId]: newIndex }));
  };

  const posts: Post[] = [
  {
    id: '1',
    user: 'creador_01',
    avatar: 'https://i.pravatar.cc/150?img=1',
    title: 'Día de rodaje en Palermo',
    description: 'Capturas del último comercial que grabamos en Buenos Aires.',
    credits: 120,
    media: [
      { type: 'image', uri: 'https://picsum.photos/id/1018/600/400' },
      { type: 'image', uri: 'https://picsum.photos/id/1015/600/400' },
    ],
    likes: 132,
    comments: 8,
  },
  {
    id: '2',
    user: 'fotomaster',
    avatar: 'https://i.pravatar.cc/150?img=2',
    title: 'Making of – Corto publicitario',
    description: 'Un vistazo detrás de cámara con sonido original.',
    credits: 90,
    media: [
      { type: 'video', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    likes: 89,
    comments: 12,
  },
  {
    id: '3',
    user: 'motionwave',
    avatar: 'https://i.pravatar.cc/150?img=3',
    title: 'Composición final + teaser',
    description: 'Incluye imagen estática y teaser en video.',
    credits: 200,
    media: [
      { type: 'image', uri: 'https://picsum.photos/id/1027/600/400' },
      { type: 'video', uri: 'https://www.w3schools.com/html/movie.mp4' },
    ],
    likes: 210,
    comments: 34,
  },
  {
    id: '4',
    user: 'cinelover',
    avatar: 'https://i.pravatar.cc/150?img=4',
    title: 'Moodboard creativo',
    description: 'Inspiración para una campaña de otoño.',
    credits: 75,
    media: [
      { type: 'image', uri: 'https://picsum.photos/id/1035/600/400' },
      { type: 'image', uri: 'https://picsum.photos/id/1038/600/400' },
    ],
    likes: 47,
    comments: 5,
  },
  {
    id: '5',
    user: 'vfxwizard',
    avatar: 'https://i.pravatar.cc/150?img=5',
    title: 'Showreel VFX',
    description: 'Compilado de efectos visuales para pitch de cliente.',
    credits: 300,
    media: [
      { type: 'video', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { type: 'video', uri: 'https://www.w3schools.com/html/movie.mp4' },
    ],
    likes: 301,
    comments: 88,
  },
  {
    id: '6',
    user: 'aurashot',
    avatar: 'https://i.pravatar.cc/150?img=6',
    title: 'Still shots sesión vintage',
    description: 'Estética retro con edición minimalista.',
    credits: 110,
    media: [
      { type: 'image', uri: 'https://picsum.photos/id/1024/600/400' },
    ],
    likes: 67,
    comments: 3,
  },
  {
    id: '7',
    user: 'sneakerlab',
    avatar: 'https://i.pravatar.cc/150?img=7',
    title: 'Campaña Zapatillas F/W',
    description: 'Corte urbano, iluminación natural.',
    credits: 220,
    media: [
      { type: 'image', uri: 'https://picsum.photos/id/1003/600/400' },
      { type: 'video', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    likes: 189,
    comments: 21,
  },
  {
    id: '8',
    user: 'visualbeat',
    avatar: 'https://i.pravatar.cc/150?img=8',
    title: 'Showroom de luces',
    description: 'Video mostrando efectos de iluminación en estudio.',
    credits: 150,
    media: [
      { type: 'video', uri: 'https://www.w3schools.com/html/movie.mp4' },
    ],
    likes: 120,
    comments: 9,
  },
  {
    id: '9',
    user: 'catcontent',
    avatar: 'https://i.pravatar.cc/150?img=9',
    title: 'Mi gato también hace cine',
    description: 'No lo subestimen, dirige mejor que muchos humanos.',
    credits: 10,
    media: [
      { type: 'image', uri: 'https://placekitten.com/600/400' },
    ],
    likes: 999,
    comments: 150,
  },
  {
    id: '10',
    user: 'dronefly',
    avatar: 'https://i.pravatar.cc/150?img=10',
    title: 'Tomas aéreas de la costa',
    description: 'Capturas al atardecer con drone 4K.',
    credits: 180,
    media: [
      { type: 'video', uri: 'https://www.w3schools.com/html/movie.mp4' },
      { type: 'image', uri: 'https://picsum.photos/id/1043/600/400' },
    ],
    likes: 210,
    comments: 19,
  },
];

  return (
    <View className="flex-1 bg-black">
      <View className="absolute top-0 left-0 right-0 z-10 px-4 pt-10 pb-3 bg-gradient-to-b from-black/70 to-transparent">
        <View className="flex-row justify-around items-center">
          <Text className="text-white text-lg font-semibold">Explorar</Text>
          <Text className="text-white text-lg font-semibold">Favoritos</Text>
          <Text className="text-white text-lg font-semibold">Para ti</Text>
          <View className="p-1">
            <Search color="white" size={24} />
          </View>
        </View>
      </View>

      <View className="flex-1" onLayout={(e) => setAvailableHeight(e.nativeEvent.layout.height)}>
        {availableHeight > 0 && (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            snapToInterval={availableHeight}
            decelerationRate="fast"
            renderItem={({ item }) => {
              const isVisible = visiblePostIds.includes(item.id);
              const currentIndex = carouselIndexes[item.id] ?? 0;
              return (
                <View style={{ height: availableHeight }} className="relative">
                  <View style={{ width: screenWidth, height: availableHeight }}>
                    <ScrollView
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      style={{ width: screenWidth, height: availableHeight }}
                      onScroll={(e) => handleScroll(item.id, e.nativeEvent.contentOffset.x)}
                      scrollEventThrottle={16}
                    >
                      {item.media.map((mediaItem, index) => (
                        <View key={index} style={{ width: screenWidth, height: availableHeight }}>
                          {mediaItem.type === 'video' ? (
                            <Video
                              ref={(ref) => {
                                if (ref) videoRefs.current[`${item.id}-${index}`] = ref;
                              }}
                              source={{ uri: mediaItem.uri }}
                              style={{ width: '100%', height: '100%' }}
                              resizeMode={ResizeMode.COVER}
                              isLooping
                              shouldPlay={isVisible}
                              isMuted
                            />
                          ) : (
                            <Image
                              source={{ uri: mediaItem.uri }}
                              style={{ width: '100%', height: '100%' }}
                              resizeMode="cover"
                            />
                          )}
                        </View>
                      ))}
                    </ScrollView>

                    {item.media.length > 1 && (
                      <View className="absolute bottom-56 w-full flex-row justify-center items-center z-20">
                        {item.media.map((_, i) => (
                          <View
                            key={i}
                            className={`w-2 h-2 rounded-full mx-1 ${
                              i === currentIndex ? 'bg-white' : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </View>
                    )}
                  </View>

                  <LinearGradient
                    colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.9)"]}
                    className="absolute bottom-12 left-0 right-0 px-4 py-4 z-10"
                  >
                    <Text className="text-white font-bold text-lg mb-1">{item.title}</Text>
                    <Text className="text-white text-sm mb-2">{item.description}</Text>
                    <View className="flex-row justify-between items-center mb-4">
                      <Text className="text-white text-lg font-bold">💳 {item.credits} créditos</Text>
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
                      source={{ uri: item.avatar }}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <Heart color="white" size={26} />
                    <MessageCircle color="white" size={26} />
                    <Share color="white" size={26} />
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-black py-3 flex-row justify-around border-t border-white/10">
        <Home color="white" size={26} />
        <Layers color="white" size={26} />
        <Plus color="white" size={30} />
        <MessageCircle color="white" size={26} />
        <User color="white" size={26} />
      </View>
    </View>
  );
}
