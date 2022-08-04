import React from "react";
import ConnectedTodos from './Todos';
import ConnectedGoals from './Goals';
import {handleInitialData} from '../actions/shared';
import {connect} from 'react-redux';

const App = (props) => {
  React.useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  if (props.loading === true) {
    return <h3>Loading</h3>;
  }

  return (
    <div>
      <ConnectedTodos />
      <ConnectedGoals />
    </div>
  );
};

export default connect((state) => ({
  loading: state.loading,
}))(App);