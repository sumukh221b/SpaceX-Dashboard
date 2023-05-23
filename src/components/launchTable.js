import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetLaunches } from "../action/launchAction";
import PaginationComponent from "./Pagination";
import { asyncGetHistory } from "../action/historyAction";

const LaunchTable = (props) => {
    const [date, setDate] = useState('')
    const [filter, setFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(12)
    const [launchDetails, setLaunchDetails] = useState({})
    const [historyDetails, setHistoryDetails] = useState({})
    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(asyncGetLaunches())
            dispatch(asyncGetHistory())
            setToggle(true)
        }, 2000);
    }, [dispatch])

    const launchData = useSelector((state) => {
        return state.launch
    })

    const historyData = useSelector((state) => {
        return state.history
    })

    function handlePageChange(page) {
        setCurrentPage(page)
    }

    //Pagination Calculation
    const totalPages = launchData.length / itemsPerPage
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentLaunches = launchData.slice(indexOfFirstItem, indexOfLastItem)

    const handleShowDetails = (number) => {
        const filteredData = launchData.find(ele => ele.flight_number == number)
        setLaunchDetails(filteredData)
        const filteredHistoryData = historyData.find(ele => ele.flight_number == number)
        setHistoryDetails(filteredHistoryData)
    }

    const handleDateChange = (e) => {
        const inputValue = e.target.value
        console.log('date', inputValue);
        setDate(inputValue)
    }

    return (
        <div>
            <div className="d-flex mb-3">
                <div className="me-auto p-2">
                    <input type="date" value={date} onChange={(e) => handleDateChange(e)} />
                </div>
                <div className="p-2">
                    <img src="https://media.istockphoto.com/id/828523532/vector/filter-icon.jpg?s=170667a&w=0&k=20&c=fSLsmphzSuJPQxOg-cKqYf-cg97TxDvy5bOhBS7V3bs=" style={{ height: '6vh', width: '3vw' }} />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} >
                        <option value="" >All Launches</option>
                        <option value="upcoming" >Upcoming Launches</option>
                        <option value="success" >Successful Launches</option>
                        <option value="fail" >Failed Launches</option>
                    </select>
                </div>
            </div>
            <hr />
            <div>
                {
                    !toggle ? (
                        <div className="d-flex justify-content-center">
                            <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" style={{ width: "50px", height: "50px" }} />
                        </div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th> No: </th>
                                    <th> Launched (UTC) </th>
                                    <th> Location </th>
                                    <th> Mission </th>
                                    <th> Orbit </th>
                                    <th> Launch Status </th>
                                    <th> Rocket </th>
                                </tr>
                            </thead >
                            <tbody>
                                {
                                    currentLaunches.filter(ele => {
                                        if (filter == '') {
                                            return currentLaunches
                                        }
                                        else if (filter == 'upcoming') {
                                            return ele.upcoming
                                        } else if (filter == 'success') {
                                            return ele.launch_success
                                        } else {
                                            return ele.launch_success == false
                                        }
                                    }).map(launch => {
                                        return (
                                            <tr key={launch.flight_number}>
                                                <td> {launch.flight_number} </td>
                                                <td> {(launch.launch_date_utc).slice(0, 10)} {(launch.launch_date_utc).slice(12, 19)} </td>
                                                <td> {launch.launch_site.site_name} </td>
                                                <td data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleShowDetails(launch.flight_number)} > {launch.mission_name} </td>
                                                <td> {launch.rocket.second_stage.payloads[0].orbit} </td>
                                                <td>
                                                    {
                                                        launch.upcoming == true ? (
                                                            <p style={{ color: 'orange' }} > Upcoming </p>
                                                        ) : (
                                                            (launch.launch_success == true) ? <p style={{ color: 'green' }}> Success </p> : <p style={{ color: 'red' }}> Failed </p>
                                                        )
                                                    }
                                                </td>
                                                <td> {launch.rocket.rocket_name} </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table >
                    )
                }
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="d-flex justify-content-center" >
                                    <div style={{ backgroundImage: `url(${launchDetails.links && launchDetails.links.mission_patch_small})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '10vh', width: '10vw' }}> </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="modal-title fs-5" id="exampleModalLabel">
                                        <p> {launchDetails.mission_name} </p>
                                        <p> {launchDetails.rocket && launchDetails.rocket.rocket_name} </p>
                                        <img src="https://icon-library.com/images/nasa-icon/nasa-icon-15.jpg" style={{ height: '5vh', width: '3vw' }} />
                                        <img src="https://images.freeimages.com/fic/images/icons/2779/simple_icons/4096/wikipedia_4096_black.png" style={{ height: '5vh', width: '3vw' }} />
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBVCVgRGWkprE_ls7NZSIsmEw6X0R3EEJkmEzA5tQFBbDPsGn2TGGod-6xY28nUq7R0n8&usqp=CAU" style={{ height: '5vh', width: '3vw' }} />
                                    </div>
                                    <div className="ms-3">
                                        {
                                            launchDetails.upcoming == true ? (
                                                <p style={{ color: 'orange' }} > Upcoming </p>
                                            ) : (
                                                (launchDetails.launch_success == true) ? <p style={{ color: 'green' }}> Success </p> : <p style={{ color: 'red' }}> Failed </p>
                                            )
                                        }
                                    </div>
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {
                                    historyDetails === undefined ? (
                                        <p> No history found </p>
                                    ) : <p> {historyDetails.details} <a href={`${historyDetails.links && historyDetails.links.wikipedia}`} style={{ textDecoration: "none", color: "blue" }}>Wikipedia</a> </p>
                                }
                                <div className="d-flex justify-content-between" >
                                    <h6> Flight Number </h6>
                                    <h6>{launchDetails.flight_number}</h6>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h6> Mission Name </h6>
                                    <h6>{launchDetails.mission_name}</h6>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h6> Rocket Type </h6>
                                    <h6>{launchDetails.rocket && launchDetails.rocket.rocket_type}</h6>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h6> Rocket Name </h6>
                                    <h6>{launchDetails.rocket && launchDetails.rocket.rocket_name}</h6>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h6> Manufacturer </h6>
                                    <h6>{launchDetails.rocket && launchDetails.rocket.second_stage.payloads[0].manufacturer}</h6>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h6> Nationality </h6>
                                    <h6> {launchDetails.rocket && launchDetails.rocket.second_stage.payloads[0].nationality} </h6>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h6> Launch Date </h6>
                                    <h6>{launchDetails.launch_date_utc && launchDetails.launch_date_utc.slice(0, 10)}</h6>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h6> Payload Type  </h6>
                                    <h6>{launchDetails.rocket && launchDetails.rocket.second_stage.payloads[0].payload_type}</h6>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h6> Orbit </h6>
                                    <h6>{launchDetails.rocket && launchDetails.rocket.second_stage.payloads[0].orbit}</h6>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h6> Launch Site </h6>
                                    <h6>{launchDetails.launch_site && launchDetails.launch_site.site_name}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="card-title d-flex justify-content-end mt-3">
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div >
    )
}

export default LaunchTable