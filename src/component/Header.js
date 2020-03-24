import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'flex-start', marginLeft: 45, marginTop: 10 }}>
                <Text style={styles.title}>커넥툰</Text>
            </View>
            <View style={styles.container2}>
                <Text style={styles.title2}>작품보기</Text>
                <Text style={styles.title2}>작가찾기</Text>
                <Text style={styles.title2}>탄생웹툰</Text>
                <Text style={styles.title3}>로그인/회원가입</Text>
            </View>
            <View style={styles.headerBar}>
                <ImageBackground source={require('../assets/image/section-1-banner.png')} style={{ width: width, height: 100 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                        <Text style={styles.headertitle}>웹툰작가를 연결하다.</Text>
                        <Text style={styles.headertitle2}>커넥툰</Text>
                    </View>
                    <Text style={styles.connectWebtoon}>Connect + Webtoon</Text>
                </ImageBackground>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 30,
        height: '25%',
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.69,
        textAlign: 'center',
        color: '#43e39f',
    },
    title2: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 13,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: -0.42,
        textAlign: 'center',
        color: '#767676'
    },
    title3: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 14,
        fontWeight: '900',
        fontStyle: 'normal',
        letterSpacing: -0.42,
        textAlign: 'center',
        color: '#43e39f',
    },
    headerBar: {
        width: width,
        height: 100,
        opacity: 0.7,
        backgroundColor: '#0B0719',
    },
    headertitle: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 17,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -1.2,
        textAlign: 'center',
        color: '#ffffff',
    },
    headertitle2: {
        fontFamily: 'NotoSansCJKkrBold',
        fontSize: 19,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -1.2,
        textAlign: 'center',
        color: '#ffffff',
    },
    connectWebtoon: {
        fontFamily: 'NanumPen',
        fontSize: 20,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -1.47,
        textAlign: 'center',
        color: '#43e39f',
        bottom: 7
    }
})