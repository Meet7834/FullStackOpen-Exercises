const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const avarage = (arr) => {
    const reducer = (sum, item) => sum + item;

    return arr.length === 0 ? 0 : arr.reduce(reducer, 0) / arr.length;
}

module.exports = { reverse, avarage }