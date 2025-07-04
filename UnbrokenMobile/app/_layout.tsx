import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import 'react-native-reanimated';
import DatabaseProvider from '@/providers/DatabaseProvider';
import { LogisticsOptionsProvider } from '@/providers/LogisticsOptionsProvider';
import {useColorScheme} from '@/hooks/useColorScheme';
import { AuthProvider } from '@/providers/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync().then();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <DatabaseProvider>
                <LogisticsOptionsProvider>
                    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                            <Stack.Screen name="logistics/[id]" options={{headerShown: false}}/>
                        </Stack>
                    </ThemeProvider>
                </LogisticsOptionsProvider>
            </DatabaseProvider>
        </AuthProvider>
    );
}
