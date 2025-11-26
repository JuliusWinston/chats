import { useState } from "react"
import { View, Text, StyleSheet, Button, TextInput } from "react-native"
import { useSession } from "@/contexts/auth"

import { LOGIN_PAYLOAD } from "@/types"

const LoginScreen = () => {
    const { signIn } = useSession()

    const [msg, setMessage] = useState<string>('')
    const [formData, setFormData] = useState<LOGIN_PAYLOAD>({} as LOGIN_PAYLOAD)

    const handleLogin = () => {
        if (!formData.email.length || !formData.password.length) {
            setMessage('Please provide values for all fields before moving on...')
        } else {
            signIn({ ...formData})
            console.log('routing to tabs')
        }
    }

    return (
        <>
            <View style={[style.container]}>
                <Text>Please provide you credentials to sign in ...</Text>
                {/* {msg.length && <Text style={{color: 'red'}}>{msg}</Text>} */}
                <View style={[style.formGroup]}>
                    <TextInput style={[style.input]} keyboardType="email-address" placeholder="enter email ..." onChangeText={(e) => setFormData(prev => {return {...prev, email: e}})} />
                    <TextInput style={[style.input]} keyboardType="default"  placeholder="enter password ..." onChangeText={(e) => setFormData(prev => {return {...prev, password: e}})} />
                </View>
                <Button title="Continue" onPress={handleLogin} />
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formGroup: {
        width: 350,
        marginVertical: 14,
    },
    input: {
        backgroundColor: '#f7f7f7f7',
        borderRadius: 5,
        marginVertical: 7,
        borderColor: "#dbdbdbff",
        borderWidth: 1
    },
})

export default LoginScreen