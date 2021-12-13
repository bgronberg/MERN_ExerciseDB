import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({setExerciseToEdit}) {
    //define state variables
    const [exercises, setExercises] = useState([]);
    //history hook to return home
    const history = useHistory();


    //uses fetch to find and delete record using _id property. Status code 204 for success, otherwise, log failure
    const onDelete = async _id => {
        if (!window.confirm("Press OK to delete record")){
            return
        }
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if (response.status === 204){
            const newExercises = exercises.filter(m => m._id !== _id);
            setExercises(newExercises);
        } else{
            console.error(`Failed to delete exercise with _id=${_id}, status code = ${response.status}`);
        }
    };

    //passes exercise object down to ExerciseList component
    const onEdit = exercise =>{
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, [] );

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link to="/create-exercise">Add an exercise</Link>
        </>
    );
}

export default HomePage;