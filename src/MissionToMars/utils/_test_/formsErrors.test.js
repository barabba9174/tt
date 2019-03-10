/*eslint-disable */

import { checkWorldInRange, checkPositionInRange, checkValue } from '../formsErrors';

test('checkWorldInRange \'10 10\'', () => {
    const checkIfValid = checkWorldInRange('10 10');
    expect(checkIfValid).toBe(true);
})

test('checkWorldInRange \'10 51\'', () => {
    const checkIfValid = checkWorldInRange('10 51');
    expect(checkIfValid).toBe(false);
})

test('checkWorldInRange \'51 10\'', () => {
    const checkIfValid = checkWorldInRange('51 10');
    expect(checkIfValid).toBe(false);
})

test('checkWorldInRange \'10ppp 10\'', () => {
    const checkIfValid = checkWorldInRange('10ppp 10');
    expect(checkIfValid).toBe(false);
})

test('checkWorldInRange \'10 10ppp\'', () => {
    const checkIfValid = checkWorldInRange('10 10ppp');
    expect(checkIfValid).toBe(false);
})

test('checkPositionInRange \'10 10 E\' in a \'20 20\' world', () => {
    const checkIfValid = checkPositionInRange('10 10 E', [20, 20]);
    expect(checkIfValid).toBe(true);
})

test('checkPositionInRange \'21 10 E\' in a \'20 20\' world', () => {
    const checkIfValid = checkPositionInRange('21 10 E', [20, 20]);
    expect(checkIfValid).toBe(false);
})

test('checkPositionInRange \'10 21 E\' in a \'20 20\' world', () => {
    const checkIfValid = checkPositionInRange('10 21 E', [20, 20]);
    expect(checkIfValid).toBe(false);
})

test('checkPositionInRange \'10 10ppp E\' in a \'20 20\' world', () => {
    const checkIfValid = checkPositionInRange('10 10ppp E', [20, 20]);
    expect(checkIfValid).toBe(false);
})

test('checkPositionInRange \'10ppp 10 E\' in a \'20 20\' world', () => {
    const checkIfValid = checkPositionInRange('10ppp 10 E', [20, 20]);
    expect(checkIfValid).toBe(false);
})

test('checkValue world size  \'10 10\' without qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2}$/i;
    const checkIfValid = checkValue('10 10', regex);
    expect(checkIfValid).toEqual({ error: false, value: '10 10' });
})

test('checkValue world size  \'100 10\' without qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2}$/i;
    const checkIfValid = checkValue('100 10', regex);
    expect(checkIfValid).toEqual({error: 'Format error'});
})

test('checkValue world size  \'10 100\' without qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2}$/i;
    const checkIfValid = checkValue('10 100', regex);
    expect(checkIfValid).toEqual({ error: 'Format error' });
})

test('checkValue world size  \'10 pp\' without qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2}$/i;
    const checkIfValid = checkValue('10 pp', regex);
    expect(checkIfValid).toEqual({ error: 'Format error' });
})

test('checkValue world size  \'10 51\' without qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2}$/i;
    const checkIfValid = checkValue('10 51', regex);
    expect(checkIfValid).toEqual({ error: false, value: '10 51' });
})

test('checkValue world size  \'10 10\' with qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2}$/i;
    const checkIfValid = checkValue('10 10', regex, checkWorldInRange);
    expect(checkIfValid).toEqual({ error: false, value: '10 10' });
})

test('checkValue world size  \'10 51\' with qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2}$/i;
    const checkIfValid = checkValue('10 51', regex, checkWorldInRange);
    expect(checkIfValid).toEqual({ error: 'Out of range error' });
})

test('checkValue initial position  \'10 10 E\' without qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2} [nsew]{1}$/i;
    const checkIfValid = checkValue('10 10 E', regex);
    expect(checkIfValid).toEqual({ error: false, value: '10 10 E' });
})

test('checkValue initial position  \'100 10 E\' without qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2} [nsew]{1}$/i;
    const checkIfValid = checkValue('100 10 E', regex);
    expect(checkIfValid).toEqual({ error: 'Format error' });
})

test('checkValue initial position  \'10 100 E\' without qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2} [nsew]{1}$/i;
    const checkIfValid = checkValue('10 100 E', regex);
    expect(checkIfValid).toEqual({ error: 'Format error' });
})

test('checkValue initial position  \'10 ppp E\' without qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2} [nsew]{1}$/i;
    const checkIfValid = checkValue('10 ppp E', regex);
    expect(checkIfValid).toEqual({ error: 'Format error' });
})

test('checkValue initial position  \'10 10 Q\' without qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2} [nsew]{1}$/i;
    const checkIfValid = checkValue('10 10 Q', regex);
    expect(checkIfValid).toEqual({ error: 'Format error' });
})

test('checkValue initial position  \'10 10 E\' with qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2} [nsew]{1}$/i;
    const checkFunction = (valueToCheck) => checkPositionInRange(
        valueToCheck,
        [10, 10]
    )
    const checkIfValid = checkValue('10 10 E', regex, checkFunction);
    expect(checkIfValid).toEqual({ error: false, value: '10 10 E' });
})

test('checkValue initial position  \'11 10 E\' with qualitative check', () => {
    const regex = /^[0-9]{1,2} [0-9]{1,2} [nsew]{1}$/i;
    const checkFunction = (valueToCheck) => checkPositionInRange(
        valueToCheck,
        [10, 10]
    )
    const checkIfValid = checkValue('11 10 E', regex, checkFunction);
    expect(checkIfValid).toEqual({ error: 'Out of range error' });
})

test('checkValue instructions  \'RFRFRFRF\'', () => {
    const regex = /^[lrf]{0,100}$/i;
    const checkIfValid = checkValue('RFRFRFRF', regex);
    expect(checkIfValid).toEqual({ error: false, value: 'RFRFRFRF' });
})

test('checkValue instructions  \'\'', () => {
    const regex = /^[lrf]{0,100}$/i;
    const checkIfValid = checkValue('', regex);
    expect(checkIfValid).toEqual({ error: false, value: '' });
})

test('checkValue instructions  \'ppppppp\'', () => {
    const regex = /^[lrf]{0,100}$/i;
    const checkIfValid = checkValue('ppppppp', regex);
    expect(checkIfValid).toEqual({ error: 'Format error' });
})