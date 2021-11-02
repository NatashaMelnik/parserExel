export const getCongruentRandomList = (maxValue, count) => {

    let output = [];

    const k = Math.floor(Math.random() * maxValue);
    const c = Math.floor(Math.random() * maxValue);
    const m = Math.floor(Math.random() * maxValue);
    let xn = Math.floor(Math.random() * maxValue);

    for (let i = 0; i < count; i++) {
        output[i] = xn;
        xn = (k * xn + c) % m;
    }

    return output;
}
