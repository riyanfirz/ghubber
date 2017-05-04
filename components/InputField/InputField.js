// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { TextInput, StyleSheet } from 'react-native';

type Props = {
    placeholder: string,
    style?: Object
};

export default class InputField extends PureComponent<void, Props, void> {
    render() {
        const { style, placeholder } = this.props;

        return (
            <TextInput
                style={[styles.input, style]}
                autoCapitalize="none"
                placeholder={placeholder}
            />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        color: '#9197A3',
        backgroundColor: '#FAFAFA',
        borderColor: '#D8D8D8',
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 10,
    }
});
