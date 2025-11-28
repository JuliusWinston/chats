import { useState, useEffect } from "react"
import { useSession } from "@/contexts/auth"
import { View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Text, StyleSheet, ActivityIndicator } from "react-native"
import Header from "@/components/ui/Header"
import MessageBubble from "@/components/ui/Message"
import { Ionicons } from "@expo/vector-icons"
import useApi from "@/hooks/use-api"

const userId = "49d61d72-d72e-46ac-af77-4ca0446ab6ec"

const dummyMessages = [
  {id: "1", text: "Hey!", sent: true},
  {id: "2", text: "Hi! How are you?", sent: false},
  {id: "3", text: "I'm great 🌿", sent: true},
]

type CHAT = {
  id: string,
  groupId: "string",
  sender: {
    id: string,
    username: string
  },
  content: string,
  created: string
}

const HomeScreen: React.FC = () => {
  const { apiFetch } = useApi()
  const {groupId} = useSession()
  const [input, setInput] = useState("")
  const [loadingChats, setLoadingChats] = useState<boolean>(false)
  const [sendingChat, setSendingChat] = useState<boolean>(false)
  const [chats, setChats] = useState<CHAT[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState<string>('')

  const handleSendChat = async() => {
    setSendingChat(true)
    
    try {
      const res = await apiFetch<any>(`/messages/groups/send`, {
        method: "POST",
        body: {
          content: input,
          destination: groupId
        }
      })
      if (res.data) {
        handleFetchChats()
      }
      const data = res.data
      console.log('Data: ', data)
      setChats(data)
    } catch (err) {
      console.warn(err)
    } finally {
      setInput('')
      setSendingChat(false)
    }
  }

  const handleFetchChats = async () => {
    console.log('Fetching chats...')
    setLoadingChats(false)
    
    try {
      const res = await apiFetch<any>(`/messages/${groupId}`)
      const data = res?.data
      console.log('Data: ', data)
      setChats(data)
    } catch (err) {
      console.warn(err)
      setLoadingChats(false)
    } finally {
      setLoadingChats(true)
    }
  }

  useEffect(() => {
    setSelectedGroupId(groupId as string)
  }, [groupId])

  useEffect(() => {
    handleFetchChats();
  }, [selectedGroupId])
  return (
    <>
      <View style={styles.container}>
        <Header title="Chats" />
        {
          // (loadingChats) ? (
          //   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          //     <ActivityIndicator color="#238636"/>
          //   </View>
          // ) : (
            
          // )
          <FlatList
            data={chats}
            renderItem={({ item }) => (
              <MessageBubble text={item.content} sent={item.sender.id === userId} />
            )}
            ListEmptyComponent={() => (
              <View style={{paddingVertical: 20, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Chat not found ...</Text>
              </View>
            )}
            keyExtractor={(item) => item?.id}
            style={styles.messages}
          />
        }

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
            <TouchableOpacity style={styles.sendButton} onPress={handleSendChat}>
              {sendingChat ? <ActivityIndicator size={22} color="white" /> : <Ionicons name="paper-plane" color="white" size={22} />} 
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
  }
})

export default HomeScreen
