import { useRouter, useLocalSearchParams } from "expo-router"
import { View, Text, StyleSheet } from "react-native"

const GroupScreen = () => {
    const router = useRouter()
    
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

export default GroupScreen