const initialState = []

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_HISTORY' : {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default historyReducer