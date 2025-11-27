// import { useState } from "react"
// import { View, Text, StyleSheet, Button, TextInput } from "react-native"
// import { useSession } from "@/contexts/auth"

// import { LOGIN_PAYLOAD } from "@/types"

// const LoginScreen = () => {
//     const { signIn } = useSession()

//     const [msg, setMessage] = useState<string>('')
//     const [formData, setFormData] = useState<LOGIN_PAYLOAD>({} as LOGIN_PAYLOAD)

//     const handleLogin = () => {
//         if (!formData.email.length || !formData.password.length) {
//             setMessage('Please provide values for all fields before moving on...')
//         } else {
//             signIn({ ...formData})
//             console.log('routing to tabs')
//         }
//     }

//     return (
//         <>
//             <View style={[style.container]}>
//                 <Text>Please provide you credentials to sign in ...</Text>
//                 {/* {msg.length && <Text style={{color: 'red'}}>{msg}</Text>} */}
//                 <View style={[style.formGroup]}>
//                     <TextInput style={[style.input]} keyboardType="email-address" placeholder="enter email ..." onChangeText={(e) => setFormData(prev => {return {...prev, email: e}})} />
//                     <TextInput style={[style.input]} keyboardType="default"  placeholder="enter password ..." onChangeText={(e) => setFormData(prev => {return {...prev, password: e}})} />
//                 </View>
//                 <Button title="Continue" onPress={handleLogin} />
//             </View>
//         </>
//     )
// }

// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     formGroup: {
//         width: 350,
//         marginVertical: 14,
//     },
//     input: {
//         backgroundColor: '#f7f7f7f7',
//         borderRadius: 5,
//         marginVertical: 7,
//         borderColor: "#dbdbdbff",
//         borderWidth: 1
//     },
// })

// export default LoginScreen

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSession } from "@/contexts/auth";

import { LOGIN_PAYLOAD } from "@/types";

const LoginScreen = () => {
  const { signIn } = useSession();

  const [msg, setMessage] = useState("");
  const [formData, setFormData] = useState<LOGIN_PAYLOAD>(
    {} as LOGIN_PAYLOAD
  );

  const handleLogin = () => {
    if (!formData.email?.length || !formData.password?.length) {
      setMessage("Please fill in all fields.");
    } else {
      setMessage("");
      signIn({ ...formData });
      console.log("routing to tabs");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>W • A • M • B</Text>
        <Text style={styles.subtitle}>
          Please enter your credentials to sign in
        </Text>

        {msg.length > 0 && <Text style={styles.error}>{msg}</Text>}

        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            keyboardType="email-address"
            onChangeText={(e) =>
              setFormData((prev) => ({ ...prev, email: e }))
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(e) =>
              setFormData((prev) => ({ ...prev, password: e }))
            }
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F6F3",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#238636",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  error: {
    backgroundColor: "#ffefef",
    color: "#c62828",
    padding: 8,
    borderRadius: 6,
    textAlign: "center",
    marginBottom: 14,
    fontSize: 14,
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

  button: {
    backgroundColor: "#238636",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default LoginScreen;
