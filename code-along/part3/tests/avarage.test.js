const { avarage } = require('../utils/for_testing')

describe('avarage', () => {
    test('of the number itself', () => {
        expect(avarage([1])).toBe(1)
    })
    test('of many is calculated right', () => {
        expect(avarage([1, 2, 3, 4, 5, 6])).toBe(3.5)
    })
    test('of empty array is zero', () => {
        expect(avarage([])).toBe(0)
    })
})