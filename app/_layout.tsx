import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Slot } from "expo-router";
import { SessionProvider } from "@/contexts/auth";
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';

const Root = () => {
    const colorScheme = useColorScheme();

    return (
        <SessionProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <SafeAreaView style={styles.safeArea}>
                    <Slot />
                </SafeAreaView>
                <StatusBar style="auto" />
            </ThemeProvider>
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
