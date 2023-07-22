import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatsLine = ({ data, text }) => {
    return (
        <>
            <td>{text}</td>
            <td>{data}</td>
        </>
    )
}

const Statistics = ({ good, bad, neutral }) => {

    const total = (good + bad + neutral);
    const avg = (good - bad) / (total);
    const positive = (good) / (total);
    if (total === 0) return <h4>No feedback is been given yet.</h4>

    return (
        <table>
            <tbody>
                <tr><StatsLine data={good} text='Good' /></tr>
                <tr><StatsLine data={neutral} text='Neutral' /></tr>
                <tr><StatsLine data={bad} text='Bad' /></tr>
                <tr><StatsLine data={total} text='Total' /></tr>
                <tr><StatsLine data={avg} text='Avarage' /></tr>
                <tr><StatsLine data={positive} text='Positive' /></tr>
            </tbody>
        </table>
    )
}

const App = () => {

    const [good, setGood] = useState(0);
    const [bad, setBad] = useState(0);
    const [neutral, setNeutral] = useState(0);

    const incGood = () => setGood(good + 1);
    const incBad = () => setBad(bad + 1);
    const incNeutral = () => setNeutral(neutral + 1);

    return (
        <div>

            <Header text='Give Feedback' />

            <Button handleClick={incGood} text='Good' />
            <Button handleClick={incBad} text='Bad' />
            <Button handleClick={incNeutral} text='Neutral' />

            <Header text='Statistics' />
            <Statistics good={good} bad={bad} neutral={neutral} />

        </div>
    )
}

export default App;