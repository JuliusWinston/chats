import { View, Text, StyleSheet } from "react-native"

type MessageBubbleProps = {
    text: string
    sent: boolean
}

const MessageBubble: React.FC<MessageBubbleProps> = ({text, sent}) => {
    return (
        <>
            <View style={[styles.container, sent ? styles.sent : styles.received]}>
                <Text style={[styles.text, sent && styles.sentText]}>{text}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: "80%",
        padding: 12,
        borderRadius: 20,
        marginVertical: 6,
    },
    sent: {
        alignSelf: "flex-end",
        backgroundColor: "#238636",
        borderBottomRightRadius: 5,
    },
    received: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d9d9d9",
        borderBottomLeftRadius: 5,
    },
    text: {
        color: "#111",
    },
    sentText: {
        color: "#fff",
        fontWeight: "500",
    }
})

export default MessageBubble