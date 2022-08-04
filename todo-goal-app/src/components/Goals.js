import {handleAddGoal, handleDeleteGoal} from '../actions/goals';
import React from 'react';
import List from './List';
import { connect } from 'react-redux';

const Goals = (props) => {
    const inputRef = React.useRef();

    const addItem = (e) => {
      e.preventDefault();
      props.dispatch(
        handleAddGoal(
          inputRef.current.value,
          () => (inputRef.current.value = "")
        )
      );
    };

    const removeItem = (goal) => {
      props.dispatch(handleDeleteGoal(goal));
    };

    return (
      <div>
        <h1>Goals</h1>
        <input type="text" placeholder="Add Goal" ref={inputRef} />
        <button onClick={addItem}>Add Goal</button>

        <List items={props.goals} remove={removeItem} />
      </div>
    );
  };

  export default connect((state) => ({
    goals: state.goals,
  }))(Goals);