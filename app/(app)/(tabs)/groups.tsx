import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Switch,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/ui/Header";
import useApi from "@/hooks/use-api";
import { useStorageState } from "@/hooks/use-storage";
import { useRouter } from "expo-router";
import { useSession } from "@/contexts/auth";

const dummyGroups = [
  { id: "1", name: "Developers Hub", members: 124 },
  { id: "2", name: "Family ❤️", members: 8 },
  { id: "3", name: "Work Team", members: 17 },
  { id: "4", name: "Gym Buddies", members: 12 },
];

// const userId = "73ed3bc4-64d5-470b-bba7-9660b41fbac8"
const userId = "49d61d72-d72e-46ac-af77-4ca0446ab6ec"

type GROUP = {
  id: string
  groupName: string
  ownerId: string
  created: string
  type: string
  members_count: number
}

type GROUPS_RESPONSE = {
  message: string
  data: GROUP[]
}

type GROUP_PAYLOAD = {
  groupName: string
  isPrivate: boolean
  membersToAdd: string[]
}

type CREATE_GROUP_RESPONSE = {
  message: string
  data: {
    id: string
    groupName: string
    ownerId: string
    members_count: number
    created: string
    type: string
  }
}

const GroupsScreen = () => {
  const router = useRouter()
  const { selectGroup } = useSession()

  const {apiFetch} = useApi()
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState<GROUP[]>([] as GROUP[])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [[isLoading, session], setSession] = useStorageState('session')

  const [isCreatingGroup, setIsCreatingGroup] = useState<boolean>(false)
  const [groupPayload, setGroupPayload] = useState<GROUP_PAYLOAD>({} as GROUP_PAYLOAD)

  const filtered = groups?.filter((g) =>
    g.groupName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  const handleGetGroups = async () => {
    setLoading(true)

    try {
      const res = await apiFetch<GROUPS_RESPONSE>(`/groups/${userId}/joined`)
      const data: GROUP[] = res?.data as GROUP[]
      setGroups(data)
    } catch (err) {
      console.warn("JSON parse failed:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleGetCreateGroup = async () => {
    setIsCreatingGroup(true)

    try {
      console.log('creating group')
      const res = await apiFetch<CREATE_GROUP_RESPONSE>("/groups/", {
        method: 'POST',
        body: { ...groupPayload, membersToAdd: []}
      })
      const data: CREATE_GROUP_RESPONSE = res as CREATE_GROUP_RESPONSE
      console.log('Response: ', res)

      if (data?.message.toLowerCase() === "created") {
        console.log('Successfully created group')
        await handleGetGroups()
      }
    } catch (err) {
      console.warn(err)
    } finally {
      setIsCreatingGroup(false)
      setShowModal(false)
      setGroupPayload({} as GROUP_PAYLOAD)
    }
  }

  const goToChats = (id: string) => {
    console.log('go to chat: ', id)
    selectGroup(id)
    router.replace('/')
  }

  useEffect(() => {
    if (isLoading && !session) {
      setLoading(true)
    } else {
      handleGetGroups()
    }

  }, [isLoading, session])

  useEffect(() => {
    setGroupPayload((prev) => {
      return {...prev, isPrivate: isEnabled}
    })
  }, [isEnabled])

  useEffect(() => {
    if (groups?.length) {
      selectGroup(groups[0].id)
    }

  }, [groups])
  return (
    <View style={styles.container}>
      <Header title="Groups" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          placeholder="Search groups..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Group List */}
      {
        (loading && !groups?.length) ? (
          <View style={[styles.container, styles.center]}>
            <ActivityIndicator color={"#238636"} size="large" />
          </View>
        ) : (
          <>
            {
              (isCreatingGroup && loading) && (
                <TouchableOpacity
                  style={styles.groupItem}
                >
                  <View style={styles.groupIcon}>
                    <Ionicons name="people" size={24} color="#fff" />
                  </View>

                  <View style={styles.groupText}>
                    <Text style={styles.groupName}></Text>
                    <Text style={styles.groupMembers}>Fetching new group ...</Text>
                  </View>

                  <ActivityIndicator color={"#238636"} />
                </TouchableOpacity>
              )
            }
            
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.groupItem}
                  onPress={() => goToChats(item.id)}
                >
                  <View style={styles.groupIcon}>
                    <Ionicons name="people" size={24} color="#fff" />
                  </View>

                  <View style={styles.groupText}>
                    <Text style={styles.groupName}>{item.groupName}</Text>
                    <Text style={styles.groupMembers}>{item.members_count} member(s)</Text>
                  </View>

                  <Ionicons name="chevron-forward" size={22} color="#bbb" />
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <View style={[styles.container, styles.center]}>
                  <Text>Group(s) not found</Text>
                </View>
              )}
            />
          </>
        )
      }

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(prev => !prev)}>
        <Ionicons name="add" size={34} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
      >
          <View style={[styles.modalContainer, styles.center]}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={[styles.button, {alignSelf: "flex-end"}]}
                onPress={() => setShowModal(prev => !prev)}>
                <Ionicons name="close-circle" color="#238636" size={32} />
              </TouchableOpacity>

              <View style={styles.card}>
                <Text style={styles.subtitle}>
                  Please enter your credentials to sign in
                </Text>
      
                <View style={styles.formGroup}>
                  <TextInput
                    style={styles.input}
                    placeholder="Group name"
                    onChangeText={(e) =>
                      setGroupPayload((prev) => ({ ...prev, groupName: e }))
                    }
                  />
      
                  <View style={{flexDirection: "row", alignItems: "center" }}>
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={isEnabled ? '#238636' : '#f4f3f4'}
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                    <Text style={{fontSize: 14, fontWeight: '500'}}>Is Private Group</Text>
                  </View>
                </View>     
      
                <TouchableOpacity style={styles.btn} onPress={handleGetCreateGroup}>
                  {!isCreatingGroup ? (<Text style={styles.buttonText}>Continue</Text>) : 
                  (<ActivityIndicator size="small" color="white" />)}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F5",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderColor: "#e5e5e5",
    borderWidth: 1,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  groupIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#238636",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  groupText: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  groupMembers: {
    fontSize: 13,
    color: "#6b6b6b",
    marginTop: 2,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 25,
    backgroundColor: "#238636",
    width: 65,
    height: 65,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#238636",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#ffffffff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    display: 'flex',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: "#238636",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  form: {
    flex: 1,
    backgroundColor: "#979696ff",
  },
  formGroup: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F7F7F7",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    fontSize: 16,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    marginTop: 65,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default GroupsScreen

// 49d61d72-d72e-46ac-af77-4ca0446ab6ec
// eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5hZ2VyQG1hbGxvbi5jaGF0Iiwicm9sZSI6Ik1BTkFHRVIiLCJpYXQiOjE3NjQzMTU0MTAsImV4cCI6MTc2NDQwMTgxMH0.0lSWK0uoGo09JXgjyEogS4XYpvGUtxKK9g-hVC8jJn0