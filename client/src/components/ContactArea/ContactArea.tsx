import { Button } from "@mui/material";
import MainTable from "../Tables/MainTable/MainTable";
import "./ContactArea.scss";
import AddFriendModal from "../Modals/AddFriendModal/AddFriendModal";

const ContactArea = () => {

  return (
    <div className="ContactArea">
      <h3>Kontakty</h3>
      <MainTable
        style={{maxHeight: "45rem"}}
        className="mt-5"
        headers={[
          { key: "id", name:"ID",width:"100px"},
          { key: "name", name: "Imie", width:"auto" },
          { key: "lastName", name: "Nazwisko", width:"auto" },
          { key: "buttons", width:"8%" },
        ]}
        data={[
          { name: "Norbert", lastName: "Skulski" },
          { name: "AdminAgata", lastName: "AdminGromek" }            
        ]}
      />
      <AddFriendModal/>
    </div>
  );
};

export default ContactArea;
