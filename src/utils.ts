import { TRANSFORMATIONS } from './constants';

export const limitForRange =
    (value: number, min: number = 0, max: number = Infinity) =>
        Math.max(
            min,
            Math.min(max, value)
        );

// [2...10] in CoffeeScript :P
export const range =
    (stop: number, start: number = 0): number[] =>
        Array.from(Array(stop).keys()).filter((item, index) => start <= index);

export const formatColor =
    (lightness: number, saturation: number = 100) =>
        `hsl(120, ${saturation}%, ${lightness}%)`;

// number <0, 9> or char with key codes from <65382, 65437>
export const generateRandomChar = (): string => {
    const numbersAmount = 10;
    const charMin = 65382;
    const charMax = 65437;

    let rand = Math.floor(Math.random() * (charMax - charMin + numbersAmount));

    if (rand < numbersAmount) {
        rand += 48;
    } else {
        rand += charMin - numbersAmount;
    }

    return String.fromCharCode(rand);
};

export const getRandomTransformation = (): string => {
    const randIndex = Math.floor(Math.random() * TRANSFORMATIONS.length);

    return TRANSFORMATIONS[randIndex];
};
