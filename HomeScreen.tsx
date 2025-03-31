import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import API_BASE_URL from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useRoute } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      const userId = await AsyncStorage.getItem("userId");
      try {
        const response = await fetch(`${API_BASE_URL}/user-cars/${userId}`);
        const result = await response.json();

        if (response.ok && result.data && Array.isArray(result.data)) {
          setCars(result.data);
        } else {
          console.error("Failed to fetch cars or invalid data:", result);
          setCars([]);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        setCars([]);
      }
    };

    fetchCars();
  }, []);

  // hide tab
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const locations = [
    { latitude: 13.736717, longitude: 100.523186 },
    { latitude: 13.745, longitude: 100.536 },
    { latitude: 13.728, longitude: 100.51 },
    { latitude: 13.74, longitude: 100.5 },
    { latitude: 13.75, longitude: 100.54 },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.736717,
          longitude: 100.523186,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {locations.map((loc, index) => (
          <Marker key={index} coordinate={loc}>
            <Ionicons name="flash" size={32} color="red" />
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchCard}>
        <Text
          style={{
            marginTop: 2,
            fontSize: 15,
            fontWeight: "700",
            color: "white",
          }}
        >
          <Image
            source={require("./assets/icons/Pin.png")}
            style={[styles.icons, { width: 38, height: 24 }]}
          />
          Select location
        </Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="ex. Soi Thonglor 20" />
          <Ionicons name="search" size={20} color="gray" />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.halfContainer, { alignItems: "flex-start" }]}>
            <Text
              style={{
                marginTop: 2,
                fontSize: 15,
                fontWeight: "700",
                color: "white",
              }}
            >
              Select car
            </Text>
            <SelectList
              setSelected={setSelectedCar}
              data={cars.map((car, index) => ({
                key: (index + 1).toString(),
                value: car.name,
              }))}
              boxStyles={{
                backgroundColor: "white",
                width: "95%",
                borderRadius: 8,
                padding: 4,
              }}
              dropdownStyles={{ backgroundColor: "white", width: "95%" }}
            />
          </View>

          <View style={styles.halfContainer}>
            <Text
              style={{
                marginTop: 2,
                fontSize: 15,
                fontWeight: "700",
                color: "white",
              }}
            >
              Current Battery (%)
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ex. 78"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate("Page2")}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        {/* Find EV Station Button */}
        <TouchableOpacity
          style={[styles.navItem, { opacity: route.name === "Home" ? 1 : 0.5 }]} // ใช้ opacity กับ TouchableOpacity
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("./assets/icons/Marker.png")}
            style={[styles.icon, { tintColor: "white" }]} // ไอคอนเป็นสีขาวเสมอ
          />
          <Text style={[styles.navText, { color: "white" }]}>
            Find EV station
          </Text>
        </TouchableOpacity>

        {/* Plan Trip Button */}
        <TouchableOpacity
          style={[
            styles.navItem,
            { opacity: route.name === "Planned" ? 1 : 0.5 },
          ]}
          onPress={() => navigation.navigate("Planned")}
        >
          <Image
            source={require("./assets/icons/Planned.png")}
            style={[styles.icon, { tintColor: "white" }]}
          />
          <Text style={[styles.navText, { color: "white" }]}>Plan trip</Text>
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity
          style={[
            styles.navItem,
            { opacity: route.name === "Setting" ? 1 : 0.5 },
          ]}
          onPress={() => navigation.navigate("Setting")}
        >
          <Image
            source={require("./assets/icons/Settings.png")}
            style={[styles.icon, { tintColor: "white" }]}
          />
          <Text style={[styles.navText, { color: "white" }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchCard: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: "#313F7E",
    padding: 16,
    gap: 8,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  label: {
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
    width: "95%",
    alignSelf: "center",
  },
  input: {
    flex: 1,
    color: "#333", // Add padding for better spacing
  },
  searchButton: {
    backgroundColor: "#00FFCC",
    padding: 9,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    width: "40%",
    alignSelf: "center",
  },
  searchButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  bottomNav: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#313F7E",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 100,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 8,
  },
  halfContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  icons: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
