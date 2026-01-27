import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

export default function DetailScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const card = route.params?.card

  if (!card) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Aucune carte sélectionnée</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: card.image_uris?.normal || card.image_uris?.small }}
          style={styles.cardImage}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{card.name}</Text>

        {card.mana_cost && (
          <View style={styles.section}>
            <Text style={styles.label}>Coût de mana:</Text>
            <Text style={styles.value}>{card.mana_cost}</Text>
          </View>
        )}

        {card.type_line && (
          <View style={styles.section}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{card.type_line}</Text>
          </View>
        )}

        {card.oracle_text && (
          <View style={styles.section}>
            <Text style={styles.label}>Texte:</Text>
            <Text style={styles.description}>{card.oracle_text}</Text>
          </View>
        )}

        {card.power && card.toughness && (
          <View style={styles.section}>
            <Text style={styles.label}>Force/Endurance:</Text>
            <Text style={styles.value}>{card.power}/{card.toughness}</Text>
          </View>
        )}

        {card.cmc && (
          <View style={styles.section}>
            <Text style={styles.label}>CMC:</Text>
            <Text style={styles.value}>{card.cmc}</Text>
          </View>
        )}

        {card.set_name && (
          <View style={styles.section}>
            <Text style={styles.label}>Set:</Text>
            <Text style={styles.value}>{card.set_name}</Text>
          </View>
        )}

        {card.rarity && (
          <View style={styles.section}>
            <Text style={styles.label}>Rareté:</Text>
            <Text style={styles.value}>{card.rarity}</Text>
          </View>
        )}

        {card.artist && (
          <View style={styles.section}>
            <Text style={styles.label}>Artiste:</Text>
            <Text style={styles.value}>{card.artist}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191f2c',
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  cardImage: {
    width: 250,
    height: 350,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 12,
  },
  label: {
    color: '#b0bec5',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  value: {
    color: 'white',
    fontSize: 14,
  },
  description: {
    color: '#e0e0e0',
    fontSize: 13,
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
})