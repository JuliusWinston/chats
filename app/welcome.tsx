import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const WelcomeScreen = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Group One</Text>
                <Text style={styles.subtitle}>Chat • App • Demo</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log('Navigate to home/login')}
                >
                    <Text style={styles.buttonText}>Welcome</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#238636",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    title: {
        color: "#fff",
        fontSize: 42,
        fontWeight: "800",
        marginBottom: 10,
    },
    subtitle: {
        color: "#d8ffe3",
        fontSize: 18,
        marginBottom: 40,
    },
    button: {
        backgroundColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#238636"
    }
})

export default WelcomeScreen