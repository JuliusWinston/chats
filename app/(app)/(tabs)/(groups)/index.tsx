import { View, Text, StyleSheet } from "react-native"

const GroupsScreen = () => {
    return (
        <>
            <View style={[style.container]}>
                <Text>Groups Screen</Text>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default GroupsScreen