import React from 'react';
import {StyleSheet, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FeatureCard from '../atoms/FeatureCard';

function SlideShow(props) {

    const {items} = props;

    const itemsPerInterval = props.itemsPerInterval === undefined
        ? 1 : props.itemsPerInterval;

    const [intervals, setIntervals] = React.useState(1);
    const [width, setWidth] = React.useState(0);

    const init = () => {
        //initialize width
        setWidth(width);

        //initialize total intervals
        const totalItems = items.length;
        setIntervals(Math.ceil(totalItems / itemsPerInterval));
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ ...styles.scrollView, width: `${100 * intervals}%`}}
                showsHorizontalScrollIndicator={false}
                onContentSizeChange={(w, h) => init(w)}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled
            >
                {items.map( (item, index) => {
                    return (
                        <FeatureCard
                            key={index}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            picture={item.picture}
                            label={item.label}
                            value={item.value}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});

export default SlideShow;
