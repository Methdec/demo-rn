import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import { useState } from 'react';

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
  }
];

export default function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <View style={styles.container}>
      {selectedImg ? (
        <Pressable onPress={() => setSelectedImg(null)}>
          <Image source={{ uri: selectedImg }} style={styles.cardImage} />
        </Pressable>
      ) : (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>All Scan</Text>
          </View>
          <FlatList
            data={cartes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => setSelectedImg(item.img)}>
                <View style={styles.card}>
                  <Text style={styles.text}>{item.nom}</Text>
                  <Text style={styles.text}>CMC: {item.cmc}</Text>
                </View>
              </Pressable>
            )}
          />
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191f2c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  card: {
    color: '#fff',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 300,
  },
  text: {
    color: 'white',
  },
  cardImage: {
    width: 300,
    height: 400,
  },
});
