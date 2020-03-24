import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const Footer = () => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 45, marginTop: 10, justifyContent: 'center' }}>
                <Text style={styles.footerTitle}>커넥툰</Text>
                <Text style={styles.footerTitle2}>사업자등록번호 155-88-01025 ｜ 대표 서장원,이민재 ｜ 서울시 마포구 케이스퀘어 708호 이메일 : wkddnjset@naver.comCopyright © tirrilee 2019</Text>
            </View>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        width: width,
        height: '20%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E6E6E6'
    },
    footerTitle: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.69,
        textAlign: 'center',
        color: '#43e39f',
    },
    footerTitle2: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 8,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#767676',
        marginLeft: 25,
        bottom: 5
    }
})