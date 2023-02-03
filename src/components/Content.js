import Total from './Total'
import Part from './Part'

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(p => <Part part={p} key={p.id} />)}
            <Total parts={parts} />
        </>
    )
}

export default Content;