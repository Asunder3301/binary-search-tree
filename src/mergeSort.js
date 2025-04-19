export { mergeSort }

function mergeSort(array) {
    if (array.length === 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const sortedArray = [];

    const leftArray = mergeSort(array.slice(0, middle));
    const rightArray = mergeSort(array.slice(middle, array.length));

    while(leftArray.length != 0 && rightArray.length != 0) {
        if(leftArray[0] < rightArray[0]) {
            sortedArray.push(leftArray.shift());
        } else {
            sortedArray.push(rightArray.shift());
        }
    }

    if(leftArray.length == 0) {
        sortedArray.push(rightArray.shift());
    } else {
        sortedArray.push(leftArray.shift());
    }

    return sortedArray.concat(leftArray, rightArray);
}