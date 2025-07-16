import { View, Text, TouchableOpacity } from "react-native";
import { Search } from "lucide-react-native";

export function HeaderTabs() {
  return (
    <View className="absolute top-0 left-0 right-0 z-10 px-4 pt-10 pb-3 bg-gradient-to-b from-black/70 to-transparent">
      <View className="flex-row justify-around items-center">
        <Text className="text-white text-lg font-semibold">Explorar</Text>
        <Text className="text-white text-lg font-semibold">Favoritos</Text>
        <Text className="text-white text-lg font-semibold">Para ti</Text>
        <TouchableOpacity className="p-1">
          <Search color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
