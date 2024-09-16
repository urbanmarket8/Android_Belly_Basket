import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import { register } from "../api1/UserAPI";
import ErrorModal from "../modals/error";
import SuccessModal from "../modals/success";
import WarningModal from "../modals/warningmodal";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  const handleSignUp = async () => {
    if (loading) return;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      setModalMessage("All fields are required."); // Set error message
      setWarningModalVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match."); // Set error message
      setWarningModalVisible(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setModalMessage("Please enter a valid email address."); // Set error message
      setWarningModalVisible(true);
      return;
    }

    setLoading(true); // Set loading to true when the sign-up starts

    const signUpData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      username,
      password,
      is_owner: false,
    };

    try {
      const result = await register(signUpData);
      if (result.message) {
        setModalMessage(result.message);
        setModalVisible(true);
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      } else {
        setModalMessage(result.message); // Set error message
        setErrorModalVisible(true); 
      }
    } catch (error) {
      setModalMessage("An unexpected error occurred."); // Set error message
      setErrorModalVisible(true); 
    } finally {
      setLoading(false); // Set loading to false after the process is done
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mt-10 p-3 space-y-3 flex-1">
        <View className="flex-row items-center mb-10">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#4C5058" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-700 ml-3">Sign Up</Text>
        </View>
        <View className="px-5 space-y-4">
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-3 text-base"
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            editable={!loading} // Disable input when loading
          />
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-3 text-base"
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            editable={!loading} // Disable input when loading
          />
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-3 text-base"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading} // Disable input when loading
          />
          <View className="border border-gray-300 rounded-lg">
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="US" // Default country code
              layout="first"
              onChangeText={(text) => setPhoneNumber(text)}
              disabled={loading} // Disable phone input when loading
            />
          </View>
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-3 text-base"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            editable={!loading} // Disable input when loading
          />

          <View className="relative">
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-3 text-base"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              className="absolute right-3 top-[17px]"
              disabled={loading}
            >
              <FeatherIcon
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#4C5058"
              />
            </TouchableOpacity>
          </View>
          <View className="relative">
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-3 text-base"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={toggleShowConfirmPassword}
              className="absolute right-3 top-[17px]"
              disabled={loading}
            >
              <FeatherIcon
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={20}
                color="#4C5058"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-5 mt-6">
          {/* <TouchableOpacity
            className={`bg-gray-800 py-3 rounded-lg justify-center items-center ${
              loading ? "opacity-50" : ""
            }`}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <View className="flex flex-row justify-center items-center">
                <Image source={loadingGif} style={{ width: 25, height: 25 }} />
                <Text className="text-white font-bold text-lg">Sign Up</Text>
              </View>
            ) : (
              <Text className="text-white font-bold text-lg">Sign Up</Text> // Display Sign Up text
            )}
          </TouchableOpacity> */}

          <TouchableOpacity
            className="bg-gray-800 py-3 rounded-lg justify-center items-center"
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">Sign Up</Text>
            )}
          </TouchableOpacity>
          <View className="mt-6 flex items-center justify-center flex-row w-full">
            <Text className="text-gray-600">Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              disabled={loading}
            >
              <Text className="text-blue-500 ml-2 text-[15px]">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <SuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
      />
      <ErrorModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        message={modalMessage}
      />
      <WarningModal
        visible={warningModalVisible}
        onClose={() => setWarningModalVisible(false)}
        message={modalMessage}
      />
    </ScrollView>
  );
}
