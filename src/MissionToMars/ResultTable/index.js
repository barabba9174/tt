import React from 'react';
import { arrayOf, shape } from 'prop-types';


const ResultTable = ({ robots }) => robots.length ? (
    <table className="table">
        <thead>
            <tr>
                <th>
                    Robot name
                </th>
                <th>
                    Robot initial position
                </th>
                <th>
                    Robot instructions
                </th>
                <th>
                    Robot final position
                </th>
            </tr>
        </thead>
        <tbody>
            {robots.map((robot, i) => (
                <tr key={`robotRow${i}`}>
                    <td style={{
                        color: robot.color
                    }}>{robot.name}</td>
                    <td>{robot.startPos}</td>
                    <td>{robot.instructions}</td>
                    <td
                        style={{
                        color: robot.lost
                            ? 'red'
                            : 'black'
                    }}>{robot.endPos}</td>
                </tr>
            ))
}
        </tbody>

    </table>
) : null;

ResultTable.propTypes = {
    robots: arrayOf(shape({}))
};

ResultTable.defaultProps = {
    robots: undefined
};


export default ResultTable;
