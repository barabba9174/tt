/*eslint-disable */
import move from '../move';

test('Move left from quadrant 0 has quadrant 3 and no coords changes', () => {
    const checkMove = move({ x: 0, y: 0, command: 'L', mapWidth: 0, mapHeight: 0, prevLostPos: [], quadrant: 0});
    expect(checkMove).toEqual({ 
        command: 'L',
        quadrant: 3, 
        x: 0, 
        y: 0 
    })
})
test('Move left from quadrant 1 has quadrant 0 and no coords changes', () => {
    const checkMove = move({ x: 0, y: 0, command: 'L', mapWidth: 0, mapHeight: 0, prevLostPos: [], quadrant: 1 });
    expect(checkMove).toEqual({
        command: 'L',
        quadrant: 0,
        x: 0,
        y: 0
    })
})
test('Move left from quadrant 2 has quadrant 1 and no coords changes', () => {
    const checkMove = move({ x: 0, y: 0, command: 'L', mapWidth: 0, mapHeight: 0, prevLostPos: [], quadrant: 2 });
    expect(checkMove).toEqual({
        command: 'L',
        quadrant: 1,
        x: 0,
        y: 0
    })
})
test('Move left from quadrant 3 has quadrant 2 and no coords changes', () => {
    const checkMove = move({ x: 0, y: 0, command: 'L', mapWidth: 0, mapHeight: 0, prevLostPos: [], quadrant: 3 });
    expect(checkMove).toEqual({
        command: 'L',
        quadrant: 2,
        x: 0,
        y: 0
    })
})
test('Move right from quadrant 0 has quadrant 1 and no coords changes', () => {
    const checkMove = move({ x: 0, y: 0, command: 'R', mapWidth: 0, mapHeight: 0, prevLostPos: [], quadrant: 0 });
    expect(checkMove).toEqual({
        command: 'R',
        quadrant: 1,
        x: 0,
        y: 0
    })
})
test('Move right from quadrant 1 has quadrant 2 and no coords changes', () => {
    const checkMove = move({ x: 0, y: 0, command: 'R', mapWidth: 0, mapHeight: 0, prevLostPos: [], quadrant: 1 });
    expect(checkMove).toEqual({
        command: 'R',
        quadrant: 2,
        x: 0,
        y: 0
    })
})
test('Move right from quadrant 2 has quadrant 3 and no coords changes', () => {
    const checkMove = move({ x: 0, y: 0, command: 'R', mapWidth: 0, mapHeight: 0, prevLostPos: [], quadrant: 2 });
    expect(checkMove).toEqual({
        command: 'R',
        quadrant: 3,
        x: 0,
        y: 0
    })
})
test('Move right from quadrant 3 has quadrant 0 and no coords changes', () => {
    const checkMove = move({ x: 0, y: 0, command: 'R', mapWidth: 0, mapHeight: 0, prevLostPos: [], quadrant: 3 });
    expect(checkMove).toEqual({
        command: 'R',
        quadrant: 0,
        x: 0,
        y: 0
    })
})
test('Move forward (no previous lost) from quadrant 0 in a 0-0 world in shoud be lost', () => {
    const checkMove = move({ x: 0, y: 0, command: 'F', mapWidth: 0, mapHeight: 0, prevLostPos: [], quadrant: 0 });
    expect(checkMove).toEqual({
        command: 'F',
        quadrant: 0,
        x: 0,
        y: 0,
        lost: true
    })
})
test('Move forward with a robot lost in the same position from quadrant 0  in a 0-0 world in shoudn\'t be lost', () => {
    const checkMove = move({ x: 0, y: 0, command: 'F', mapWidth: 0, mapHeight: 0, prevLostPos: [{ x: 0, y: 0 }], quadrant: 0 });
    expect(checkMove).toEqual({
        command: 'F',
        quadrant: 0,
        x: 0,
        y: 0
    })
})
test('Move forward from a quadrant 0 increase x of 1', () => {
    const checkMove = move({ x: 0, y: 0, command: 'F', mapWidth: 1, mapHeight: 1, prevLostPos: [], quadrant: 0 });
    expect(checkMove).toEqual({
        command: 'F',
        quadrant: 0,
        x: 1,
        y: 0
    })
})
test('Move forward from a quadrant 3 increase y of 1', () => {
    const checkMove = move({ x: 0, y: 0, command: 'F', mapWidth: 1, mapHeight: 1, prevLostPos: [], quadrant: 3 });
    expect(checkMove).toEqual({
        command: 'F',
        quadrant: 3,
        x: 0,
        y: 1
    })
})
test('Move forward from a quadrant 1 decrease y of 1', () => {
    const checkMove = move({ x: 1, y: 1, command: 'F', mapWidth: 1, mapHeight: 1, prevLostPos: [], quadrant: 1 });
    expect(checkMove).toEqual({
        command: 'F',
        quadrant: 1,
        x: 1,
        y: 0
    })
})
test('Move forward from a quadrant 2 decrease x of 1', () => {
    const checkMove = move({ x: 1, y: 1, command: 'F', mapWidth: 1, mapHeight: 1, prevLostPos: [], quadrant: 2 });
    expect(checkMove).toEqual({
        command: 'F',
        quadrant: 2,
        x: 0,
        y: 1
    })
})