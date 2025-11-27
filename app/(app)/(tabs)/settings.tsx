import { View, Button, StyleSheet } from "react-native"
import { useSession } from "@/contexts/auth"

const SettingsScreen = () => {
    const { signOut } = useSession()

    return (
        <>
            <View style={styles.container}>
                <Button title="Logout" onPress={signOut} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SettingsScreen