import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type HeaderProps = {
    title: string
    back?: any
    onBack?: () => void
}

const Header = ({title, back, onBack}: HeaderProps) => {
    return (
        <>
            <View style={styles.header}>
                {
                    back ? (
                        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                            <Ionicons name="arrow-back" size={24} color="#238636" />
                        </TouchableOpacity>
                    ) : (
                        <View style={{width: 30}} />
                    )
                }

                <Text style={styles.title}>{title}</Text>
                <View style={{width: 30}} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e1e1e1",
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "#111",
    },
    backBtn: {
        width: 30,
    }
})

export default Header