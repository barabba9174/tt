export const getQuadrantFromOrientation = (orientation) => {
    switch (orientation) {
        case 'E':
            return 0;
        case 'S':
            return 1;
        case 'W':
            return 2;
        case 'N':
            return 3;
        default:
            return -1;
    }
};

export const getOrientationFromQuadrant = (quadrant) => {
    switch (quadrant) {
        case 0:
            return 'E';
        case 1:
            return 'S';
        case 2:
            return 'W';
        case 3:
            return 'N';
        default:
            return '-';
    }
};

export const getForwardCoordsFromQuadrant = (quadrant, x, y) => {
    switch (quadrant) {
        case 0:
            return {
                x: x + 1,
                y
            };
        case 1:
            return {
                x,
                y: y - 1
            };
        case 2:
            return {
                x: x - 1,
                y
            };
        case 3:
            return {
                x,
                y: y + 1
            };
        default:
            return {x: -1, y: -1};
    }
};

export const normalizeQuadrant = quadrant => (quadrant % 4);

export const getFinalPos = ({x, y, quadrant, lost}) => `${x} ${y} ${getOrientationFromQuadrant(quadrant)}${lost
    ? ' LOST'
    : ''}`;
