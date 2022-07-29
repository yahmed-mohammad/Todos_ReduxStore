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

function todos(state=[], action) {
    if(action.type === "ADD_TODOS"){
        return state.concat([action.todo]);
    } else if(action.type === "REMOVE_TODOS") {
        return state.filter((todo) => todo.id !== action.id);
    } else if(action.type === "TOGGLE_TODOS"){
        return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}));
    } else {
        return state;
    }
}

const store = createStore(todos);
store.subscribe(() => {
    console.log("The new state is:", store.getState());
});

store.dispatch({
    type: "ADD_TODOS",
    todo: {
        id: 1,
        name: "Learn Redux",
        complete: false
    }
});
store.dispatch({
    type: "ADD_TODOS",
    todo: {
        id: 2,
        name: "Learn React",
        complete: false
    }
});
store.dispatch({
    type: "ADD_TODOS",
    todo: {
        id: 3,
        name: "Learn HTML",
        complete: false
    }
});
store.dispatch({
    type: "REMOVE_TODOS",
    id: 3
});
store.dispatch({
    type: "TOGGLE_TODOS",
    id: 2
});