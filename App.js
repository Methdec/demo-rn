import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import ListScreen from './screens/ListScreen'
import DetailScreen from './screens/DetailScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import { useEffect, useState } from 'react'
import { onAuthStateChangedListener } from './fire'

const Stack = createNativeStackNavigator()

export default function App () {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(u => setUser(u))
    return unsubscribe
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Liste' component={ListScreen} />
            <Stack.Screen name='Detail' component={DetailScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
          </>
        ) : (
          <Stack.Screen name='Login' component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}