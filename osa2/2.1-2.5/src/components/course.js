import React from "react";

const Course = ({course}) => {
    return (
        <div>
            <Header course = {course}/>
            <Content course = {course}/>
        </div>
    )
}

const Header = ({course}) => {
    return (
        <div>
            <h3>{course.name}</h3>
        </div>
    )
}

const Content = ({course}) => {
    return (
        <div>
            {course.parts.map((item) =>
                <Part key={item.id} name={item.name} exercises={item.exercises}/>
                )}
            <h4>Total number of exercises: {course.parts.reduce((total, part) =>
            { return total + part.exercises },0)}</h4>
        </div>
    )
}

const Part = ({name, exercises}) => {
    return (
        <div>
            <p>{name} - {exercises} exercises</p>
        </div>
    )
}

export default Course;