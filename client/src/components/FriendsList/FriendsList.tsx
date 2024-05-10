import { useState } from "react";
import "./FriendsList.scss";
import InvitationElement from "../InvitationElement/InvitationElement";


const FriendsList = () => {

    const [Invitations, setInvitations] = useState([{name:'Test',lastName:'tt',id:'qwe',uuid:'adsas'},{name:'Test',lastName:'tt',id:'qwe',uuid:'adsas'}])

    return <div className="FriendsList">        
        <div>
            <h4>Zaproszenia:</h4>
            <div className="Invitations">
                {Invitations.map((ele, idx)=><InvitationElement key={idx} {...ele}/>)}
            </div>
        </div>
    </div>
}

export default FriendsList;