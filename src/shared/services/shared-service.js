export class SharedService {
    cloneNDArray(originalArray) {
        function cloneArray(array) {
            return Array.isArray(array) ? array.map(cloneArray) : array;
        }

        return cloneArray(originalArray);
    }

    rotate2DArray(array) {
        return array;
    }
}