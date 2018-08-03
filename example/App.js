import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Image
} from "react-native";
import Expo from "expo";

const SWIPER_HEIGHT = 180;
import CreditCard, { CardImages } from "react-native-credit-card";
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height
  },
  container: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    paddingTop: 30
  },
  wrapper: {
    height: SWIPER_HEIGHT
  },
  slide: {
    height: SWIPER_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {},
  card: {
    marginHorizontal: 10,
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 3,
    elevation: 3,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    width: width - 60
  },
  button: {
    height: 40,
    backgroundColor: "#1ba549",
    justifyContent: "center"
  },
  textButton: {
    textAlign: "center",
    color: "#fff"
  }
});

export default class RNCreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: "number",
      number: "",
      name: "",
      cvc: "",
      expiry: "",
      index: 0,
      type: "visa"
    };
  }

  componentDidMount() {
    this.refs["number"].focus();
  }

  _onChangeText = (text, card) => {
    this.setState({ [card]: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.background}
          source={require("./images/background.png")}
          resizeMode={"cover"}
        />
        <CreditCard
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
            marginBottom: 0,
            elevation: 3,
            alignSelf: "center"
          }}
          imageFront={require("./images/card-front.png")}
          imageBack={require("./images/card-back.png")}
          shiny={false}
          bar={false}
          focused={this.state.focused}
          number={this.state.number}
          name={this.state.name}
          expiry={this.state.expiry}
          cvc={this.state.cvc}
        />

        <ScrollView horizontal ref={comp => (this.scrollview = comp)}>
          <View style={styles.slide}>
            <View style={styles.card}>
              <Text style={styles.textNumber}>CARD NUMBER</Text>
              <TextInput
                ref="number"
                value={this.state.number}
                onChangeText={text => this._onChangeText(text, "number")}
              />
            </View>
          </View>
          <View style={styles.slide}>
            <View style={styles.card}>
              <Text style={styles.textName}>CARD HOLDER'S NAME</Text>
              <TextInput
                ref="name"
                value={this.state.name}
                onChangeText={text => this._onChangeText(text, "name")}
              />
            </View>
          </View>
          <View style={styles.slide}>
            <View style={styles.card}>
              <Text style={styles.textName}>EXPIRY</Text>
              <TextInput
                ref="expiry"
                value={this.state.expiry}
                onChangeText={text => this._onChangeText(text, "expiry")}
              />
            </View>
          </View>
          <View style={styles.slide}>
            <View style={styles.card}>
              <Text style={styles.textCvc}>CVV/CVC NUMBER</Text>
              <TextInput
                ref="cvc"
                value={this.state.cvc}
                onChangeText={text => this._onChangeText(text, "cvc")}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function cacheImages(images) {
  return images.map(image => Expo.Asset.fromModule(image).downloadAsync());
}
