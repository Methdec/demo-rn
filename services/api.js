// Scryfall API Configuration
const SCRYFALL_API_BASE = 'https://api.scryfall.com'

// Base fetch function with error handling
const fetchFromScryfall = async (endpoint) => {
  try {
    const url = `${SCRYFALL_API_BASE}${endpoint}`
    const response = await fetch(url)
    
    // Scryfall renvoie souvent un 404 si aucune carte n'est trouvée
    // On gère cela pour éviter de lancer une exception "Error"
    if (!response.ok) {
      const errorData = await response.json()
      return { 
        success: false, 
        error: errorData.details || `Erreur: ${response.status}`,
        code: response.status 
      }
    }
    
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Scryfall API Error:', error)
    return { success: false, error: error.message }
  }
}

// RECHERCHE PAR NOM (Mise à jour pour SearchScreen)
// On enlève le ! et les guillemets pour permettre une recherche plus large
export const searchCardsByName = async (cardName) => {
  const endpoint = `/cards/search?q=${encodeURIComponent(cardName)}`
  return fetchFromScryfall(endpoint)
}

// Recherche exacte (Gardée pour des besoins spécifiques)
export const getExactCardByName = async (cardName) => {
  const endpoint = `/cards/named?exact=${encodeURIComponent(cardName)}`
  return fetchFromScryfall(endpoint)
}

// Search cards with custom query
export const searchCards = async (query) => {
  const endpoint = `/cards/search?q=${encodeURIComponent(query)}`
  return fetchFromScryfall(endpoint)
}

// Get a random card
export const getRandomCard = async () => {
  const endpoint = '/cards/random'
  return fetchFromScryfall(endpoint)
}

// Get card by ID
export const getCardById = async (id) => {
  const endpoint = `/cards/${id}`
  return fetchFromScryfall(endpoint)
}

// Get all sets
export const getAllSets = async () => {
  const endpoint = '/sets'
  return fetchFromScryfall(endpoint)
}

// Get cards by set code
export const getCardsBySet = async (setCode) => {
  const endpoint = `/cards/search?q=set:${encodeURIComponent(setCode)}`
  return fetchFromScryfall(endpoint)
}