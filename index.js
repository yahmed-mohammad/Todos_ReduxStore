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

    return {
        getState,
        subscribe
    }

}