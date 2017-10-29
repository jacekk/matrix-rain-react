// [0...10] in CoffeeScript
export const range =
    (len: number): number[] =>
        Array.from(Array(len).keys());

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
