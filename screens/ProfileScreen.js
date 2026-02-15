import React from 'react'
import { View, Text, Button, StyleSheet, Image } from 'react-native'
import * as fire from '../fire'

export default function ProfileScreen() {
  const user = fire.auth.currentUser

  // URL d'une image de profil par défaut (Avatar neutre)
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>

      {/* Affichage simple de l'image par défaut */}
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: defaultAvatar }} 
          style={styles.avatar} 
        />
      </View>

      <Text style={styles.label}>Email :</Text>
      <Text style={styles.value}>{user?.email || '—'}</Text>

      <View style={{ marginTop: 30, width: '100%' }}>
        <Button 
          title="Se déconnecter" 
          onPress={() => fire.signOutUser()} 
          color="#c62828" 
        />
      </View>
      
      <View style={{ marginTop: 10, width: '100%' }}>
        <Button 
          title="Supprimer le compte" 
          onPress={() => {/* Ta fonction deleteUserProfile */}} 
          color="#b71c1c" 
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#191f2c',
    alignItems: 'center'
  },
  title: { 
    fontSize: 24, 
    color: 'white', 
    marginBottom: 20 
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2a3545',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#6200ee'
  },
  avatar: { 
    width: '100%', 
    height: '100%',
    resizeMode: 'cover'
  },
  label: { 
    color: '#b0bec5', 
    fontSize: 12 
  },
  value: { 
    color: 'white', 
    fontSize: 16, 
    marginTop: 6 
  }
})