import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GameParams } from "../../@types/navigation";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";
import { Heading } from "../../components/Heading";
import { THEME } from "../../theme";
import { styles } from "./styles";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`http://localhost:3333/games/${game.id}/ads`).then((response) => {
      setDuos(response.data);
    });
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  async function getDiscordUser(adsId: string) {
    const response = await axios.get(`http://localhost:3333/ads/${adsId}/discord`);
    const { data } = response;
    setDiscordDuoSelected(data.discord);
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo name="chevron-thin-left" size={20} color={THEME.COLORS.CAPTION_300} onPress={handleGoBack} />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => {
                getDiscordUser(item.id);
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          style={styles.containerList}
          ListEmptyComponent={() => <Text style={styles.emptyListText}>Nenhum anúncio encontrado</Text>}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
