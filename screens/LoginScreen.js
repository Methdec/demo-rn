import React, { useState } from 'react'
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native'
import * as fire from '../fire'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await fire.signIn(email, password)
    } catch (err) {
      setError(fire.mapAuthErrorToMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await fire.signUp(email, password)
    } catch (err) {
      setError(fire.mapAuthErrorToMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>Random Magic</Text>
          
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={(text) => { setEmail(text); setError(''); }}
              autoCapitalize='none'
              keyboardType='email-address'
            />
            
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor="#999"
              value={password}
              onChangeText={(text) => { setPassword(text); setError(''); }}
              secureTextEntry
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {loading ? (
              <ActivityIndicator color="#6200ee" size="large" style={{ marginTop: 20 }} />
            ) : (
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.mainBtn} onPress={handleSignIn}>
                  <Text style={styles.btnText}>Se connecter</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.secondaryBtn} onPress={handleSignUp}>
                  <Text style={styles.secondaryBtnText}>Créer un compte</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191f2c'
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-end', 
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 40
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16
  },
  errorText: {
    color: '#ff5252',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  buttonGroup: {
    marginTop: 10
  },
  mainBtn: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  secondaryBtn: {
    padding: 10,
    alignItems: 'center'
  },
  secondaryBtnText: {
    color: '#b0bec5',
    fontSize: 14,
    textDecorationLine: 'underline'
  }
})