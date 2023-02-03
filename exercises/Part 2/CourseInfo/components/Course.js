import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
    return (
        <div>

            {course.map(c => {
                return (
                    <div key={c.id}>
                        <Header text={c.name} />
                        <Content parts={c.parts} />
                    </div>)
                })}
        </div>
    )
}

export default Course;