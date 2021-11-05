import React from "react";
import Person from "./person";

const Persons = ({ filter, persons, onDelete }) => {
    const filteredPersons = persons.filter(person =>
        person.name?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            {filteredPersons.map((item, id) => (
                <Person key={id} person={item} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default Persons;