import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeStyles } from './styles';
import { useNavigation } from "@react-navigation/native";
import { PublicStackParamList } from "@interfaces/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useEffect, useMemo } from 'react';
import { getLaunchCount } from "@services/appStats";
import { observer } from 'mobx-react-lite';
import { useTheme } from "@hooks/useTheme";

type WelcomeNavProp = NativeStackNavigationProp<PublicStackParamList, 'Welcome'>

function WelcomeScreen() {
    const navigation = useNavigation<WelcomeNavProp>();
    const [launchCount, setLaunchCount] = useState<number | null>(null);
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const handleGoToLogin = () => {
        navigation.navigate('Login');
    }

    useEffect(() => {
        getLaunchCount().then(setLaunchCount);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.runs}>
                Number of runs: {launchCount !== null ? launchCount : '...'}
            </Text>
            <Pressable style={styles.button} onPress={handleGoToLogin}>
                <Text>Go to Login</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default observer(WelcomeScreen);
