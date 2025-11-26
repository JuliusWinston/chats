import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Slot } from "expo-router";
import { SessionProvider } from "@/contexts/auth";

import { useColorScheme } from '@/hooks/use-color-scheme';

const Root = () => {
    const colorScheme = useColorScheme();

    return (
        <SessionProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Slot />
                <StatusBar style="auto" />
            </ThemeProvider>
        </SessionProvider>
    )
}

export default Root
