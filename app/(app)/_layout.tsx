// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="login" options={{ headerShown: false }} />
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }


import { Text } from 'react-native'
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