import validator from 'is_js';

const checkEmpty = (val, key) => {
    if (validator.empty(val.trim())) {
        return `${key}`;
    } else {
        return '';
    }
}

const checkMinLength = (val, minLength, key) => {
    if (val.trim().length < minLength) {
        return `${key} Tidak Valid`
    } else {
        return '';
    }
}

export default function (data) {
    const { name, email, password } = data

    if (name !== undefined) {
        let emptyValidationText = checkEmpty(name, 'Masukkan Nama Anda');
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLenghtValiadation = checkMinLength(name, 3, 'Nama')
            if (minLenghtValiadation !== '') {
                return minLenghtValiadation;
            }
        }
    }

    if (email !== undefined) {
        let emptyValidationText = checkEmpty(email, 'Masukkan Email Anda');
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            if (!validator.email(email)) {
                return 'Penulisan Email Salah'
            }
        }
    }

    if (password !== undefined) {
        let emptyValidationText = checkEmpty(password, 'Masukkan Password Anda');
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLenghtValiadation = checkMinLength(password, 4, 'Password')
            if (minLenghtValiadation !== '') {
                return minLenghtValiadation;
            }
        }
    }
}