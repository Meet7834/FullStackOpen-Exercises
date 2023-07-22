import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Anecdote = ({ text, votesCount }) => <div><p>Anecdotes: {text}</p><p>Votes: {votesCount}</p></div>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const MostVoted = ({ anecdotes, allVotes }) => {
    const higestScore = Math.max(...allVotes);
    const mostVotedIndex = allVotes.indexOf(Math.max(...allVotes));
    const mostVotedAnecdote = anecdotes[mostVotedIndex];
    if (higestScore === 0) return <p>No Votes yet.</p>
    return (
        <div>
            <p>Most Voted Anecdote: {mostVotedAnecdote}</p>
            <p>Votes: {higestScore}</p>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]
    
    const handleVoteClick = () => {
        const newAllVotes = [...allVotes]
        newAllVotes[selected] += 1
        setAllVotes(newAllVotes)
    }

    const handleAnecdoteClick = () => {
        const arrayIndex = Math.floor(Math.random() * anecdotes.length)
        setSelected(arrayIndex)
    }

    const [selected, setSelected] = useState(0);
    const [allVotes, setAllVotes] = useState(Array(8).fill(0))

    return (
        <div>
            <Header text='Ancedote of the day!' />
            <Anecdote text={anecdotes[selected]} votesCount={allVotes[selected]} />

            <Button text='Next' handleClick={handleAnecdoteClick} />
            <Button text='Vote' handleClick={handleVoteClick} />

            <Header text='Most voted Ancedote' />
            <MostVoted anecdotes={anecdotes} allVotes={allVotes} />
        </div>
    )
}

export default App;