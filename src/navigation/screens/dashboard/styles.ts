import { StyleSheet } from 'react-native';
import { Colors } from '@utils/colors';

export const makeStyles = (colors: Colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
            backgroundColor: colors.background,
        },
        button: {
            backgroundColor: colors.section,
            padding: 12,
            borderRadius: 12,
            alignSelf: 'center',
            marginTop: 16,
        },
        title: {
            color: colors.primary,
            marginBottom: 8,
            fontFamily: 'manrope-bold',
            fontSize: 48,
            alignSelf: 'center',
        },
        subtitle: {
            color: colors.muted,
            marginBottom: 24,
            fontFamily: 'Manrope-Medium',
            fontSize: 16,
            alignSelf: 'center',
        },
        list: {
            flex: 1,
        },
        courseRow: {
            backgroundColor: colors.section,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
        },
        courseTitle: {
            color: colors.primary,
            fontFamily: 'Manrope-Bold',
            fontSize: 18,
            marginBottom: 8,
        },
        sheetBackground: {
            backgroundColor: colors.background,
        },
        sheetHandle: {
            backgroundColor: colors.muted,
        },
        sheetContent: {
            flex: 1,
            padding: 24,
        },
        sheetTitle: {
            color: colors.primary,
            fontFamily: 'Manrope-Bold',
            fontSize: 28,
        },
        sheetBadge: {
            marginTop: 8,
            marginBottom: 16,
        },
        sheetDescription: {
            color: colors.primary,
            fontFamily: 'Manrope-Regular',
            fontSize: 16,
            lineHeight: 22,
        },
    });
}