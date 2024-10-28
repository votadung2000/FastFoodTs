import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { EmptyComponent } from '@components';
import { categorySelector, CategoryData } from '@reducers';
import { scale } from '@resolutions';

import CardMenu from './CardMenu';

const Menu = () => {
    const { categories, isLoadingCategories } = useSelector(categorySelector);

    const keyExtractor = (_: any, index: number) => index.toString();

    const renderItem = ({ item }: { item: CategoryData }) => {
        return <CardMenu data={item} />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                bounces={false}
                data={categories?.data}
                showsHorizontalScrollIndicator={false}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListEmptyComponent={
                    isLoadingCategories
                        ? null
                        : <EmptyComponent title={"Menu's Empty"} />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: scale(10),
    },
});

export default Menu;
