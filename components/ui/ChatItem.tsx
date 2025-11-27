import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

type ChatItemProps = {
    name: string
    lastMessage: string
    time: string
    onPress: () => void
}

const ChatItem = ({name, lastMessage, time, onPress}: ChatItemProps) => {
    return (
        <>
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <View style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.lastMessage}>{lastMessage}</Text>
                </View>
                <Text style={styles.time}>{time}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#238636",
        opacity: 0.2,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
    },
    lastMessage: {
        color: "#6b6b6b",
        marginTop: 2,
    },
    time: {
        color: "#999",
        fontSize: 12,
    }
})
export default ChatItem