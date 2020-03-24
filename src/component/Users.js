import React from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, Image, TouchableOpacity, Platform } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Button, Picker, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from './Header';
import Footer from './Footer';

const { width, height } = Dimensions.get('window');
class Users extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            id: "",
            password: "",
            nickName: "",
            email: "",
            isLogin: false,
            joinToggle: false,
            emailSelect: "",
            clickToggleToBook: true,
            token: "",
            loginUser: ""
        }
    }
    onValueChange(value: string) {
        this.setState({ emailSelect: value })
    }
    idForm = (text) => {
        this.setState({ id: text })
    }
    passwordForm = (text) => {
        this.setState({ password: text })
    }
    nickNameForm = (text) => {
        this.setState({ nickName: text })
    }
    emailForm = (text) => {
        this.setState({ email: text })
    }
    joinToggle = () => {
        this.setState({ joinToggle: !this.state.joinToggle })
    }
    clickToggleToBook = () => {
        this.setState({ clickToggleToBook: !this.state.clickToggleToBook })
    }

    loginSubmit = async () => {
        if (this.state.id !== "" & this.state.password !== "") {
            await fetch('http://192.168.219.125:19000/api/auth/login/', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ username: this.state.id, password: this.state.password }) })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.user) {
                        console.log('responseJson', responseJson)
                        Alert.alert('로그인이 되셨습니다.')
                        this.setState({ isLogin: !this.state.isLogin, id: "", password: "", loginUser: responseJson.user['username'], token: responseJson.token })
                    } else {
                        Alert.alert('가입된 로그인 정보가 없습니다.')
                        this.setState({ id: "", password: "" })
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert('아이디와 패스워드를 입력해주세요.')
        }
    }
    joinSubmit = async () => {
        if (this.state.id !== "" & this.state.password !== "" & this.state.nickName !== "" & this.state.email !== "" & this.state.emailSelect !== "") {
            let emailSubmit = this.state.email + "@" + this.state.emailSelect
            await fetch('http://192.168.219.125:19000/api/auth/register/', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ username: this.state.id, password: this.state.password, email: emailSubmit, last_name: this.state.nickName }) })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('result', responseJson)
                    if (responseJson.user) {
                        Alert.alert('회원가입이 완료되었습니다.')
                        this.setState({ joinToggle: !this.state.joinToggle, id: "", password: "", nickName: "", email: "" })
                    } else {
                        console.log('JoinSubmit Server Error')
                        this.setState({ id: "", password: "", nickName: "", email: "" })
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            Alert.alert('빠짐없이 정보를 입력해주세요.')
        }
    }
    logout = async () => {
        if (this.state.token !== "") {
            await fetch('http://192.168.219.125:19000/api/auth/logout/', { method: 'POST', headers: { 'Authorization': ('Token ', this.state.token) } })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    Alert.alert('로그아웃 되셨습니다.')
                    this.setState({ isLogin: !this.state.isLogin })
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log('token이 없습니다.')
        }
    }
    checkId = () => {
        const repExp = /^[a-zA-Z]{1}[a-zA-Z0-9_]{4,11}$/;

        const text = repExp.test(this.state.id)
        if (text == true) {
            Alert.alert('사용 가능한 아이디입니다.')
        } else if (this.state.id !== "") {
            Alert.alert('올바른 형식에 맞추어 주십시오.')
        }
    }
    checkNickName = () => {
        const repExp = /^[가-힣]{2,15}|[a-zA-Z]{2,15}\s|[a-zA-Z]{2,15}$/;
        const text = repExp.test(this.state.nickName)
        if (text == true) {
            Alert.alert('사용 가능한 이름입니다.')
        } else if (this.state.nickName !== "") {
            Alert.alert('올바른 형식에 맞추어 주십시오.')
        }
    }
    checkPassword = () => {
        const repExp = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
        const text = repExp.test(this.state.password)

        if (text == false & this.state.password != "") {
            Alert.alert('영문, 숫자를 혼합하여 6~20자 이내로 작성하여 주십시오.')
        }
    }
    renderSection = () => {
        if (this.state.id !== "" & this.state.password !== "" & this.state.nickName !== "" & this.state.email !== "") {
            return (
                <Button onPress={this.joinSubmit} block style={{ backgroundColor: "#43e39f", marginTop: 45 }}>
                    <Text style={styles.buttonInTitle}>회원가입</Text>
                </Button>
            )
        } else {
            return (
                <Button onPress={this.joinSubmit} block style={{ backgroundColor: "#A9F5E1", marginTop: 45 }} disabled>
                    <Text style={styles.buttonInTitle}>회원가입</Text>
                </Button>
            )
        }
    }
    render() {
        return (
            <Container style={{ width: width, height: height }}>
                <Header />
                {this.state.joinToggle ?
                    <View style={styles.container}>
                        <Text style={styles.joinTitle}>회원가입</Text>
                        <KeyboardAwareScrollView
                            enableOnAndroid
                            enableAutomaticScroll
                            keyboardOpeningTime={0}
                            extraHeight={Platform.select({ android: 200 })}
                        >
                            <Content>
                                <Form>
                                    <Item stackedLabel style={{ borderColor: 'transparent', marginBottom: 50, marginTop: 50 }}>
                                        <Label style={styles.label}>가입유형을 선택해주세요.</Label>
                                        <View style={{ flexDirection: 'row', marginTop: 60 }}>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 40 }}>
                                                <TouchableOpacity style={styles.bookPicture} onPress={this.clickToggleToBook}>
                                                    <Image style={styles.bookPicture2} source={this.state.clickToggleToBook ? require('../assets/image/book_nonClick.png') : require('../assets/image/book.png')} />
                                                </TouchableOpacity>
                                                <Text style={this.state.clickToggleToBook ? styles.bookPicture3 : styles.bookPicture3_2}>스토리 작가</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <TouchableOpacity style={styles.graphicPicture}>
                                                    <Image style={styles.graphicPicture2} source={require('../assets/image/graphic-tablet_nonClick.png')} />
                                                </TouchableOpacity>
                                                <Text style={styles.graphicPicture3}>그림 작가</Text>
                                            </View>
                                        </View>
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={styles.label}>아이디</Label>
                                        <Input style={{ fontSize: 13 }} onChangeText={this.idForm} onSubmitEditing={this.checkId} value={this.state.id} placeholder="아이디를 입력해주세요" placeholderTextColor="#a0a0a0" />
                                    </Item>
                                    <Item stackedLabel >
                                        <Label style={styles.label}>비밀번호</Label>
                                        <Input style={{ fontSize: 13 }} onChangeText={this.passwordForm} onSubmitEditing={this.checkPassword} value={this.state.password} secureTextEntry={true} placeholder="비밀번호를 입력해주세요" placeholderTextColor="#a0a0a0" />
                                    </Item>
                                    <Item stackedLabel >
                                        <Label style={styles.label}>이름</Label>
                                        <Input style={{ fontSize: 13 }} onChangeText={this.nickNameForm} onSubmitEditing={this.checkNickName} value={this.state.nickName} placeholder="이름을 입력해주세요" placeholderTextColor="#a0a0a0" />
                                    </Item>
                                    <Item stackedLabel last style={{ borderColor: 'transparent' }}>
                                        <Label style={styles.label}>이메일</Label>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                            <Input style={{ fontSize: 13, borderWidth: 1, borderColor: "#e0e0e0", paddingLeft: 12, height: 40 }} onChangeText={this.emailForm} value={this.state.email} placeholder="이메일을 입력해주세요" placeholderTextColor="#a0a0a0" />
                                            <Text style={{ marginLeft: 12, marginRight: 12, color: "#9a9a9a" }}>@</Text>
                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                style={{ width: undefined, borderWidth: 1, borderColor: "#e0e0e0", height: 40 }}
                                                placeholder="선택하기"
                                                placeholderTextColor="#a0a0a0"
                                                selectedValue={this.state.emailSelect}
                                                onValueChange={this.onValueChange.bind(this)}>

                                                <Picker.Item label="" value="" />
                                                <Picker.Item label="naver.com" value="naver.com" />
                                                <Picker.Item label="hamail.net" value="hamail.net" />
                                                <Picker.Item label="google.com" value="google.com" />
                                            </Picker>
                                        </View>
                                    </Item>
                                    {this.renderSection()}
                                </Form>
                            </Content>
                        </KeyboardAwareScrollView>
                    </View>
                    :
                    <View style={styles.container}>
                        {this.state.isLogin ?
                            <Content>
                                <Text style={styles.loginTitle}>{this.state.loginUser} 님 환영합니다.!</Text>
                                <Button block style={{ backgroundColor: "#43e39f", marginTop: 50 }} onPress={this.logout}>
                                    <Text style={styles.buttonInTitle}>로그아웃</Text>
                                </Button>
                            </Content>
                            :
                            <KeyboardAwareScrollView
                                enableOnAndroid
                                enableAutomaticScroll
                                keyboardOpeningTime={0}
                                extraHeight={Platform.select({ android: 100 })}
                            >
                                <Content>
                                    <Text style={styles.loginTitle}>로그인</Text>
                                    <Form>
                                        <Item stackedLabel>
                                            <Label style={styles.label}>아이디</Label>
                                            <Input style={{ fontSize: 13 }} onChangeText={this.idForm} value={this.state.id} placeholder="아이디를 입력해주세요" placeholderTextColor="#a0a0a0" />
                                        </Item>
                                        <Item stackedLabel last>
                                            <Label style={styles.label}>비밀번호</Label>
                                            <Input style={{ fontSize: 13 }} onChangeText={this.passwordForm} value={this.state.password} secureTextEntry={true} placeholder="비밀번호를 입력해주세요" placeholderTextColor="#a0a0a0" />
                                        </Item>

                                        <Button onPress={this.loginSubmit} block style={{ backgroundColor: "#43e39f", marginTop: 50 }}>
                                            <Text style={styles.buttonInTitle}>로그인</Text>
                                        </Button>
                                        <Button onPress={this.joinToggle} block style={{ backgroundColor: "#ffffff", marginTop: 10, borderColor: '#43e39f', borderWidth: 0.5 }}>
                                            <Text style={styles.buttonInTitle2}>회원가입</Text>
                                        </Button>
                                    </Form>
                                </Content>
                            </KeyboardAwareScrollView>
                        }
                    </View>
                }

                <Footer />
            </Container>
        );
    }
}

export default Users;

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: '#f9f9f9',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40
    },
    container2: {
        width: 300,
        height: 400,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 18
    },
    loginTitle: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#000000',
        alignSelf: 'center'
    },
    joinTitle: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#000000',
    },
    label: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 13,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#000000',
        marginBottom: 10
    },
    buttonInTitle: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 15,
        fontWeight: '800',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#ffffff',
    },
    buttonInTitle2: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 15,
        fontWeight: '800',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#43e39f',
    },
    bookPicture: {
        borderWidth: 2,
        borderColor: '#e6e6e6',
        alignItems: 'center',
        justifyContent: 'center',
        width: 85,
        height: 85,
        backgroundColor: '#ffffff',
        borderRadius: 50,
    },
    bookPicture2: {
        width: 48,
        height: 33.8,
        resizeMode: 'contain'
    },
    bookPicture3: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 11,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#a0a0a0',
        marginTop: 10
    },
    bookPicture3_2: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 11,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#000000',
        marginTop: 10
    },
    graphicPicture: {
        borderWidth: 2,
        borderColor: '#e6e6e6',
        alignItems: 'center',
        justifyContent: 'center',
        width: 85,
        height: 85,
        backgroundColor: '#ffffff',
        borderRadius: 50,
    },
    graphicPicture2: {
        width: 48,
        height: 33.8,
        resizeMode: 'contain'
    },
    graphicPicture3: {
        fontFamily: 'NotoSansCJKkrRegular',
        fontSize: 11,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#a0a0a0',
        marginTop: 10
    }
})

