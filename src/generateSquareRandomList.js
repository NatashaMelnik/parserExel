export const getSquareRandomList = (maxValue, count) => {

    let output = [];

    let currNum = Math.floor(Math.random() * maxValue);

    for (let i = 0; i < count; i++) {
        currNum = Math.floor(Math.random() * maxValue);
        let temp = (currNum * currNum).toString();
        temp.substr((Math.ceil(temp.length / 2) - 1), (2 - temp.length % 2));
        while (parseInt(temp) > maxValue) {
            temp = parseInt((temp.toString()).slice(1));
        }
        output[i] = parseInt(temp) <= maxValue ? parseInt(temp) : parseInt(temp.slice(1));
        currNum = temp;
    }

    return output;
}
