import { showMessage } from "react-native-flash-message";

const showError = (message) => {
    showMessage({
        type: 'warning',
        icon: 'warning',
        message
    })
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        message
    })
}

const showDanger = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message
    })
}

const showInfo = (message) => {
    showMessage({
        type: 'info',
        icon: 'info',
        message
    })
}

export {
    showError,
    showSuccess,
    showDanger,
    showInfo,
}