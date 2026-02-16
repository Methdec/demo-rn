import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Vibration } from 'react-native'
import * as fire from '../fire'

export default function ProfileScreen() {
  const user = fire.auth.currentUser
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(user?.displayName || '')
  
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

  const handleSave = async () => {
    try {
      await fire.updateUserProfile(newName)
      setIsEditing(false)
      Alert.alert("Succès", "Profil mis à jour")
    } catch (err) {
      Alert.alert("Erreur", "Impossible de modifier le nom")
    }
  }

  const handleDeleteAccount = () => {
    Vibration.vibrate(150);

    Alert.alert(
      "Suppression définitive",
      "Es-tu sûr de vouloir supprimer ton compte ? Toutes tes cartes seront perdues.",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "SUPPRIMER MON COMPTE", 
          style: "destructive", 
          onPress: async () => {
            try {
              await fire.deleteUserProfile()
              Vibration.vibrate([0, 100, 50, 100]); 
            } catch (err) {
              Alert.alert("Erreur", "Impossible de supprimer le compte.")
            }
          } 
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>

      <View style={styles.avatarContainer}>
        <Image source={{ uri: defaultAvatar }} style={styles.avatar} />
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>NOM D'UTILISATEUR</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
            placeholder="Ton pseudo..."
            placeholderTextColor="#999"
            autoFocus
          />
        ) : (
          <Text style={styles.value}>{user?.displayName || 'Non défini'}</Text>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>EMAIL</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.btnText}>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
            <Text style={styles.btnText}>Modifier le pseudo</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => fire.signOutUser()}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>Supprimer le compte définitivement</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#191f2c', alignItems: 'center' },
  title: { fontSize: 26, color: 'white', fontWeight: 'bold', marginBottom: 30, marginTop: 20 },
  avatarContainer: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: '#2a3545',
    justifyContent: 'center', alignItems: 'center', marginBottom: 30,
    borderWidth: 2, borderColor: '#6200ee', overflow: 'hidden'
  },
  avatar: { width: '100%', height: '100%' },
  infoSection: { width: '100%', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#2a3545', paddingBottom: 10 },
  label: { color: '#6200ee', fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  value: { color: 'white', fontSize: 18 },
  input: { color: 'white', fontSize: 18, backgroundColor: '#2a3545', borderRadius: 8, padding: 10 },
  buttonContainer: { width: '100%', marginTop: 20 },
  editBtn: { backgroundColor: '#6200ee', padding: 15, borderRadius: 10, alignItems: 'center' },
  saveBtn: { backgroundColor: '#4caf50', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  cancelBtn: { padding: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  cancelText: { color: '#b0bec5', textDecorationLine: 'underline' },
  footer: { width: '100%', marginTop: 'auto', marginBottom: 10 },
  logoutBtn: { backgroundColor: '#c62828', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  logoutText: { color: 'white', fontWeight: 'bold' },
  deleteBtn: { padding: 10, alignItems: 'center' },
  deleteText: { color: '#ff5252', fontSize: 12, opacity: 0.8, textDecorationLine: 'underline' }
})