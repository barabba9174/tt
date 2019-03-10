import {getForwardCoordsFromQuadrant, normalizeQuadrant} from './quadrant';
import getLostPosition from './lost';

export default ({
    x,
    y,
    command,
    mapWidth,
    mapHeight,
    prevLostPos,
    quadrant
}) => {
    switch (command) {
        case 'L':
            return {
                x,
                y,
                quadrant: normalizeQuadrant(3 + quadrant),
                command
            };
        case 'R':
            return {
                x,
                y,
                quadrant: normalizeQuadrant(1 + quadrant),
                command
            };
        case 'F': {

            const {x: newX, y: newY} = getForwardCoordsFromQuadrant(quadrant, x, y);

            const finalPosition = getLostPosition({
                x,
                y,
                newX,
                newY,
                mapWidth,
                mapHeight,
                prevLostPos
            });

            if (finalPosition.lost) {
                return {x, y, quadrant, command, lost: true};
            }

            return {
                ...finalPosition,
                quadrant,
                command
            };
        }
        default:
            return {x, y, quadrant, command: 'wrong'};
    }
};
