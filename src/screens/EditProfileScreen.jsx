// // screens/EditProfileScreen.js
// import { useNavigation } from "@react-navigation/native";
// import React, { useState } from "react";
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUserProfile } from "../features/userSlice";

// import Icon from "react-native-vector-icons/FontAwesome";

// export default function EditProfileScreen() {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const { firstName, lastName, email, phone_number, name } = useSelector(
//     (state) => state.user
//   );

//   const [fullName, setFullName] = useState(`${firstName} ${lastName}`);
//   const [FirstName, setFirstName] = useState(firstName);
//   const [LastName, setLastName] = useState(lastName);
//   const [emailInput, setEmailInput] = useState(email);
//   const [phoneNumberInput, setPhoneNumberInput] = useState(phone_number);
//   const [usernameInput, setUsernameInput] = useState(name);
//   const [imageUri, setImageUri] = useState(
//     "https://i.postimg.cc/D0BvgPWG/download.webp"
//   );

//   const handleSave = () => {
//     const [newFirstName, newLastName] = fullName.split(" ");
//     dispatch(
//       updateUserProfile({
//         firstName: newFirstName || "",
//         lastName: newLastName || "",
//         email: emailInput,
//         phone_number: phoneNumberInput,
//         name: usernameInput,
//       })
//     );
//     // Additional save logic can be added here, such as sending a request to a backend API.
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-left" size={24} color="#4C5058" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Edit Profile</Text>
//       </View>
//       <View style={styles.profileSection}>
//         <TouchableOpacity style={styles.imageContainer}>
//           <Image source={{ uri: imageUri }} style={styles.avatar} />
//           {/* Uncomment to add change image text */}
//           {/* <Text style={styles.changeImageText}>Change Image</Text> */}
//         </TouchableOpacity>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>First Name:</Text>
//           <TextInput
//             style={styles.input}
//             value={FirstName}
//             onChangeText={setFirstName}
//             placeholder="First Name"
//           />
//           <Text style={styles.label}>Last Name:</Text>
//           <TextInput
//             style={styles.input}
//             value={LastName}
//             onChangeText={setLastName}
//             placeholder="Last Name"
//           />
//           <Text style={styles.label}>Username:</Text>
//           <TextInput
//             style={styles.input}
//             value={usernameInput}
//             onChangeText={setUsernameInput}
//             placeholder="Username"
//           />
//           <Text style={styles.label}>Email:</Text>
//           <TextInput
//             style={styles.input}
//             value={emailInput}
//             onChangeText={setEmailInput}
//             placeholder="Email"
//             keyboardType="email-address"
//           />
//           <Text style={styles.label}>Phone Number:</Text>
//           <TextInput
//             style={styles.input}
//             value={phoneNumberInput}
//             onChangeText={setPhoneNumberInput}
//             placeholder="Phone Number"
//             keyboardType="phone-pad"
//           />
//         </View>
//         <TouchableOpacity style={styles.button} onPress={handleSave}>
//           <Text style={styles.buttonText}>Save</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     padding: 16,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//     marginTop: 40,
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: "600",
//     color: "#4C5058",
//     marginLeft: 10,
//   },
//   profileSection: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 16,
//     elevation: 2,
//   },
//   imageContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     backgroundColor: "#FFC6AE",
//   },
//   changeImageText: {
//     marginTop: 10,
//     color: "#007BFF",
//     fontWeight: "600",
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#4C5058",
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 5,
//     padding: 12,
//     marginBottom: 10,
//     backgroundColor: "#FFFFFF",
//   },
//   button: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });

// screens/EditProfileScreen.js



// screens/EditProfileScreen.js
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../features/userSlice";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { firstName, lastName, email, phone_number, name, userId } =
    useSelector((state) => state.user);

  const [fullName, setFullName] = useState(`${firstName} ${lastName}`);
  const [FirstName, setFirstName] = useState(firstName);
  const [LastName, setLastName] = useState(lastName);
  const [emailInput, setEmailInput] = useState(email);
  const [phoneNumberInput, setPhoneNumberInput] = useState(phone_number);
  const [usernameInput, setUsernameInput] = useState(name);
  const [imageUri, setImageUri] = useState(
    "https://i.postimg.cc/D0BvgPWG/download.webp"
  );

  const handleSave = () => {
    const [newFirstName, newLastName] = fullName.split(" ");
    dispatch(
      updateUserProfile({
        userId, // Ensure userId is included
        firstName: newFirstName || "",
        lastName: newLastName || "",
        email: emailInput,
        phone_number: phoneNumberInput,
        name: usernameInput,
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#4C5058" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={FirstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={LastName}
            onChangeText={setLastName}
            placeholder="Last Name"
          />
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            value={usernameInput}
            onChangeText={setUsernameInput}
            placeholder="Username"
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={emailInput}
            onChangeText={setEmailInput}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={phoneNumberInput}
            onChangeText={setPhoneNumberInput}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4C5058",
    marginLeft: 10,
  },
  profileSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFC6AE",
  },
  changeImageText: {
    marginTop: 10,
    color: "#007BFF",
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4C5058",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
