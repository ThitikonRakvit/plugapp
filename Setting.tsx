import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Setting">;

export default function Setting() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Setting</Text>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image source={require("./assets/icons/profile-image.png")} style={styles.profileImage} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.profileEmail}>plugnplan@gmail.com</Text>
          <TouchableOpacity>
            <Text style={styles.editProfile}>
              Edit Profile{" "}
              <Image source={require("./assets/icons/pen.png")} style={styles.penIcon} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Car</Text>
          <Image source={require("./assets/icons/chevron-right.png")} style={styles.chevronIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Routes History</Text>
          <Image source={require("./assets/icons/chevron-right.png")} style={styles.chevronIcon} />
        </TouchableOpacity>

        {/* Display Toggle */}
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Display</Text>
          <View style={styles.displayToggle}>
            <TouchableOpacity>
              <Image
                source={require("./assets/icons/sun.png")}
                style={[styles.icon, { tintColor: "#313F7E" }]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SettingDark")}>
              <Image
                source={require("./assets/icons/moon.png")}
                style={[styles.icon, { tintColor: "#313F7E" }]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Language Selector */}
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Languages</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={require("./assets/icons/uk-flag.png")} style={styles.flagIcon} />
            <Image source={require("./assets/icons/thai-flag.png")} style={[styles.flagIcon, { marginLeft: 10 }]} />
          </View>
        </View>

        {/* Other Options */}
        <TouchableOpacity style={{ paddingVertical: 15 }}>
          <Text style={styles.menuText}>Report new charging station</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ paddingVertical: 15 }}>
          <Text style={styles.menuText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ paddingVertical: 15 }}>
          <Text style={styles.menuText}>Bug report</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={{ paddingVertical: 15 }}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F9",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#1C2550",
    fontFamily: "LexendDeca-Regular",
  },
  profileCard: {
    backgroundColor: "#28357A",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileEmail: {
    color: "#fff",
    fontSize: 16,
  },
  editProfile: {
    color: "#fff",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  penIcon: {
    width: 12,
    height: 12,
    tintColor: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  menuText: {
    fontSize: 16,
    color: "#1C2550",
    fontFamily: "LexendDeca-Regular",
  },
  chevronIcon: {
    width: 15,
    height: 15,
  },
  displayToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 75,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  flagIcon: {
    width: 35,
    height: 30,
  },
  logout: {
    fontSize: 16,
    color: "#EA4335",
  },
});