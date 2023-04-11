import { StyleSheet, TextInput, View, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';

const CustomInput = ({
  placeholder,
  value,
  setValue,
  onPressIn,
  showSoftInputOnFocus,
  type,
  multiline,
  numberOfLines,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animatedIsFocused] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const borderColor = animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#40E0D0'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        styles[`container_${type}`],
        { borderColor: borderColor },
      ]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={setValue}
        onPressIn={onPressIn}
        showSoftInputOnFocus={showSoftInputOnFocus}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Animated.View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
  },
  input: {
    color: 'white',
    backgroundColor: '#202224',
    fontSize: 16,
    paddingVertical: 10,
  },
  container_SIGNIN: {
    width: '80%',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
  },
});
