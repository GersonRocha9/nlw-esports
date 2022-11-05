import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { styles } from "./styles";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate("game", { id, title, bannerUrl });
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={Logo} style={styles.logo} />

        <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGame(item)} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
