import React from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';

type TypographyProps = TextProps & {
  type: keyof typeof styles;
  children: React.ReactNode;
};

const Typography: React.FC<TypographyProps> = ({type, children, style}) => {
  return <Text style={[styles[type], style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 20,
    fontWeight: 'regular',
  },
  h5: {
    fontSize: 16,
    fontWeight: 'regular',
    color: 'white',
  },
});

export default Typography;
