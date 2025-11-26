import { Stack } from "expo-router"

const AuthLayout = () => {
    <Stack>
         <Stack.Screen name="index" options={{ headerShown: false }} />
         {/* <Stack.Screen name="login" options={{ headerShown: false }} /> */}
         {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
       </Stack>
}

export default AuthLayout