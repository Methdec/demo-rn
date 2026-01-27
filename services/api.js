// Scryfall API Configuration
const SCRYFALL_API_BASE = 'https://api.scryfall.com'

// Base fetch function with error handling
const fetchFromScryfall = async (endpoint) => {
  try {
    const url = `${SCRYFALL_API_BASE}${endpoint}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Scryfall API Error:', error)
    return { success: false, error: error.message }
  }
}

// Search for cards by name
export const searchCardByName = async (cardName) => {
  const endpoint = `/cards/search?q=${encodeURIComponent(`!"${cardName}"`)}`
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
