import { useState } from "react"
import { useRouter } from "expo-router"
import { View, Text, StyleSheet, Button } from "react-native"
import { useSession } from "@/contexts/auth"

const RegistrationScreen = () => {
    const router = useRouter()
    const { signIn } = useSession()

    return (
        <>
            <View style={[style.container]}>
                <Text>Login Screen</Text>
                <Button title="Continue" onPress={() => router.navigate("/(tabs)")} />

                {/* <form onSubmit={(e) => e.preventDefault()}>

                </form> */}
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // 'form-group': {

    // }
})

export default RegistrationScreen