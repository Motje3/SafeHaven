import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

// Globally shrink every Text/TextInput fontSize by this factor.
// Tweak this single value to make the whole app's typography larger or smaller.
const FONT_SCALE = 0.85;

type AnyComponent = { render?: (...args: unknown[]) => React.ReactElement };

const scaleFontInStyle = (style: unknown) => {
  const flat = StyleSheet.flatten(style as never) as { fontSize?: number } | undefined;
  if (flat && typeof flat.fontSize === 'number') {
    return [style, { fontSize: flat.fontSize * FONT_SCALE }];
  }
  return style;
};

const patchRender = (Component: AnyComponent) => {
  const original = Component.render;
  if (!original) return;
  Component.render = function patchedRender(...args: unknown[]) {
    const element = original.apply(this, args);
    return React.cloneElement(element, {
      style: scaleFontInStyle(element.props.style),
    });
  };
};

patchRender(Text as unknown as AnyComponent);
patchRender(TextInput as unknown as AnyComponent);
