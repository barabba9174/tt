import React, {Component} from 'react';
import {
    func,
} from 'prop-types';

import {checkWorldInRange, checkValue} from '../utils/formsErrors';
import forceUppercase from '../utils/formUppercase';

export default class WorldInput extends Component {
    static defaultProps = {
        onSubmit: () => {},
        onChange: () => {}
    }

    static propTypes = {
        onSubmit: func,
        onChange: func
    }

    constructor() {
        super();
        this.state = {
            value: '0 0',
            error: false
        };
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            const {onSubmit} = this.props;
            const {error, value} = this.state;
            if (!error) onSubmit(value)
        }
    }

    handleChange = (event) => {
        const regex = /^[0-9]{1,2} [0-9]{1,2}$/i;
        const {onChange} = this.props;
        const value = forceUppercase(event);
        const newState = checkValue(
            value,
            regex,
            checkWorldInRange
        )
        this.setState(newState, onChange);
    }

    render() {
        const {onSubmit} = this.props;
        const {value, error} = this.state;
        return (
            <div className="row">
                <div className="cell-12 mt-2">
                    <h2 className="heading">Add world size</h2>
                </div>
                <div className="cell-10">
                    <label
                        htmlFor="world"
                        className={`input${ error
                        ? ' invalid'
                        : ''}`}>
                        <input
                            type="text"
                            id="world"
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                            defaultValue={value}/>
                        <div className="error">{error}</div>
                        <div className="prepend">World size</div>
                    </label>
                </div>

                <div className="cell-2">
                    <button
                        disabled={!!error}
                        type="button"
                        className="button primary"
                        onClick={() => onSubmit(value)}>Create</button>
                </div>

            </div>
        );
    }
}

