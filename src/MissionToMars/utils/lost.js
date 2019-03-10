export default ({
    newX,
    newY,
    x,
    y,
    mapWidth,
    mapHeight,
    prevLostPos
}) => {
    const validX = newX >= 0 && newX <= mapWidth;
    const validY = newY >= 0 && newY <= mapHeight;

    if (!validX || !validY) {
        const wasPrevLost = prevLostPos.find(pos => (pos.x === x && pos.y === y));
        const isLost = !wasPrevLost
            ? {
                lost: true
            }
            : {};
        return {
            x,
            y,
            ...isLost
        };
    }
    return {x: newX, y: newY};
};
