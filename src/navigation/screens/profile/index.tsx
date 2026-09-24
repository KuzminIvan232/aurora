
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { PrivateStackParamList } from "@interfaces/navigation";
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { clearSession } from '@services/session';
import { replace } from '@navigation/navigationUtils';
import { makeStyles } from './styles';
import Profile from '@components/Profile';
import { useTheme } from '@hooks/useTheme';
import { observer } from 'mobx-react-lite';
import { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';

type ProfileRouteProp = RouteProp<PrivateStackParamList, 'Profile'>
type ProfileNavProp = NativeStackNavigationProp<PrivateStackParamList, 'Profile'>

function ProfileScreen() {
    const route = useRoute<ProfileRouteProp>();
    const { userId } = route.params;
    const navigation = useNavigation<ProfileNavProp>();

    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const [courses, setCourses] = useState(0);
    const { t } = useTranslation();

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
            <SafeAreaView style={styles.root}>
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <Profile
                        name='Ivan Kuzmin'
                        subtitle='FrontEnd Developer'
                        avatar='https://images.unsplash.com/photo-1543466835-00a7907e9de1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        metrics={[
                            { label: 'Courses', value: courses, icon: 'graduation-cap' },
                            { label: t('profile.hours'), value: 48, icon: 'clock-4' },
                            { label: t('profile.rating'), value: 7.7, icon: 'star' }
                        ]}
                        onPress={() => setCourses(prev => prev + 1)}
                        onLogout={handleLogout}
                        userId={userId}
                    />
                    <Pressable style={styles.button} onPress={() => navigation.navigate('Settings')}>
                        <Text style={styles.buttonLabel}>{t('common.settings')}</Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default observer(ProfileScreen);
