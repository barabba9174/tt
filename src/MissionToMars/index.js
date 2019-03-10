import React, { Component } from 'react';
import { getFinalPos } from './utils/quadrant';
import colors from './utils/colors';
import moveRobot from './utils/move';
import { robotSteps } from './utils/position';
import ResultTable from './ResultTable';
import WorldInput from './WorldInput';
import AddRobotInputs from './AddRobotInputs';
import WorldAnimation from './WorldAnimation';

const multiplier = 23;
const time = 1000;

const initialState = {
    mapWidth: 0,
    mapHeight: 0,
    mapReady: false,
    prevLostPos: [],
    robots: []
}

export default class MissionToMars extends Component {

    constructor() {
        super();
        this.state = initialState;
    }

    handleCreateMap = (marsMap) => {
        const newSize = marsMap
            .split(' ')
            .map(el => Number(el));
        this.setState({
            ...initialState,
            mapWidth: newSize[0],
            mapHeight: newSize[1],
            mapReady: true
        });
    }

    handleResetMap = () => {
        this.setState(initialState);
    }

    moveRobot = ({x, y, command, quadrant}) => {
        const {mapWidth, mapHeight, prevLostPos} = this.state;
        return moveRobot({
            x,
            y,
            command,
            mapWidth,
            mapHeight,
            prevLostPos,
            quadrant
        });
    }

    handleAddRobot = (startPos, instructions) => {
        const { robots, prevLostPos } = this.state;

        const steps = robotSteps(startPos, instructions, this.moveRobot);
        const lastRobotState = steps[steps.length - 1];
        const initialRobotState = steps[0];

        const { lost, x, y } = lastRobotState;

        const addLostPos = lost
            ? [{ x, y }]
            : [];

        const index = robots.length;
        
        this.setState({
            robots: [
                ...robots, {
                    ...initialRobotState,
                    name: `Robot #${index}`,
                    color: colors[index],
                    startPos,
                    endPos: getFinalPos(lastRobotState),
                    instructions,
                    lost,
                    steps
                }
            ],
            prevLostPos: [
                ...prevLostPos,
                ...addLostPos
            ]
        });
    }

    render() {
        const { 
            mapWidth, 
            mapHeight, 
            robots, 
            mapReady 
        } = this.state;

        return (

            <div>
                <h1 className="Heading">Mission to Mars</h1>

                <div className="grid">
                    <WorldInput
                      onChange={this.handleResetMap}
                      onSubmit={this.handleCreateMap}
                    />
                    {mapReady && <AddRobotInputs
                        onSubmit={this.handleAddRobot}
                        mapWidth={mapWidth}
                        mapHeight={mapHeight}/>
                    }
                </div>

                {mapReady && (
                    <div>

                        <ResultTable robots={robots}/>

                        <WorldAnimation
                            mapWidth={mapWidth}
                            mapHeight={mapHeight}
                            multiplier={multiplier}
                            robots={robots}
                            time={time}
                        />

                    </div>
                )}

            </div>
        );
    }
}

