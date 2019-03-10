import React from 'react';
import {
    string,
    oneOfType,
    number,
    node,
    arrayOf,
    shape,
    func} from 'prop-types';

const multiplier = 23;
const World = ({mapHeight, mapWidth, children}) => (
    <div
        style={{
        width: `${multiplier * (mapWidth + 1)}px`,
        height: `${multiplier * (mapHeight + 1)}px`,
        border: '1px solid black',
        position: 'relative',
        pageBreakInside: 'never',
        margin: '0 auto'
    }}>
        {Array
            .from(Array(mapWidth + 1))
            .map((el, i) => (<div
                style={{
                position: 'absolute',
                left: '-1px',
                top: 0,
                bottom: 0,
                borderRight: '1px solid black',
                width: `${i * multiplier}px`
            }}
                key={`lineX${i}`}/>))}

        {Array
            .from(Array(mapHeight + 1))
            .map((el, i) => (<div
                style={{
                position: 'absolute',
                top: '-1px',
                left: 0,
                right: 0,
                borderBottom: '1px solid black',
                height: `${i * multiplier}px`
            }}
                key={`lineY${i}`}/>))}
        {children}

    </div>
);


World.propTypes = {
    mapHeight: number, 
    mapWidth: number, 
    children: oneOfType([
        node,
        arrayOf(shape({})),
        string,
        shape({}),
        func
        ]),
};

World.defaultProps = {
    mapHeight: 0,
    mapWidth: 0,
    children: undefined
};

export default World;
