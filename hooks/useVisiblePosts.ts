import { useState, useRef } from "react";
import type { ViewToken } from "react-native";

export function useVisiblePosts() {
  const [visiblePostIds, setVisiblePostIds] = useState<string[]>([]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const ids = viewableItems.map((item) => item.item?.id).filter(Boolean);
      setVisiblePostIds(ids);
    }
  ).current;

  return { visiblePostIds, onViewableItemsChanged };
}
