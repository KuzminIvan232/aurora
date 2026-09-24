
import {
    Text,
    View,
    Pressable,
    Image,
    StyleSheet,
} from 'react-native';
import { useMemo } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { SvgProps } from 'react-native-svg';
import { makeStyles } from './styles';
import { ProfileProps } from './types';
import { useTheme } from '@hooks/useTheme';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import GradientText from '@components/GradientText';
import GraduationCap from '@icons/graduation-cap.svg';
import Clock4 from '@icons/clock-4.svg';
import Star from '@icons/star.svg';

const METRIC_ICONS: Record<string, React.FC<SvgProps>> = {
    'graduation-cap': GraduationCap,
    'clock-4': Clock4,
    star: Star,
};

function Profile({ name, subtitle, avatar, metrics, onPress, onLogout, userId }: ProfileProps) {
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const { t } = useTranslation();

    return (
        <View style={styles.root}>
            <LinearGradient colors={[colors.background, colors.profileGradientEnd]} style={StyleSheet.absoluteFill} />
            <View style={styles.firstSection}>
                <Image
                    source={{ uri: avatar }}
                    style={styles.image}
                />
                <GradientText style={styles.name} colors={[colors.primary, colors.accent]}>
                    {name}
                </GradientText>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <View style={styles.metrics}>
                {metrics.map((item) => {
                    const Icon = METRIC_ICONS[item.icon];

                    return (
                        <View key={item.label} style={styles.metricItem}>
                            {Icon && <Icon width={20} height={20} stroke={colors.primary} />}
                            <Text style={styles.metricLabel}>{item.label}</Text>
                            <Text style={styles.metricValue}>{item.value}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.thirdSection}>
                <Text style={styles.userId}>User Id: {userId}</Text>
                <View style={styles.buttons}>
                    <View style={styles.cardShadow}>
                        <View style={styles.card}>
                            <LinearGradient
                                colors={[colors.background, colors.cardGradientEnd]}
                                style={StyleSheet.absoluteFill}
                                locations={[0.3, 1]}
                            />
                            <Pressable onPress={onPress} style={({ pressed }) => [
                                styles.button,
                                pressed && styles.buttonPressed
                            ]}>
                                <Text style={styles.addCourse}>Add course</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.cardShadow}>
                        <View style={styles.card}>
                            <LinearGradient
                                colors={[colors.background, colors.cardGradientEnd]}
                                style={StyleSheet.absoluteFill}
                                locations={[0.3, 1]}
                            />
                            <Pressable onPress={onLogout} style={({ pressed }) => [
                                styles.button,
                                pressed && styles.buttonPressed
                            ]}>
                                <Text style={styles.addCourse}>{t('common.logout')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default observer(Profile);
