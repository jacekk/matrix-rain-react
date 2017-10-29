import {
    range,
    limitForRange,
} from './utils';

describe('limitForRange', () => {
    it('should return value if is in range', () => {
        expect(limitForRange(123)).toEqual(123);
        expect(limitForRange(2, 0, 4)).toEqual(2);
        expect(limitForRange(2, 5)).toEqual(5);
    });

    it('should return min if value is lower', () => {
        expect(limitForRange(-5, 4, 10)).toEqual(4);
        expect(limitForRange(-2)).toEqual(0);
        expect(limitForRange(-2, -3)).toEqual(-2);
    });

    it('should return max if value is higher', () => {
        expect(limitForRange(10, 0, 4)).toEqual(4);
        expect(limitForRange(3, 0, 2)).toEqual(2);
        expect(limitForRange(Infinity + 2)).toEqual(Infinity);
    });
});

describe('range', () => {
    it('should return a list of incremented numbers', () => {
        expect(range(0)).toEqual([]);
        expect(range(1)).toEqual([0]);
        expect(range(4)).toEqual([0, 1, 2, 3]);
    });

    it('should respect start param', () => {
        expect(range(5, 0)).toEqual([0, 1, 2, 3, 4]);
        expect(range(4, 1)).toEqual([1, 2, 3]);
    });

    it('should return empty list if params are equal', () => {
        expect(range(0, 0)).toEqual([]);
        expect(range(2, 2)).toEqual([]);
    });
});
