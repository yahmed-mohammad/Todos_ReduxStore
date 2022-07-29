function createStore(){
    /**
     * The state 
     */
    let state;
    /**
     * Getting the state
     */
    const getState = () => state;
    /**
     * Listening the changes
     */
    let listeners = [];
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            // To unsubscribe the changes
            listeners.filter((l) => l != listener);
        }
    }
    /**
     * Updating the state
     */
    const dispatch = (action) => {
        state = todos(state, action);
        listeners.forEach((listener) => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }

}

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
/**
 * 
 * @param {*} state 
 * @param {*} action 
 * Function to handle the actions
 */
function todos(state=[], action) {
    if(action.type === ADD_TODO){
        return state.concat([action.todo]);
    } else if(action.type === REMOVE_TODO) {
        return state.filter((todo) => todo.id !== action.id);
    } else if(action.type === TOGGLE_TODO){
        return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}));
    } else {
        return state;
    }
    /**We can also write a switch statement here */
}

const store = createStore(todos);
store.subscribe(() => {
    console.log("The new state is:", store.getState());
});

store.dispatch({
    type: ADD_TODO,
    todo: {
        id: 1,
        name: "Learn Redux",
        complete: false
    }
});
store.dispatch({
    type: ADD_TODO,
    todo: {
        id: 2,
        name: "Learn React",
        complete: false
    }
});
store.dispatch({
    type: ADD_TODO,
    todo: {
        id: 3,
        name: "Learn HTML",
        complete: false
    }
});
store.dispatch({
    type: REMOVE_TODO,
    id: 3
});
store.dispatch({
    type: TOGGLE_TODO,
    id: 2
});