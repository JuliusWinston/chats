import { Redirect, Stack } from 'expo-router'
import WelcomeScreen from '../welcome'

import { useSession } from '@/contexts/auth'

const AppLayout = () => {
  const { session, isLoading } = useSession()

  // Loading or splash screen
  if (isLoading) {
    return <WelcomeScreen />
  }

  // Only requre authentication within the (app) group's layout
  if (!session) {
    return <Redirect href="/sign-in" />
  }

  // This layout can be deferred because it's not the root layout
  return <Stack screenOptions={{ headerShown: false }} />
}

export default AppLayout