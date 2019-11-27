import globalC from "./global.constants";

/**
 *
 * @param n
 * @returns {number}
 */
export function roundDimensions(n) {
    return n - (n % globalC.snakePiece);
}