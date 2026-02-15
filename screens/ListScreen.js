import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable
} from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getRandomCard } from '../services/api'
import * as fire from '../fire'
import { Alert, Button } from 'react-native'

export default function ListScreen() {
  const navigation = useNavigation()
  const [cardHistory, setCardHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchRandomCard = async () => {
    setLoading(true)
    try {
      const result = await getRandomCard()
      
      if (result.success) {
        const card = result.data
        
        
        setCardHistory(prev => {
          
          const updated = [card, ...prev]
          return updated.slice(0, 10)
        })
      } else {
        console.error('Erreur lors de la récupération:', result.error)
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCollection = async (card) => {
    try {
      const userId = fire.getCurrentUserUid()
      if (!userId) {
        Alert.alert('Erreur', 'Vous devez être connecté')
        return
      }
      // Store complete card data directly in collection
      await fire.addCollection({ 
        card_id: card.id, 
        user_id: userId, 
        date: new Date(),
        nom: card.name,
        img: card.image_uris?.normal || card.image_uris?.small,
        cmc: card.cmc || 0,
        type_line: card.type_line,
        mana_cost: card.mana_cost
      })
      Alert.alert('Succès', 'Carte ajoutée à votre collection')
    } catch (err) {
      console.error('Erreur ajout collection', err)
      Alert.alert('Erreur', 'Impossible d\'ajouter la carte')
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={fetchRandomCard}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color='white' />
        ) : (
          <Text style={styles.buttonText}>Random Card</Text>
        )}
      </TouchableOpacity>

      <FlatList
        data={cardHistory}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate('Detail', { card: item })
            }}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.image_uris?.normal || item.image_uris?.small }}
                style={styles.cardImage}
              />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.cardSet}>{item.set_name}</Text>
                {item.mana_cost && (
                  <Text style={styles.manaCost}>Coût: {item.mana_cost}</Text>
                )}
                {item.type_line && (
                  <Text style={styles.type} numberOfLines={2}>{item.type_line}</Text>
                )}
                <View style={{ marginTop: 8 }}>
                  <Button title="Ajouter" onPress={() => handleAddToCollection(item)} />
                </View>
              </View>
            </View>
          </Pressable>
        )}
        scrollEnabled={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191f2c',
    padding: 15,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    minHeight: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
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
  cardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardSet: {
    color: '#b0bec5',
    fontSize: 12,
    marginTop: 4,
  },
  manaCost: {
    color: '#ffeb3b',
    fontSize: 12,
    marginTop: 4,
  },
  type: {
    color: '#90caf9',
    fontSize: 11,
    marginTop: 4,
  },
})