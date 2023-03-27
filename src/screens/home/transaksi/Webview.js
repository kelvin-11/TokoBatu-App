import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Webview = ({ route }) => {
    return (
        <WebView
            source={{ uri: route.params.uri }}
            startInLoadingState={true}
            renderLoading={() => (
                <ActivityIndicator
                    color='black'
                    size='large'
                    style={styles.flexContainer}
                />
            )}
        />
    )
}
export default Webview;

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
