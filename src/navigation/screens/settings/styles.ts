import { StyleSheet } from 'react-native';
import { Colors } from '@utils/colors';

export const makeStyles = (colors: Colors) => {
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: colors.background,
        },
        container: {
            padding: 24,
            paddingBottom: 40,
        },
        title: {
            color: colors.primary,
            marginBottom: 24,
            fontFamily: 'Manrope-Bold',
            fontSize: 32,
        },
        section: {
            marginBottom: 24,
            gap: 8,
        },
        sectionTitle: {
            fontFamily: 'Manrope-Bold',
            fontSize: 18,
            color: colors.muted,
        },
        row: {
            fontFamily: 'Manrope-Medium',
            fontSize: 16,
            color: colors.primary,
        },
        greeting: {
            marginTop: 8,
            fontFamily: 'Manrope-Medium',
            fontSize: 16,
            color: colors.primary,
        },
    });
};
