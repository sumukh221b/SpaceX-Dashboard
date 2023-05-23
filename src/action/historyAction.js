import axios from 'axios'

export const asyncGetHistory = () => {
    return (dispatch) => {
        axios.get('https://api.spacexdata.com/v3/history')
            .then((response) => {
                const historyData = response.data
                dispatch(getHistory(historyData))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

const getHistory = (data) => {
    return {
        type: 'GET_HISTORY',
        payload: data
    }
}