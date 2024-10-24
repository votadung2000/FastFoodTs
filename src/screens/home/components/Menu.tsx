import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { EmptyComponent } from '@components';
import { scale } from '@resolutions';

// import CardMenu from './CardMenu';

const Menu = () => {
    //   const {
    //     categoryStore: {categories, isLoadingCategories},
    //   } = useStore();

    // const keyExtractor = (_, index) => index.toString();

    // const renderItem = ({ item }) => {
    //     return
    //     // return <CardMenu data={item} />;
    // };

    return (
        <View style={styles.container}>
            {/* <FlatList
                horizontal
                bounces={false}
                data={categories?.data}
                showsHorizontalScrollIndicator={false}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListEmptyComponent={
                    !isLoadingCategories && <EmptyComponent title={"Menu's Empty"} />
                }
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: scale(10),
    },
});

export default Menu;
