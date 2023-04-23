import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";

export default function Logout(){
    const { user, logout } = useContext(AuthContext);
    return (
        <View style={styles.container}>
          <Button onPress={logout} title="Log Out" />
        </View>
      );
}