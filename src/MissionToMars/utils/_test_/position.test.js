/*eslint-disable */
import { getInitialPosition, robotSteps } from '../position';
import moveRobot from '../move';
import { getFinalPos } from '../quadrant';
import example1 from './jsons/example1.json';
import example2 from './jsons/example2.json';
import example3 from './jsons/example3.json';
import example4 from './jsons/example4.json';
import example5 from './jsons/example5.json';

test('Expect quadrant 0 for \'1 1 E\'', () => {
    const checkPosition = getInitialPosition('1 1 E');
    expect(checkPosition).toEqual({
        x: 1,
        y: 1,
        quadrant: 0
    })
})

test('Expect quadrant 1 for \'1 1 S\'', () => {
    const checkPosition = getInitialPosition('1 1 S');
    expect(checkPosition).toEqual({
        x: 1,
        y: 1,
        quadrant: 1
    })
})

test('Expect quadrant 2 for \'1 1 W\'', () => {
    const checkPosition = getInitialPosition('1 1 W');
    expect(checkPosition).toEqual({
        x: 1,
        y: 1,
        quadrant: 2
    })
})

test('Expect quadrant 3 for \'1 1 N\'', () => {
    const checkPosition = getInitialPosition('1 1 N');
    expect(checkPosition).toEqual({
        x: 1,
        y: 1,
        quadrant: 3
    })
})


const worlsMoveRobotNoPrevLost = ({ x, y, command, quadrant }) => {
    return moveRobot({
        x,
        y,
        command,
        mapWidth: 5,
        mapHeight: 3,
        prevLostPos: [],
        quadrant
    });
}

const worlsMoveRobotPrevLost = ({ x, y, command, quadrant }) => {
    return moveRobot({
        x,
        y,
        command,
        mapWidth: 5,
        mapHeight: 3,
        prevLostPos: [ { x: 3, y: 3 } ],
        quadrant
    });
}

test('Expected steps example 1', () => {
    const checkSteps = robotSteps('1 1 E', 'RFRFRFRF', worlsMoveRobotNoPrevLost);
    expect(checkSteps).toEqual(example1);
    const lastStep = checkSteps[checkSteps.length -1];
    expect(getFinalPos(lastStep)).toBe('1 1 E');
})

test('Expected steps example 1 if is run as second', () => {
    const checkSteps = robotSteps('1 1 E', 'RFRFRFRF', worlsMoveRobotPrevLost);
    expect(checkSteps).toEqual(example1);
    const lastStep = checkSteps[checkSteps.length - 1];
    expect(getFinalPos(lastStep)).toBe('1 1 E');
})

test('Expected steps example 2', () => {
    const checkSteps = robotSteps('3 2 N', 'FRRFLLFFRRFLL', worlsMoveRobotNoPrevLost);
    expect(checkSteps).toEqual(example2);
    const lastStep = checkSteps[checkSteps.length - 1];
    expect(getFinalPos(lastStep)).toBe('3 3 N LOST');
})

test('Expected steps example 2 if is run as third', () => {
    const checkSteps = robotSteps('3 2 N', 'FRRFLLFFRRFLL', worlsMoveRobotPrevLost);
    expect(checkSteps).toEqual(example5);
    const lastStep = checkSteps[checkSteps.length - 1];
    expect(getFinalPos(lastStep)).toBe('3 2 N');
})

test('Expected steps example 3', () => {
    const checkSteps = robotSteps('0 3 W', 'LLFFFLFLFL', worlsMoveRobotPrevLost);
    expect(checkSteps).toEqual(example3);
    const lastStep = checkSteps[checkSteps.length - 1];
    expect(getFinalPos(lastStep)).toBe('2 3 S');
})

test('Expected steps example 3 if is run as second', () => {
    const checkSteps = robotSteps('0 3 W', 'LLFFFLFLFL', worlsMoveRobotNoPrevLost);
    expect(checkSteps).toEqual(example4);
    const lastStep = checkSteps[checkSteps.length - 1];
    expect(getFinalPos(lastStep)).toBe('3 3 N LOST');
})