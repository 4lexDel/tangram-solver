export class ArrayUtils {
    static cloneNDArray(originalArray) {
        function cloneArray(array) {
            return Array.isArray(array) ? array.map(cloneArray) : array;
        }

        return cloneArray(originalArray);
    }

    static rotate2DArray(array) {
        return array;
    }
}