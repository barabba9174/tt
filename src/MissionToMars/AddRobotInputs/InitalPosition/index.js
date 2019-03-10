import React, {Component} from 'react';
import { string, func, number } from 'prop-types';
import {checkPositionInRange, checkValue} from '../../utils/formsErrors';
import forceUppercase from '../../utils/formUppercase';

export default class InitalPosition extends Component {
    static defaultProps = {
        onSubmit: () => { },
        value: '',
        mapWidth: 0,
        mapHeight: 0
    }

    static propTypes = {
        onSubmit: func,
        value: string,
        mapWidth: number, 
        mapHeight: number
    }

    constructor({value}) {
        super();
        this.state = {
            value,
            error: false
        };
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            const {onSubmit} = this.props;
            const {error, value} = this.state;
            if (!error) onSubmit({value, error})
        }
    }

    handleChange = (event) => {
        const {mapWidth, mapHeight, onSubmit} = this.props;
        const regex = /^[0-9]{1,2} [0-9]{1,2} [nsew]{1}$/i;
        const value = forceUppercase(event);
        const newState = checkValue(
            value,
            regex,
            (valueToCheck) => checkPositionInRange(
                valueToCheck,
                [mapWidth, mapHeight]
            )
        )
        this.setState(newState, () => onSubmit(newState));

    }

    render() {
        const {error} = this.state;
        const {value} = this.props;
        return (
            <label
                htmlFor="position"
                className={`input${ error
                ? ' invalid'
                : ''}`}>
                <input
                    type="text"
                    id="position"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    defaultValue={value}/>
                <div className="error">{error}</div>
                <div className="prepend">Initial position</div>
            </label>
        );
    }
}

