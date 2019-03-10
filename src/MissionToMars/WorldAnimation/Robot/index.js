
import React, {Component} from 'react';
import { number, arrayOf, shape, string } from 'prop-types';
import RobotSprite from './RobotSprite';

export default class Robot extends Component {
    static defaultProps = {
        x: 0,
        y: 0,
        quadrant: 0,
        steps: [],
        delay: 0,
        time: 2000,
        multiplier: 20,
        color: 'transparent',
        mapHeight: '0'
    }

    static propTypes = {
        x: number,
        y: number,
        quadrant: number,
        steps: arrayOf(shape({})),
        delay: number,
        time: number,
        multiplier: number,
        color: string,
        mapHeight: number
    }

    constructor({x, y, quadrant}) {
        super();
        this.state = {
            x,
            y,
            quadrant,
            lost: false,
            visible: false
        };
    }

    componentDidMount() {
        this.mounted = true;
        this.handleAnimation();
    }

    componentWillUnmount() {
        this.mounted = false;
        clearTimeout(this.timer);
    }

    handleAnimation = () => {
        const {
            steps,
            delay,
            time
        } = this.props;
        steps.map((step, index) => {
            this.timer = setTimeout(() => this.mounted && this.setState({
                ...step,
                visible: true
            }), delay * time + (time * index), index);
            return true;
        });
    }

    render() {
        const {multiplier, color, mapHeight} = this.props;

        const {x, y, quadrant, lost, visible} = this.state;

        return (
            <div
                style={{
                position: 'absolute',
                left: `${x * multiplier}px`,
                top: `${ (mapHeight - y) * multiplier}px`,
                transform: `translate(0, 0) rotate(${quadrant * 90}deg)`,
                width: `${multiplier - 3}px`,
                height: `${multiplier - 3}px`,
                opacity: `${lost
                    ? 0.5
                    : 1}`,
                transition: 'all 200ms',
                visibility: visible
                    ? 'visible'
                    : 'hidden'
            }}>
                <RobotSprite
                    width={`${multiplier - 3}`}
                    height={`${multiplier - 3}`}
                    color={color}/>
            </div>
        );
    }
}

