import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Alert,
  Vibration
} from 'react-native'
import { useEffect, useState } from 'react'
import * as fire from '../fire'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const navigation = useNavigation();
  const [showTitleImage, setShowTitleImage] = useState(false);
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = fire.getCurrentUserUid()
    if (!userId) {
      setLoading(false)
      return
    }

    const unsubscribe = fire.getUserCards(userId, posts => {
      setCards(posts)
      setLoading(false)
    })

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    }
  }, [])

  const handleDeleteCard = (item) => {
    Vibration.vibrate(100);

    Alert.alert(
      "Supprimer la carte",
      `Voulez-vous vraiment retirer "${item.nom}" de votre collection ?`,
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Supprimer", 
          style: "destructive", 
          onPress: async () => {
            try {
              await fire.removeFromCollection(item.id);
              Vibration.vibrate(50);
            } catch (err) {
              Alert.alert("Erreur", "Impossible de supprimer la carte.");
            }
          } 
        }
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => setShowTitleImage(!showTitleImage)}>
        <Text style={styles.title1}>All Scan</Text>
      </Pressable>
      
      {showTitleImage && (
        <Image source={require('../assets/coucou.jpg')} style={styles.titleImage} />
      )}
      
      <TouchableOpacity 
        activeOpacity={0.7} 
        style={styles.btn} 
        onPress={() => navigation.navigate("Liste")}
      >
        <Text style={styles.btnText}>Random Card</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        activeOpacity={0.7}
        style={[styles.btn, { backgroundColor: '#444', marginBottom: 25 }]} 
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.btnText}>Mon profil</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Ma Collection ({cards.length})</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.card}
                onPress={() => {
                  const cardData = {
                    ...item,
                    name: item.nom,
                    image_uris: { normal: item.img }
                  }
                  navigation.navigate('Detail', { card: cardData })
                }}
              >
                <Image source={{ uri: item.img }} style={styles.cardImage}/>
                <View style={styles.cardContent}>
                  <View>
                    <Text style={styles.textNom} numberOfLines={1}>{item.nom}</Text>
                    <Text style={styles.textCmc}>CMC: {item.cmc}</Text>
                    <Text style={styles.textType} numberOfLines={1}>{item.type_line}</Text>
                  </View>

                  {/* Bouton de suppression stylisé */}
                  <TouchableOpacity 
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteCard(item)}
                  >
                    <Text style={styles.deleteBtnText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aucune carte dans votre collection.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191f2c',
    paddingHorizontal: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    paddingTop: 20,
  },
  title1: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  btn: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#2a3545',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3d4b5f',
    elevation: 2,
  },
  cardImage: {
    width: 90,
    height: 125,
    backgroundColor: '#1a1a1a',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  textNom: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  textCmc: {
    color: '#ffeb3b',
    fontSize: 13,
    fontWeight: '600',
  },
  textType: {
    color: '#b0bec5',
    fontSize: 12,
    marginTop: 4,
  },
  deleteBtn: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ff5252',
  },
  deleteBtnText: {
    color: '#ff5252',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  titleImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  emptyText: {
    color: '#b0bec5',
    textAlign: 'center',
    marginTop: 50,
    fontStyle: 'italic',
  }
});