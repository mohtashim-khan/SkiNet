import React, { useEffect } from 'react';
import AssignArea from '../Modal/AssignArea'
import AssignTrainer from '../Modal/AssignTrainer'
import Comment from '../Modal/Comment'
import RemoveUser from './RemoveUser'
import RequestSub from './RequestSub'
import Attendance from '../Modal/Attendance'
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Subtitle, TableCard } from '../Elements/Elements'
import './Table.css'

const TraineeUserTable = ({ currentShift, setCurrentShift, setProxySelect, traineeList, session_data, session, shiftInfo }) => {

    const traineeUsersToRender = () => {
        let i = 0;
        return traineeList.map(traineeUser => (
            <tr key={i++}>
                <td className='userText'><Link to={"/personnel/user/" + traineeUser.user.userID}>{traineeUser.user.firstName + " " + traineeUser.user.lastName}</Link></td>
                <td className='userText'>{traineeUser.area === null ? "Area Not Set" : traineeUser.area.areaname}</td>
                <td className='userText'>{traineeUser.shadowing}</td>
                <td className='userText'>{traineeUser.comment === null ? "" : traineeUser.comment}</td>
                <td className='userText'>{traineeUser.timestampSubrequest !== "1970-01-01T00:00:00"
                    ? "✓"
                    : " "}</td>
                <td className='userText'>{traineeUser.attendance}</td>

                {(session_data.username === traineeUser.username) ?
                    <>
                        <td >
                            <div style={{ display: 'flex' }}>
                                <Comment currentShift={currentShift}
                                    setProxySelect={setProxySelect}
                                    user={traineeUser}
                                    username={session_data.username}
                                    session={session}
                                    session_data={session.session_data()}
                                    shiftInfo={shiftInfo} />
                                <RequestSub currentShift={currentShift} setProxySelect={setProxySelect} user={traineeUser} username={session_data.username} />
                            </div>
                        </td>
                    </>
                    :
                    <>
                        <td></td>
                    </>
                }
                {(session_data.user_type === "SYSTEM_ADMIN" || session_data.user_type === "HILL_ADMIN") ?
                    <>
                        <td>
                            <div style={{ display: 'flex' }}>
                                <AssignArea currentShift={currentShift} setCurrentShift={setCurrentShift} setProxySelect={setProxySelect} user={traineeUser} username={session_data.username} session={session} />
                                <AssignTrainer currentShift={currentShift} setCurrentShift={setCurrentShift} setProxySelect={setProxySelect} user={traineeUser} username={session_data.username} />
                                <Attendance currentShift={currentShift} setCurrentShift={setCurrentShift} setProxySelect={setProxySelect} user={traineeUser} username={session_data.username} />
                                <Comment currentShift={currentShift} setProxySelect={setProxySelect} user={traineeUser} />
                                <RemoveUser currentShift={currentShift} setProxySelect={setProxySelect} user={traineeUser} username={session_data.username} />
                            </div>

                        </td>
                    </>
                    :
                    <> 
                        <td></td>
                    </>
                }




            </tr>
        ))
    }
    //will update calendar if the Add Roster Modal changes
    useEffect(() => {

    }, [traineeList, currentShift]);


    return (
        <>
            <div className='tableFixHeader'>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Area</th>
                            <th>Trainer</th>
                            <th>Comment</th>
                            <th>SubRequest</th>
                            <th>Attendance</th>
                            <th>Actions</th>
                            {(session_data.user_type === "SYSTEM_ADMIN" || session_data.user_type === "HILL_ADMIN") ?
                                <><th>Admin</th></> : <></>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {traineeUsersToRender()}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TraineeUserTable
