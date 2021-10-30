import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
    const total = props.good + props.neutral + props.bad;
    const average = (props.good - props.bad) / total;
    const positive = (props.good * 100) / total + ' %';

    if (total !== 0) {
        return (
            <div>
                <table>
                    <tbody>
                    <StatisticLine text='Hyvä' value={props.good}/>
                    <StatisticLine text='Neutraali' value={props.neutral}/>
                    <StatisticLine text='Huono' value={props.bad}/>
                    <StatisticLine text='Yhteensä' value={total}/>
                    <StatisticLine text='Keskiarvo' value={average}/>
                    <StatisticLine text='Positiiviset' value={positive}/>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>Anna palautetta:</h2>
            <Button handleClick={() => setGood(good + 1)} text='Hyvä'/>
            <Button handleClick={() => setNeutral(neutral + 1)} text='Neutraali'/>
            <Button handleClick={() => setBad(bad + 1)} text='Huono'/>

            <h2>Statistiikka:</h2>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))