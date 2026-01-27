import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Animated,
  TouchableOpacity,
  Pressable,
  ScrollView
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

const cartes = [
  {
    id: 1,
    nom: "Alchemist's Greeting",
    cmc: 5,
    img : "https://cards.scryfall.io/normal/front/f/3/f36e2146-b6a9-4b61-9ccf-969a2c79b747.jpg?1736468080"
  },
  {
    id: 2,
    nom: "Ajani, the Greathearted",
    cmc: 4,
    img : "https://cards.scryfall.io/normal/front/6/c/6cc78151-8cb0-4521-9674-fb0c67e24a17.jpg?1582053217"
  },
  {
    id: 3,
    nom: "Abzan Devotee",
    cmc: 2,
    img : "https://cards.scryfall.io/normal/front/6/6/66555946-e747-46fa-b1ac-b103a8edcd93.jpg?1743204231"
  },
  {
    id: 4,
    nom: "Annie Joins Up",
    cmc: 4,
    img : "https://cards.scryfall.io/normal/front/1/6/1624a5f4-f5bc-47c9-85de-c5520ee234ce.jpg?1712356038"
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [expandedId, setExpandedId] = useState(null);
  const [showTitleImage, setShowTitleImage] = useState(false);

  useEffect(() => {
    console.log('App opened');
  }, []);

  console.log('App component rendered');

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => {
        setShowTitleImage(!showTitleImage);
      }}>
        <Text style={styles.title1}>All Scan</Text>
      </Pressable>
      {showTitleImage && (
        <Image source={require('../assets/coucou.jpg')} style={styles.titleImage} />
      )}
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Liste")}>
        <Text style={styles.btnText}>Random Card</Text>
      </TouchableOpacity>
      <FlatList
        data={cartes}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.cardImage}/>
              <View style={{ flex: 1, padding: 12, justifyContent: 'space-between' }}>
                <Text style={styles.text}>{item.nom}</Text>
                <Text style={styles.text}>CMC: {item.cmc}</Text>
              </View>
            </View>
        )}
      />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191f2c',
    padding: 15,
  },
  title1: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 28,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#2a3545',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#444',
  },
  cardImage: {
    width: 80,
    height: 110,
    backgroundColor: '#1a1a1a',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  titleImage: {
    width: '100%',
    height: 300,
    marginVertical: 15,
    borderRadius: 8,
  },
  titleContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
});
