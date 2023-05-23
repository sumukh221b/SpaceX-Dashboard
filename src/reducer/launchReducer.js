const initialState = []

const launchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LAUNCHES': {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default launchReducer