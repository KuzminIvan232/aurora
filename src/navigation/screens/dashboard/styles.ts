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
            marginBottom: 24,
            fontFamily: 'manrope-bold',
            fontSize: 48,
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
        },
        courseLessons: {
            color: colors.muted,
            fontFamily: 'Manrope-Regular',
            fontSize: 14,
            marginTop: 4,
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
        sheetLessons: {
            color: colors.muted,
            fontFamily: 'Manrope-Medium',
            fontSize: 16,
            marginTop: 4,
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