import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Car {
  id: number;
  name: string;
  model: string;
  image: any;
}

export default function EditCar() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<Car[]>([
    {
      id: 1,
      name: "Car 1",
      model: "Tesla Model 3",
      image: require("./assets/car.png"),
    },
  ]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // เปิด/ปิดโหมดแก้ไข
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // แสดง Popup ยืนยันการลบ
  const confirmDelete = (car: Car) => {
    setSelectedCar(car);
    setIsDeleteConfirm(true);
  };

  // ดำเนินการลบรถ
  const handleDelete = () => {
    if (selectedCar) {
      setCars(cars.filter((car) => car.id !== selectedCar.id));
      setIsDeleteConfirm(false);
      setSelectedCar(null);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require("./assets/icons/back.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>My Car</Text>
        <TouchableOpacity onPress={toggleEditMode}>
          <Text style={styles.editText}>{isEditMode ? "Done" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      {/* แสดงรายการรถ */}
      {cars.length > 0 ? (
        <View style={styles.card}>
          <View style={styles.cardDetails}>
            <Text style={styles.carName}>{cars[0].name}</Text>
            <Text style={styles.carModel}>{cars[0].model}</Text>
          </View>
          <Image source={cars[0].image} style={styles.carImage} />
          {isEditMode && (
            <TouchableOpacity onPress={() => confirmDelete(cars[0])} style={styles.deleteIcon}>
              <Image source={require("./assets/icons/delete.png")} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <TouchableOpacity onPress={() => navigation.navigate("selectcar2")}>
            <Image source={require("./assets/icons/plus.png")} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>
      )}

      {/* ปุ่มเพิ่มรถ */}
      <TouchableOpacity onPress={() => navigation.navigate("selectcar2")} style={styles.addButton}>
        <Image source={require("./assets/icons/plus.png")} style={styles.addIcon} />
      </TouchableOpacity>

      {/* Popup ยืนยันการลบ */}
      <Modal visible={isDeleteConfirm} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>⚠ Warning</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete{" "}
              <Text style={styles.modalCarName}>{selectedCar?.name}?</Text>
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setIsDeleteConfirm(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F8F8F4",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 28,
    height: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F3C79",
  },
  editText: {
    fontSize: 16,
    color: "#777",
  },
  card: {
    backgroundColor: "#2F3C79",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    position: "relative",
  },
  cardDetails: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  carModel: {
    fontSize: 14,
    color: "#BCC2E2",
  },
  carImage: {
    width: 110,
    height: 70,
    resizeMode: "contain",
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  icon: {
    width: 22,
    height: 22,
  },
  emptyCard: {
    backgroundColor: "#EDEDED",
    height: 120,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  plusIcon: {
    width: 35,
    height: 35,
  },
  addButton: {
    alignSelf: "center",
    marginTop: 30,
  },
  addIcon: {
    width: 50,
    height: 50,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  modalCarName: {
    fontWeight: "bold",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  cancelText: {
    fontSize: 16,
    color: "#2F3C79",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
  },
});