import { Stack } from "expo-router"

const GroupLayout = () => {
    return (
        <Stack>
         <Stack.Screen name="index" options={{ headerShown: false }} />
       </Stack>
    )
}

export default GroupLayout