import React from 'react';
import { arrayOf, shape, number } from 'prop-types';
import World from './World';
import Robot from './Robot';

const WorldAnimation = ({ robots, mapWidth, mapHeight, multiplier, time }) => (
    <World
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        multiplier={multiplier}
    >
        {robots.map((robot, index) => (<Robot
            key={`robotsprite${index}`}
            {...robot}
            mapHeight={mapHeight}
            multiplier={multiplier}
            time={time} />))
        }
    </World>
);

WorldAnimation.propTypes = {
    robots: arrayOf(shape({})),
    mapHeight: number,
    mapWidth: number, 
    multiplier: number,
    time: number
};

WorldAnimation.defaultProps = {
    robots: undefined,
    mapHeight: 0,
    mapWidth: 0,
    multiplier: 20,
    time: 0
};


export default WorldAnimation;
