import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Switch, Text } from 'react-native-paper'

const ToggleWithHooks = (toggle, setToggle) => {
  
    return (
      <View style={{ flexDirection: 'row'  }}>
        <Switch
            value={toggle}
            onValueChange={e => setToggle(!toggle) }
         />
        <Text>{JSON.stringify(toggle)}</Text>
      </View>
    );
};

export default ToggleWithHooks;
  