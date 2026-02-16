import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  Pressable, 
  Alert,
  Button 
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { searchCardsByName } from '../services/api';
import * as fire from '../fire';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const result = await searchCardsByName(query);
    
    if (result.success) {
      setResults(result.data.data || []); 
    } else {
      Alert.alert("Recherche", result.error);
      setResults([]);
    }
    setLoading(false);
  };

  const handleAddToCollection = async (card) => {
    try {
      const userId = fire.getCurrentUserUid();
      if (!userId) {
        Alert.alert('Erreur', 'Vous devez être connecté');
        return;
      }
      await fire.addCollection({ 
        card_id: card.id, 
        user_id: userId, 
        date: new Date(),
        nom: card.name,
        img: card.image_uris?.normal || card.image_uris?.small,
        cmc: card.cmc || 0,
        type_line: card.type_line,
        mana_cost: card.mana_cost
      });
      Alert.alert('Succès', 'Carte ajoutée à votre collection');
    } catch (err) {
      console.error('Erreur ajout collection', err);
      Alert.alert('Erreur', 'Impossible d\'ajouter la carte');
    }
  };

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Nom de la carte..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.searchBtn} 
          onPress={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.btnText}>Chercher</Text>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable 
            onPress={() => navigation.navigate('Detail', { card: item })}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.image_uris?.normal || item.image_uris?.small }}
                style={styles.cardImage}
              />
              <View style={styles.cardInfo}>
                <View>
                  <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.cardSet}>{item.set_name}</Text>
                  {item.mana_cost && (
                    <Text style={styles.manaCost}>Coût: {item.mana_cost}</Text>
                  )}
                  {item.type_line && (
                    <Text style={styles.type} numberOfLines={2}>{item.type_line}</Text>
                  )}
                </View>
                
                <View style={{ marginTop: 8 }}>
                  <Button 
                    title="Ajouter" 
                    onPress={() => handleAddToCollection(item)} 
                  />
                </View>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          !loading && query !== '' ? (
            <Text style={styles.emptyText}>Aucun résultat trouvé pour "{query}"</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191f2c',
    padding: 15,
  },
  searchSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: { 
    flex: 1, 
    backgroundColor: 'white', 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    height: 50, 
    fontSize: 16,
    color: '#000'
  },
  searchBtn: { 
    backgroundColor: '#6200ee', 
    marginLeft: 10, 
    borderRadius: 8, 
    paddingHorizontal: 20, 
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100
  },
  btnText: { 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 14
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
  emptyText: {
    color: '#b0bec5',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic'
  }
});