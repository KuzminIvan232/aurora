import { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { PrivateStackParamList } from "@interfaces/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { makeStyles } from './styles';
import { observer } from 'mobx-react-lite';
import { useTheme } from "@hooks/useTheme";
import { useTranslation } from 'react-i18next';
import Badge from '@components/Badge';

type DashboardNavProp = NativeStackNavigationProp<PrivateStackParamList, 'Dashboard'>

type Course = {
    id: string;
    title: string;
    lessons: number;
    description: string;
};

const COURSES: Course[] = [
    { id: '1', title: 'React Native Basics', lessons: 12, description: 'Components, styling and navigation fundamentals for building mobile apps.' },
    { id: '2', title: 'Deep Linking', lessons: 6, description: 'Custom URL schemes, Universal Links and how to wire them up in React Navigation.' },
    { id: '3', title: 'Animations with Reanimated', lessons: 9, description: 'Worklets, shared values and gesture-driven UI with react-native-reanimated.' },
    { id: '4', title: 'Bottom Sheets', lessons: 4, description: 'Building modal sheets with snap points, backdrops and gesture handling.' },
];

function DashboardScreen() {

    const navigation = useNavigation<DashboardNavProp>();
    const sheetRef = useRef<BottomSheetModal>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const snapPoints = useMemo(() => ['40%', '85%'], []);
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const { t } = useTranslation();

    // Header shrinks as the list scrolls: scrollY is updated on the UI
    // thread by the scroll handler, titleStyle reads it via interpolate.
    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const titleStyle = useAnimatedStyle(() => {
        const scale = interpolate(scrollY.value, [0, 100], [1, 0.7], Extrapolation.CLAMP);
        return { transform: [{ scale }] };
    });

    const handleGoToProfile = () => {
        navigation.navigate('Profile', { userId: 'user1' });
    }

    const handleOpenCourse = (course: Course) => {
        setSelectedCourse(course);
        sheetRef.current?.present();
    }

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
        ),
        []
    );

    return (
        <SafeAreaView style={styles.container}>
            <Animated.Text style={[styles.title, titleStyle]}>Dashboard</Animated.Text>
            <Text style={styles.subtitle}>{t('courses', { count: COURSES.length })}</Text>
            <Animated.FlatList
                style={styles.list}
                data={COURSES}
                keyExtractor={(item: Course) => item.id}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                renderItem={({ item }: { item: Course }) => (
                    <Pressable style={styles.courseRow} onPress={() => handleOpenCourse(item)}>
                        <Text style={styles.courseTitle}>{item.title}</Text>
                        <Badge label={`${item.lessons} lessons`} />
                    </Pressable>
                )}
            />
            <Pressable style={styles.button} onPress={handleGoToProfile}>
                <Text>Go to Profile</Text>
            </Pressable>

            <BottomSheetModal
                ref={sheetRef}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.sheetBackground}
                handleIndicatorStyle={styles.sheetHandle}
            >
                <BottomSheetView style={styles.sheetContent}>
                    <Text style={styles.sheetTitle}>{selectedCourse?.title}</Text>
                    {selectedCourse && (
                        <View style={styles.sheetBadge}>
                            <Badge label={`${selectedCourse.lessons} lessons`} />
                        </View>
                    )}
                    <Text style={styles.sheetDescription}>{selectedCourse?.description}</Text>
                </BottomSheetView>
            </BottomSheetModal>
        </SafeAreaView>
    )
}

export default observer(DashboardScreen);