import React, {Component} from 'react';
import {func, number} from 'prop-types';

import InitialPosition from './InitalPosition';
import Instructions from './Instructions';

export default class AddRobotInputs extends Component {
    static defaultProps = {
        onSubmit: () => { },
        mapWidth: 0,
        mapHeight: 0
    }

    static propTypes = {
        onSubmit: func,
        mapWidth: number,
        mapHeight: number
    }

    constructor() {
        super();
        this.state = {
            intructions: {
                value: ''
            },
            position: {
                value: '0 0 E'
            }
        };
    }

    handleSubmit = (value) => {
        this.setState(value);
    }

    render() {
        const {onSubmit, mapWidth, mapHeight} = this.props;
        const {intructions, position} = this.state;
        return (
            <div className="row flex-align-end">
                <div className="cell-12 mt-2">
                    <h3 className="heading">Add robot</h3>
                </div>
                <div className="cell-10">
                    <InitialPosition
                        mapWidth={mapWidth}
                        mapHeight={mapHeight}
                        onSubmit={(value) => this.handleSubmit({position: value})}
                        value={position.value}
                    />
                    <Instructions
                        value={intructions.value}
                        onSubmit={(value) => this.handleSubmit({ intructions: value })}
                    />
                </div>
                <div className="cell-2 mb-2">
                    <button
                        type="button"
                        disabled={intructions.error || position.error}
                        className="button primary"
                        onClick={() => onSubmit(position.value, intructions.value)}>Add</button>
                </div>

            </div>
        );
    }
}
