import React, {useEffect}  from 'react';
import axios from 'axios';
import { Button} from 'reactstrap'
import { GiEmptyMetalBucketHandle } from 'react-icons/gi';





const SignUpShift = ({currentShift, setProxySelect, name, username, user_type, trainer, phone_number, email, setCurrentShift, session}) => {
    //state template
    
    const signUp = async (e) => {
        if(currentShift)
        {
          console.log(name, username, user_type, trainer);
            const article = {
                event_id: currentShift.event.extendedProps.eventID,
                event_name: currentShift.event.title,
                username: username,
                name: name,
                user_type: user_type,
                phone_number: phone_number,
                trainer: trainer,
                role: (user_type === "TRAINEE") ? "TRAINEE": "ROSTERED",
                comment: "",
                email: email,
                action_user: username,
            };

            session
            .put("roster/addToEventLog", article, {}, true)
            .then(response => {
                //if error from database
                if(response.status === 204)
                {
                    let storeShift = {
                        event: {
                            proxy: 'yes',
                            id: currentShift.event.id,
                            title: currentShift.event.title,
                            start: currentShift.event.start,
                            end: currentShift.event.end,
                            startStr: currentShift.event.startStr,
                            endStr: currentShift.event.endStr,
                        }
                    }

                    //load events
                    setProxySelect(storeShift);
                }
                else{
                    console.log("Error in DB")
                }
            });

        }


    }


    useEffect(() => {

    }, [currentShift]);

    const removeButton = <Button color="primary" onClick={() => signUp()}>Sign Up</Button>

    return (

        //put UI objects here
        <div>
            {removeButton}
        </div>
    );

}


export default SignUpShift;
