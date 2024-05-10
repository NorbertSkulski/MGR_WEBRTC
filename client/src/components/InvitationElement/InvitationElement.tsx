 import "./InvitationElement.scss";
 
 type InvitationElementType = {
    uuid: string;
    name: string;
    lastName: string;
    id:string;
 }
 
 const InvitationElement = (props:InvitationElementType) => {

    return <div className="InvitationElement">Element</div>

 }

 export default InvitationElement;