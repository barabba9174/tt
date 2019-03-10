/*eslint-disable */

import { getQuadrantFromOrientation, getOrientationFromQuadrant, getForwardCoordsFromQuadrant, normalizeQuadrant, getFinalPos} from '../quadrant';

test('getQuadrantFromOrientation East', () => {
    const checkQuadrant = getQuadrantFromOrientation('E');
    expect(checkQuadrant).toBe(0);
})

test('getQuadrantFromOrientation South', () => {
    const checkQuadrant = getQuadrantFromOrientation('S');
    expect(checkQuadrant).toBe(1);
})

test('getQuadrantFromOrientation West', () => {
    const checkQuadrant = getQuadrantFromOrientation('W');
    expect(checkQuadrant).toBe(2);
})

test('getQuadrantFromOrientation North', () => {
    const checkQuadrant = getQuadrantFromOrientation('N');
    expect(checkQuadrant).toBe(3);
})

test('getOrientationFromQuadrant 0', () => {
    const checkOrientation = getOrientationFromQuadrant(0);
    expect(checkOrientation).toBe('E');
})

test('getOrientationFromQuadrant 1', () => {
    const checkOrientation = getOrientationFromQuadrant(1);
    expect(checkOrientation).toBe('S');
})

test('getOrientationFromQuadrant 2', () => {
    const checkOrientation = getOrientationFromQuadrant(2);
    expect(checkOrientation).toBe('W');
})

test('getOrientationFromQuadrant 3', () => {
    const checkOrientation = getOrientationFromQuadrant(3);
    expect(checkOrientation).toBe('N');
})

test('getOrientationFromQuadrant out of range', () => {
    const checkOrientation = getOrientationFromQuadrant(5);
    expect(checkOrientation).toBe('-');
})


test('getForwardCoordsFromQuadrant 0', () => {
    const checkCoords = getForwardCoordsFromQuadrant(0, 1, 1);
    expect(checkCoords).toEqual({
        x: 2,
        y: 1
    });
})

test('getForwardCoordsFromQuadrant 1', () => {
    const checkCoords = getForwardCoordsFromQuadrant(1, 1, 1);
    expect(checkCoords).toEqual({
        x: 1,
        y: 0
    });
})

test('getForwardCoordsFromQuadrant 2', () => {
    const checkCoords = getForwardCoordsFromQuadrant(2, 1, 1);
    expect(checkCoords).toEqual({
        x: 0,
        y: 1
    });
})

test('getForwardCoordsFromQuadrant 3', () => {
    const checkCoords = getForwardCoordsFromQuadrant(3, 1, 1);
    expect(checkCoords).toEqual({
        x: 1,
        y: 2
    });
})

test('normalizeQuadrant 3', () => {
    const checkQuadrant = normalizeQuadrant(3);
    expect(checkQuadrant).toBe(3);
})

test('normalizeQuadrant 55', () => {
    const checkQuadrant = normalizeQuadrant(55);
    expect(checkQuadrant).toBe(3);
})
test('getFinalPos 1-1 0', () => {
    const checkString = getFinalPos({
        x: 1,
        y: 1,
        quadrant: 0
    });
    expect(checkString).toBe('1 1 E');
})

test('getFinalPos 1-1 1', () => {
    const checkString = getFinalPos({
        x: 1,
        y: 1,
        quadrant: 1
    });
    expect(checkString).toBe('1 1 S');
})

test('getFinalPos 1-1 2', () => {
    const checkString = getFinalPos({
        x: 1,
        y: 1,
        quadrant: 2
    });
    expect(checkString).toBe('1 1 W');
})

test('getFinalPos 1-1 3', () => {
    const checkString = getFinalPos({
        x: 1,
        y: 1,
        quadrant: 3
    });
    expect(checkString).toBe('1 1 N');
})

test('getFinalPos 1-1 3 lost', () => {
    const checkString = getFinalPos({
        x: 1,
        y: 1,
        quadrant: 3,
        lost: true
    });
    expect(checkString).toBe('1 1 N LOST');
})