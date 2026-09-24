import { StyleSheet } from 'react-native';
import { Colors } from '@utils/colors';

export const makeStyles = (colors: Colors) => {
    return StyleSheet.create({
        root: {
            flex: 1,
        },
        container: {
            flex: 1,
            padding: 24,
        },
        themeSection: {
            marginTop: 24,
            gap: 8,
        },
        sectionTitle: {
            fontFamily: 'Manrope-Medium',
            fontSize: 14,
            color: colors.muted,
        },
    });
};
