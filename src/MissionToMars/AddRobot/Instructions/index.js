import React, {Component} from 'react';
import { string, func } from 'prop-types';
import { checkValue} from '../../utils/formsErrors';
import forceUppercase from '../../utils/formUppercase';


class Instructions extends Component {
    static defaultProps = {
        onSubmit: () => { },
        value: ''
    }

    static propTypes = {
        onSubmit: func,
        value: string,
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
        const regex = /^[lrf]{0,100}$/i;
        const {onSubmit} = this.props;
        const value = forceUppercase(event);
        const newState = checkValue(
            value,
            regex
        )
        this.setState(newState, () => onSubmit(newState));
    }

    render() {
        const {value} = this.props;
        const {error} = this.state;
        return (
            <label
                htmlFor="instructions"
                className={`input${ error
                ? ' invalid'
                : ''}`}>
                <input
                    type="text"
                    id="instructions"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    defaultValue={value}/>
                <div className="error">{error}</div>
                <div className="prepend">Instructions</div>
            </label>
        );
    }
}

export default Instructions;
