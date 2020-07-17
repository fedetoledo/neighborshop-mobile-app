import React from 'react';
import { View, Text } from 'react-native';
import global from '../../styles/global';
import ProductCard from '../../components/shop/atoms/ProductCard';
import { ScrollView } from 'react-native-gesture-handler';

function CategoryDetail({route, navigation}) {

    const [products, setProducts] = React.useState([]);

    const productos = [
        {
            name: 'Hamburguesas caseras con un titulo largo',
            description: 'Una hamburguesa es un tipo de sándwich hecho a base de carne molida aglutinada en forma de filete cocinado a la parrilla o a la plancha, aunque también puede freírse u hornearse. Fuera del ámbito de habla hispana, es más común encontrar la denominación inglesa burger, acortamiento de hamburger.',
            price: 500,
            store: 'Conde',
            images: [
                        'https://images.rappi.com.ar/products/f2dc6046-b5f0-4cf3-8b49-25dd768eb7c3-1589323836317.png?d=128x90',
                        'https://www.pequeocio.com/wp-content/uploads/elementor/thumbs/hamburguesas-caseras-o73c0mp0p53yil799b1u4eip04mcggiit8c97fufkc.jpg',
                        'https://images.rappi.com.ar/restaurants_background/streetfoodportada-1568656263410.png?d=200x200&e=webp',
                    ],
        },
        {
            name: 'Churros rellenos con dulce de leche',
            description: 'Descripcion del producto o del negocio, ejemplo de descripcion para testing',
            price: 650,
            store: 'Muy churro',
            images: [
                'https://d1uz88p17r663j.cloudfront.net/resized/98785ee542c2864d2c784913b0421117_churros_1200_600.png',
                'https://dam.cocinafacil.com.mx/wp-content/uploads/2017/09/churros.jpg',
                'https://www.petitchef.es/imgupl/recipe/churros-crujientes-y-ligeros--lg-454551p705097.jpg',
                'https://www.superama.com.mx/views/micrositio/recetas/images/comidamexicana/churros/Web_fotoreceta.jpg',
            ],
        },
        {
            name: 'Piletas de material',
            description: 'Las mejores piletas de material',
            price: 500000,
            store: 'Arc Dolar',
            images: [
                'https://grupollanos.com.ar/wp-content/uploads/2018/10/consejos-armar-pileta.jpg',
                'https://i.pinimg.com/474x/2c/f6/83/2cf6835095e0def00b200b36950f54fe.jpg',
                'https://i.pinimg.com/474x/2c/f6/83/2cf6835095e0def00b200b36950f54fe.jpg'],
        },
        {
            name: 'Helado 1kg',
            description: 'Helado descripcion, por peso o por tarros? Ejemplo de descripcion para testing',
            price: 765,
            store: 'Heladeria',
            images: [
                'https://www.recetasderechupete.com/wp-content/uploads/2019/07/shutterstock_1010248351-525x360.jpg',
                'https://http2.mlstatic.com/helado-pote-x-360cc-x-12u-varios-sabores-D_NQ_NP_786096-MLA28816850530_112018-F.jpg',
                'https://i1.wp.com/elfuertediario.com.ar/wp-content/uploads/2018/05/fresh_07demayode2108_elfuerte.jpg?resize=737%2C415',
            ],
        },
    ];

    //Async / Await
    async function getProducts(category) {
        try {
            const productsCall = await fetch('http://192.168.100.11:8000/api/products/?search='+category);
            const productsResponse = await productsCall.json();
                setProducts(productsResponse);
                // setProducts(products);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getProducts(route.params.name);
    }, [route.params.name]);

    return (
        <View style={global.container}>
            <ScrollView>
                {products.length != 0 ?
                    products.map((item, index)=> {
                        return <ProductCard
                                    onPress={() => {
                                        navigation.navigate('ProductDetail', {productId: item.id, storeId: item.businessId});
                                    }}
                                    key={index}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    picture={item.images[0]}
                                />;
                    })
                : <Text>No hay productos disponibles</Text>}
            </ScrollView>
        </View>
    );
}

export default CategoryDetail;
