import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SlidePicture from '../atoms/SlidePicture';

function PicturesSlideShow(props) {

    //Items is list of pictures uris
    const {items} = props;

    const itemsPerInterval = props.itemsPerInterval === undefined
        ? 1 : props.itemsPerInterval;

    const [interval, setInterval] = React.useState(1);
    const [intervals, setIntervals] = React.useState(1);
    const [width, setWidth] = React.useState(0);

    const init = deviceWidth => {
        //initialize width
        setWidth(deviceWidth);

        //initialize total intervals
        const totalItems = items.length;
        setIntervals(Math.ceil(totalItems / itemsPerInterval));
    };

    const getInterval = offset => {
        for (let i = 1; i <= intervals; i++) {
            if (offset < (width / intervals) * i) {
                return i;
            }
            if (i === intervals) {
                return i;
            }
        }
    };

    let bullets = [];
    for (let i = 1; i <= intervals; i++) {
        bullets.push(
            <Text
                key={i}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{...styles.bullet,opacity: interval === i ? 1 : 0.4}}
            >
                &bull;
            </Text>
        );
    }

    const bulletWidth = bulletQty => {
        const deviceWidth = Math.round(Dimensions.get('window').width);
        const bulletContainerWidth = 20 * bulletQty;
        const bulletHeight = 40.5;

        console.log(deviceWidth);
        console.log(bulletContainerWidth);
        return {
            top: 200 - bulletHeight,
            left: (deviceWidth - bulletContainerWidth) / 2,
        };
    };

    return (
        <View style={styles.container}>
            <ScrollView
                onScroll={data => {
                    setInterval(getInterval(data.nativeEvent.contentOffset.x));
                }}
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
                        <SlidePicture key={index} picture={item} />
                    );
                })}
            </ScrollView>
            <View style={[styles.bullets, bulletWidth(items.length)]}>
                {bullets}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    bullets: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        // left: 150,
        // top: 160,
    },
    bullet: {
        color: '#fff',
        marginHorizontal: 5,
        fontSize: 30,
    },
});

export default PicturesSlideShow;
