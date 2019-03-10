/*eslint-disable */
import checkFinalPosition from '../lost';

test('Check position without moving', () => {
    const checkLost = checkFinalPosition({
        newX: 0,
        newY: 0,
        x: 0,
        y: 0, 
        mapWidth: 10,
        mapHeight: 10,
        prevLostPos: []
    });
    expect(checkLost).toEqual({
        x: 0,
        y: 0
    })
})


test('Check position  after moving east', () => {
    const checkLost = checkFinalPosition({
        newX: 1,
        newY: 0,
        x: 0,
        y: 0,
        mapWidth: 10,
        mapHeight: 10,
        prevLostPos: []
    });
    expect(checkLost).toEqual({
        x: 1,
        y: 0
    })
})

test('Check position  after moving north', () => {
    const checkLost = checkFinalPosition({
        newX: 0,
        newY: 1,
        x: 0,
        y: 0,
        mapWidth: 10,
        mapHeight: 10,
        prevLostPos: []
    });
    expect(checkLost).toEqual({
        x: 0,
        y: 1
    })
})

test('Check position  after moving south return lost from 0 0', () => {
    const checkLost = checkFinalPosition({
        newX: 0,
        newY: -1,
        x: 0,
        y: 0,
        mapWidth: 10,
        mapHeight: 10,
        prevLostPos: []
    });
    expect(checkLost).toEqual({
        x: 0,
        y: 0,
        lost: true
    })
})

test('Check position  after moving west return lost from 0 0', () => {
    const checkLost = checkFinalPosition({
        newX: -1,
        newY: 0,
        x: 0,
        y: 0,
        mapWidth: 10,
        mapHeight: 10,
        prevLostPos: []
    });
    expect(checkLost).toEqual({
        x: 0,
        y: 0,
        lost: true
    })
})

test('Check position  after moving south not return lost from 0 0 if there is an other robot lost on the same place', () => {
    const checkLost = checkFinalPosition({
        newX: 0,
        newY: -1,
        x: 0,
        y: 0,
        mapWidth: 10,
        mapHeight: 10,
        prevLostPos: [{ x: 0, y: 0 }]
    });
    expect(checkLost).toEqual({
        x: 0,
        y: 0
    })
})