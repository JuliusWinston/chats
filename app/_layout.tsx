import { StatusBar } from 'expo-status-bar';
import { Slot } from "expo-router";
import { SessionProvider } from "@/contexts/auth";
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const Root = () => {
    return (
        <SessionProvider>
            <SafeAreaView style={styles.safeArea}>
                <Slot />
            </SafeAreaView>
            <StatusBar style="auto" />
        </SessionProvider>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    }
});

export default Root;
