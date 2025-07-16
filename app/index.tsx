
import { BottomTabBar } from "components/BottomTabBar";
import { HeaderTabs } from "components/HeaderTabs";
import { PostCard } from "components/PostCard";
import { useVisiblePosts } from "hooks/useVisiblePosts";
import React, { useState } from "react";
import { useWindowDimensions, View, FlatList , Text} from "react-native";
import { Post } from "types/post";


export default function Index() {

  

  

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



 const [availableHeight, setAvailableHeight] = useState(0);
  const { visiblePostIds, onViewableItemsChanged } = useVisiblePosts();
  const screenWidth = useWindowDimensions().width;

  return (
    <View className="flex-1 bg-black">
      <HeaderTabs />

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
            renderItem={({ item }) => (
              <PostCard
                post={item}
                isVisible={visiblePostIds.includes(item.id)}
                availableHeight={availableHeight}
                screenWidth={screenWidth}
              />
            )}
          />
        )}
      </View>

      <BottomTabBar />
    </View>
  );

}
