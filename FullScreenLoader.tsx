import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

// Presentation imports
import { colors } from '~/presentation/style';

interface Props {
  isLoading?: boolean;
}

export default class FullScreenLoader extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { isLoading, children } = this.props;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.backgroundContainer}>
            <ActivityIndicator color={colors.orange} size={36} />
          </View>
        ) : null}
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  indicator: {
    color: colors.orange,
  },
});
