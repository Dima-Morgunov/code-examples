import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { CodeField } from 'react-native-confirmation-code-field';

import Text from './Text';
import { colors } from '~/presentation/style';

interface Props {
  value: string;
  error?: Error;

  onChange: (code: string) => void;
}

const Code = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <CodeField
        keyboardType="number-pad"
        value={props.value}
        onChangeText={props.onChange}
        cellCount={6}
        rootStyle={styles.codeFiledRoot}
        blurOnSubmit
        renderCell={({ index, symbol }): JSX.Element => (
          <View key={index}>
            <Text bold style={[styles.cell, symbol ? styles.withSymbol : null]}>
              {symbol ? (
                Platform.OS === 'android' ? (
                  '✱'
                ) : (
                  <Text bold size={24} height={40}>
                    *
                  </Text>
                )
              ) : null}
            </Text>
            {symbol ? null : (
              <View
                style={[
                  styles.bottomLine,
                  props.error && props.error.message
                    ? { backgroundColor: colors.red }
                    : null,
                ]}
              />
            )}
          </View>
        )}
      />
      <Text medium color="error" center>
        {props.error ? props.error.message : null}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  codeFiledRoot: {
    flex: 0,
    marginBottom: 8,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  bottomLine: {
    width: '100%',
    height: 2,
    backgroundColor: colors.gray,
  },
  cell: {
    width: 32,
    height: 32,
    lineHeight: 32,
    fontSize: 16,
    textAlign: 'center',
  },
  withSymbol: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.orange,
  },
});

export default Code;
