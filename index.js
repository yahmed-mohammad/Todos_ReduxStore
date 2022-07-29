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

    function todos(state=[], action) {
        if(action.type === "ADD_TODOS"){
            return state.concat([action.todo]);
        }
        return state;
    }

    return {
        getState,
        subscribe,
        dispatch
    }

}

const store = createStore();
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