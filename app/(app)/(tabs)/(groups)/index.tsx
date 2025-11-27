// import 
// import { View, Text, StyleSheet } from "react-native"

// const GroupsScreen = () => {
//     return (
//         <>
//             <View style={[style.container]}>
//                 <Text>Groups Screen</Text>
//             </View>
//         </>
//     )
// }

// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })

// export default GroupsScreen


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/ui/Header";
import GroupScreen from "./[id]";

const dummyGroups = [
  { id: "1", name: "Developers Hub", members: 124 },
  { id: "2", name: "Family ❤️", members: 8 },
  { id: "3", name: "Work Team", members: 17 },
  { id: "4", name: "Gym Buddies", members: 12 },
];

const GroupsScreen = () => {
  const [search, setSearch] = useState("");

  const filtered = dummyGroups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

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
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupItem}
            // onPress={() => navigation.navigate("GroupChat", { name: item.name })}
            onPress={() => console.log('go to single group')}
          >
            <View style={styles.groupIcon}>
              <Ionicons name="people" size={24} color="#fff" />
            </View>

            <View style={styles.groupText}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupMembers}>{item.members} members</Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#bbb" />
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={34} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F5",
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
});

export default GroupsScreen