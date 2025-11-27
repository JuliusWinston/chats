import { useState } from "react"

import { View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Text, StyleSheet } from "react-native"
import { useSession } from "@/contexts/auth"
import Header from "@/components/ui/Header"
import MessageBubble from "@/components/ui/Message"


const dummyMessages = [
  {id: "1", text: "Hey!", sent: true},
  {id: "2", text: "Hi! How are you?", sent: false},
  {id: "3", text: "I'm great 🌿", sent: true},
]

const HomeScreen: React.FC = () => {
  const name = "Julius Winston" // get this from route params
  const [input, setInput] = useState("")

  return (
    <>
      <View style={styles.container}>
        <Header title={name} back onBack={() => console.log('Go back')} />

        <FlatList
          data={dummyMessages}
          renderItem={({ item }) => (
            <MessageBubble text={item.text} sent={item.sent} />
          )}
          keyExtractor={(item) => item.id}
          style={styles.messages}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Message ..."
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity>
              <Text style={styles.sendText}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9efea",
  },
  messages: {
    paddingHorizontal: 12,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f3f1",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#238636",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  sendText: {
    color: "#fff",
    fontWeight: "700",
  }
})

export default HomeScreen

