function createStore(reducer){
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
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }

}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * Common function to handle multiple state and actions
 */
function app(state={}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";
/**
 * 
 * @param {*} state 
 * @param {*} action 
 * Function to handle the todos actions
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

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * Function to handle the goal actions
 */
function goals(state=[], action) {
    if(action.type === ADD_GOAL){
        return state.concat([action.goal]);
    } else if(action.type === REMOVE_GOAL) {
        return state.filter((goal) => goal.id !== action.id);
    } else {
        return state;
    }
    /**We can also write a switch statement here */
}

const store = createStore(app);
store.subscribe(() => {
    const {todos, goals} = store.getState();
    document.getElementById('todos').innerHTML= '';
    document.getElementById('goals').innerHTML= '';
    todos.forEach(addTodoUI);
    goals.forEach(addGoalUI);
    //console.log("The new state is:", store.getState());
});

function generateId() {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }

function addTodo() {
    const input = document.getElementById('todo');
    const name = input.value;
    input.value='';
    const todo= {
        id: generateId(),
        name: name,
        complete: false
    }
    store.dispatch(addTodoAction(todo));
}

function addGoal() {
    const input = document.getElementById('goal');
    const name = input.value;
    input.value='';
    const goal= {
        id: generateId(),
        name: name
    }
    store.dispatch(addGoalAction(goal));
}

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo: todo
    }
}
function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id: id
    }
}
function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id: id
    }
}
function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal: goal
    }
}
function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id: id
    }
}

document.getElementById('todoBtn').addEventListener('click', addTodo);
document.getElementById('goalBtn').addEventListener('click', addGoal);

function createRemoveButton(onClick){
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'X';
    removeBtn.addEventListener('click', onClick);
    return removeBtn;
}

function addTodoUI(todo){
    const node = document.createElement('li');
    const text = document.createTextNode(todo.name);
    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeTodoAction(todo.id));
    });

    node.appendChild(text);
    node.appendChild(removeBtn);

    node.style.textDecoration = todo.complete ? 'line-through': 'none';
    node.addEventListener('click', () => {
        store.dispatch(toggleTodoAction(todo.id));
    });

    document.getElementById('todos').append(node);
}

function addGoalUI(goal){
    const node = document.createElement('li');
    const text = document.createTextNode(goal.name);
    node.appendChild(text);

    document.getElementById('goals').append(node);
}

/*
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
store.dispatch({
    type: ADD_GOAL,
    goal: {
        id: 1,
        name: 'Complete Redux in 20 days'
    }
});
store.dispatch({
    type: ADD_GOAL,
    goal: {
        id: 2,
        name: 'Complete React in 10 days'
    }
});
store.dispatch({
    type: REMOVE_GOAL,
    id: 2
});
*/