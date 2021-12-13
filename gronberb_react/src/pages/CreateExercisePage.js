import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {

    //create state variables for object properties

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    //history hook to return to the home page
    const history = useHistory();

    const createExercise = async () => {
        //define  newExercise object using state variables
        const newExercise = {name, reps, weight, unit, date};
        //use fetch to post newExercise object
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {'Content-Type': 'application/json'}
        });
        //error handling
        if (response.status === 201){
            alert("Successfully created exercise!");
        } else {
            alert(`Failed to create exercise. Status code ${response.status}`);
        }
        //return home
        history.push('/');
    };

    //Create exercise form, maps inputs to new object properties
    return (
        <div>
            <h1>Create Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                placeholder="Enter weight here"
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                value={unit}
                placeholder="Enter unit here"
                onChange={e => setUnit(e.target.value)} />
            <input
                type="text"
                value={date}
                placeholder="Date MM-DD-YY"
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={createExercise}
            >Create</button>
        </div>
    );
};

export default CreateExercisePage;