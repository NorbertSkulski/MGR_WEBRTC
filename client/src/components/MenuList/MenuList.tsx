import { MouseEventHandler, useState } from "react";
import "./MenuList.scss";
import {
  MenuList as MenuListMui,
  MenuItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Badge,
  Avatar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MenuList = () => {
  const navigate = useNavigate();

  // zrobić hook 
  const [userStatus,setUserStatus ]= useState("connected");

  type menuListArrayType = {
    name: string;
    icon: string;
    path:string;
    onClick: MouseEventHandler<HTMLLIElement>;
  }[];

  const menuListArray: menuListArrayType = [
    {
      name: "Kontakty",
      icon: "book",
      path:"/dashboard/contact",
      onClick: () => {
        navigate("/dashboard/contact");
      },
    },
    {
      name: "Profil",
      icon: "person",
      path:"/dashboard/profile",
      onClick: () => {
        navigate("/dashboard/profile");
      },
    },
  ];

  const changePath = (element:any) => {
    if(window.location.href.includes(element.path))
      return;
    const contentArea = document.querySelector('.ContentArea');
    contentArea?.classList?.add("Hide")
    const timeout = setTimeout(()=>{
      element.onClick();
      contentArea?.classList.remove("Hide")
      clearTimeout(timeout);
    },300);    
  }

  

  return (
    <div className="MenuList">
      <div className={`ProfileContent ${userStatus}`}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar>NS</Avatar>
        </Badge>
        <div className="AvatarName">
          <span className="FirstName">Norbert</span>
          <span className="LastName">Skulski</span>

        </div>
      </div>
      <div className="RouteContent">
        <MenuListMui>
          {menuListArray?.map((el, index) => (
            <MenuItem key={index} onClick={()=>changePath(el)}>
              <ListItemIcon>
                <Icon>{el.icon}</Icon>
              </ListItemIcon>
              <ListItemText>{el.name}</ListItemText>
            </MenuItem>
          ))}
        </MenuListMui>
      </div>

      <div className="FooterContent"> 
        <Button className="LogOutButton" variant="outlined">Wyloguj</Button>
      </div>
    </div>
  );
};

export default MenuList;
