
import { StatusBar, View, StyleSheet } from 'react-native';
import { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { PrivateStackParamList } from "@interfaces/navigation";
import { useRoute, RouteProp } from '@react-navigation/native';
import { clearSession } from '@services/session';
import { replace } from '@navigation/navigationUtils';
import { makeStyles } from './styles';
import Profile from '@components/Profile';
import { useTheme } from '@hooks/useTheme';
import { observer } from 'mobx-react-lite';
import { showMessage } from 'react-native-flash-message';

type ProfileRouteProp = RouteProp<PrivateStackParamList, 'Profile'>

function ProfileScreen() {
    const route = useRoute<ProfileRouteProp>();
    const { userId } = route.params;

    const { colors, isDark } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const [courses, setCourses] = useState(0);

    const handleLogout = async () => {
        await clearSession();
        showMessage({
            message: 'See you!',
            type: 'info',
        });
        replace('PublicStack');
    };

    return (
        <View style={styles.root}>
            <LinearGradient colors={[colors.background, colors.screenGradientEnd]} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
                <Profile
                    name='Ivan Kuzmin'
                    subtitle='FrontEnd Developer'
                    avatar='https://images.unsplash.com/photo-1543466835-00a7907e9de1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    metrics={[
                        { label: 'Courses', value: courses, icon: 'graduation-cap' },
                        { label: 'Hours', value: 48, icon: 'clock-4' },
                        { label: 'Rating', value: 7.7, icon: 'star' }
                    ]}
                    onPress={() => setCourses(prev => prev + 1)}
                    onLogout={handleLogout}
                    userId={userId}
                />
            </SafeAreaView>
        </View>
    )
}

export default observer(ProfileScreen);
