import React, { useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import { Text, EmptyComponent, LoadingComponent } from '@components';
import { fontSize } from '@constants';
import { hScale, scale } from '@resolutions';
import { useSelector } from 'react-redux';
import { CategoryData, categorySelector } from '@reducers';

import CardProducts from './CardProducts';

interface ProductsProps {
    animatedValue: Animated.Value;
}

const Products = ({ animatedValue }: ProductsProps) => {
    const scrollViewRef = useRef<Animated.FlatList<any>>(null);
    const scrollDirection = useRef('');

    const { categories, isLoadingCategories } = useSelector(categorySelector);

    const keyExtractor = (_: any, index: number) => index.toString();

    const renderItem = ({ item }: { item: CategoryData }) => {
        if (item?.products && item?.products?.length > 0) {
            return (
                <View style={styles.card}>
                    <Text bold style={styles.nameCategory}>
                        {item?.name}
                    </Text>
                    <CardProducts data={item} />
                </View>
            );
        }

        return null;
    };

    const onScrollEndDrag = () => {
        if (scrollViewRef.current && scrollDirection.current) {
            scrollViewRef.current.scrollToOffset({
                offset: scrollDirection.current === 'down' ? hScale(80) : 0,
                animated: true,
            });
        }
    };

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
        { useNativeDriver: false },
    );

    return (
        <View style={styles.container}>
            <Text bold style={styles.title}>
                {'Featured Items'}
            </Text>
            <Animated.FlatList
                ref={scrollViewRef}
                data={categories?.data}
                showsVerticalScrollIndicator={false}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                bounces={false}
                contentContainerStyle={styles.ccSt}
                ListHeaderComponent={isLoadingCategories && <LoadingComponent />}
                ListFooterComponent={isLoadingCategories && <LoadingComponent />}
                ListEmptyComponent={
                    isLoadingCategories
                        ? null
                        : <EmptyComponent title="Product's Empty" />
                }
                onScroll={onScroll}
                onScrollEndDrag={onScrollEndDrag}
                scrollEventThrottle={16}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: scale(30),
    },
    title: {
        fontSize: fontSize.fontSize28,
        marginBottom: scale(10),
    },
    ccSt: {
        flexGrow: 1,
        paddingBottom: scale(50),
    },
    wrapperStyle: {
        justifyContent: 'space-around',
    },
    card: {
        marginBottom: scale(30),
    },
    nameCategory: {
        fontSize: fontSize.fontSize18,
        marginBottom: scale(10),
    },
});

export default Products;
