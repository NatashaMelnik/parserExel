export const getDefaultRandomList = (maxValue, count) => {

    let output = [];

    for (let i = 0; i < count; i++) {
        output[i] = getRandomInt(maxValue);
    }

    return output;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}