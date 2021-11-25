import React from "react";
import Person from "./person";

const People = ({ filter, people, onDelete }) => {

    const filteredPeople = people.filter(person =>
        person.name?.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            {filteredPeople.map((item, id) => (
                <Person key={id} person={item} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default People;