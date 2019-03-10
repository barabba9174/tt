const errorMessages = {
    format: 'Format error',
    range: 'Out of range error'
}

export const checkWorldInRange = (value) => {
    const checkRange = value
        .split(' ')
        .filter(split => (Number(split) >= 0 && Number(split) <= 50));
    return checkRange.length === 2;
}

export const checkPositionInRange = (value, check) => {
    const checkRange = value
        .split(' ')
        .filter((split, index) => (Number(split) >= 0 && Number(split) <= check[index]));
    return checkRange.length === 2;
}

export const checkValue = (value, regex, checkRange = () => true) => {
    if (regex.test(value)) {
        if (!checkRange(value)) {
            return {error: errorMessages.range};
        }
        return {
            value: value.toUpperCase(),
            error: false
        }

    }
    return {error: errorMessages.format};

}
