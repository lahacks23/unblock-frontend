import { View, Text} from "react-native";
import styles from "../../styles";
import Button from "./Button";

export default function Lock() {

  return <View>
    <Text style={styles.titleText}>Lock Menu</Text>
    <Button
      title="Connect"
    />
    <Button
      title="Disconnect"
    />
    <Button
      title="Lock"
    />
    <Button
      title="Unlock"
    />
  </View>
}