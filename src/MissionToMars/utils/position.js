import { getQuadrantFromOrientation } from './quadrant';

export const getInitialPosition = (robotPosition) => {
    const newPosition = robotPosition.split(' ');
    return {
        x: Number(newPosition[0]),
        y: Number(newPosition[1]),
        quadrant: getQuadrantFromOrientation(newPosition[2])
    }

}

export const robotSteps = (robotPosition, robotInstructions, moveRobot) => {
    const { x, y, quadrant } = getInitialPosition(robotPosition);

    return robotInstructions
        .split('')
        .reduce((accumulator, command) => {
            const prevPos = accumulator[accumulator.length - 1];
            const newPos = moveRobot({
                ...prevPos,
                command
            });
            return prevPos.lost
                ? accumulator
                : ([
                    ...accumulator,
                    newPos
                ]);
        }, [
                {
                    x,
                    y,
                    quadrant
                }
            ]);
}