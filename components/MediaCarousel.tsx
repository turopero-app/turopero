import { View, ScrollView, Image, Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";

import { useRef } from "react";
import { MediaItem } from "types/post";

type Props = {
  media: MediaItem[];
  postId: string;
  isVisible: boolean;
  screenWidth: number;
  screenHeight: number;
  onScroll: (offsetX: number) => void;
  currentIndex: number;
};

export function MediaCarousel({
  media,
  postId,
  isVisible,
  screenWidth,
  screenHeight,
  onScroll,
  currentIndex,
}: Props) {
  const videoRefs = useRef<Record<string, Video | null>>({});

  return (
    <>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: screenWidth, height: screenHeight }}
        onScroll={(e) => onScroll(e.nativeEvent.contentOffset.x)}
        scrollEventThrottle={16}
      >
        {media.map((mediaItem, index) => (
          <View key={index} style={{ width: screenWidth, height: screenHeight }}>
            {mediaItem.type === "video" ? (
              <Video
                ref={(ref) => {
                  if (ref) videoRefs.current[`${postId}-${index}`] = ref;
                }}
                source={{ uri: mediaItem.uri }}
                style={{ width: "100%", height: "100%" }}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay={isVisible}
                isMuted
              />
            ) : (
              <Image
                source={{ uri: mediaItem.uri }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            )}
          </View>
        ))}
      </ScrollView>

      {media.length > 1 && (
        <View className="absolute bottom-56 w-full flex-row justify-center items-center z-20">
          {media.map((_, i) => (
            <View
              key={i}
              className={`w-2 h-2 rounded-full mx-1 ${
                i === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </View>
      )}
    </>
  );
}
