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
import { GlobalFetch } from "../../utils/Fetch/FetchUtils";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/reducers/AuthReducer/AuthReducer";
// @ts-ignore: Unreachable code error
import {NotificationManager} from 'react-notifications';

const MenuList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const unAuth = () => dispatch(setAuth(false)); 

  const userData = useSelector((state:any)=> state?.AuthReducer?.user);
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

  const logOut = async () => {
    const payload = await GlobalFetch({method:"POST", url:"/auth/logout"})
    if(!payload || payload.status >=300){
      return;
    }

    unAuth();
    NotificationManager.success("Wylogowano !")
  }

  return (
    <div className="MenuList">
      <div className={`ProfileContent ${userStatus}`}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="userImage" src={userData?.profileImage}>{`${userData?.name?.at(0)?.toUpperCase()}${userData?.lastName?.at(0)?.toUpperCase()}`}</Avatar>
        </Badge>
        <div className="AvatarName">
          <span className="FirstName">{userData?.name}</span>
          <span className="LastName">{userData?.lastName}</span>
          <span className="Id">id: {userData?.id}</span>

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
        <Button className="LogOutButton" variant="outlined" onClick={logOut}>Wyloguj</Button>
      </div>
    </div>
  );
};

export default MenuList;
