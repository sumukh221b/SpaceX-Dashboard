import axios from 'axios'

export const asyncGetLaunches = () => {
    return (dispatch) => {
        axios.get('https://api.spacexdata.com/v3/launches')
            .then((response) => {
                const launchData = response.data
                dispatch(getLaunches(launchData))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

const getLaunches = (data) => {
    return {
        type: 'GET_LAUNCHES',
        payload: data
    }
}