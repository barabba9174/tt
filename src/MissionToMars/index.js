import React, {Component} from 'react';
import {getQuadrantFromOrientation, getFinalPos} from './utils/quadrant';
import colors from './utils/colors';
import moveRobot from './utils/move';
import ResultTable from './ResultTable';
import World from './World';
import Robot from './Robot';
import WorldInput from './WorldInput';
import AddRobot from './AddRobot';

const multiplier = 23;
const time = 1000;

class MissionToMars extends Component {
    static defaultProps = {}

    constructor() {
        super();
        this.state = {
            mapWidth: 0,
            mapHeight: 0,
            prevLostPos: [],
            robots: [],
            mapReady: false
        };
    }

    handleCreateMap = (marsMap) => {
        const newSize = marsMap
            .split(' ')
            .map(el => Number(el));
        this.setState({mapWidth: newSize[0], mapHeight: newSize[1], robots: [], prevLostPos: [], mapReady: true});
    }

    handleResetMap = () => {
        this.setState({mapWidth: 0, mapHeight: 0, robots: [], prevLostPos: [], mapReady: false});
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

    handleAddRobot = (robotPosition, robotInstructions) => {
        const {robots, prevLostPos} = this.state;

        const newPosition = robotPosition.split(' ');
        const robotPosX = Number(newPosition[0]);
        const robotPosY = Number(newPosition[1]);
        const robotQuadrant = getQuadrantFromOrientation(newPosition[2]);

        const steps = robotInstructions
            .split('')
            .reduce((accumulator, command) => {
                const prevPos = accumulator[accumulator.length - 1];
                const newPos = this.moveRobot({
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
                    x: robotPosX,
                    y: robotPosY,
                    quadrant: robotQuadrant
                }
            ]);

        const lastState = steps[steps.length - 1];

        const {lost, x, y} = lastState;
        const addLost = lost
            ? [
                {
                    x,
                    y
                }
            ]
            : [];

        const index = robots.length;
        const initialState = steps[0] || {};

        this.setState({
            robots: [
                ...robots, {
                    ...initialState,
                    name: `Robot #${index}`,
                    color: colors[index],
                    startPos: robotPosition,
                    endPos: getFinalPos(lastState),
                    instructions: robotInstructions,
                    lost,
                    steps
                }
            ],
            prevLostPos: [
                ...prevLostPos,
                ...addLost
            ]
        });
    }



    render() {
        const {mapWidth, mapHeight, prevLostPos, robots, mapReady} = this.state;

        return (

            <div>
                <h1 className="Heading">Mission to Mars</h1>

                <div className="grid">
                    <WorldInput
                      onChange={this.handleResetMap}
                      onSubmit={this.handleCreateMap}/>
                      {mapReady && <AddRobot
                        onSubmit={this.handleAddRobot}
                        mapWidth={mapWidth}
                        mapHeight={mapHeight}/>
                      }
                </div>

                {mapReady && (
                    <div>

                        <ResultTable robots={robots}/>

                        <World
                          mapWidth={mapWidth}
                          mapHeight={mapHeight}
                          multiplier={multiplier}
                        >

                            {robots.map((robot, index) => (<Robot
                                key={`robotsprite${index}`}
                                {...robot}
                                mapWidth={mapWidth}
                                mapHeight={mapHeight}
                                multiplier={multiplier}
                                delay={0}
                                time={time}
                                prevLostPos={prevLostPos}/>))
                            }

                        </World>

                    </div>
                )}

            </div>
        );
    }
}

export default MissionToMars;
