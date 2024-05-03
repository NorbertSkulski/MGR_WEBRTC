import {  Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux/reduxHook";
import { useQuery } from "@tanstack/react-query";
import "../Dashboard/Dashboard.scss"
import MenuList from "../../components/MenuList/MenuList";
import FriendsList from "../../components/FriendsList/FriendsList";
import ContentArea from "../../components/ContentArea/ContentArea";

const Dashboard = (props: Object) => {
  console.log(props);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isPending, isError, data} = useQuery({
    queryKey:['testQuery'],
    queryFn:()=>fetch('https://rickandmortyapi.com/api/character/241').then(res=>res.json())
  })
  console.log("Dashboard:", isPending, isError, data)

  return (
    <div className="Dashboard">
      <MenuList/>
      <FriendsList/>
      <ContentArea/>
    </div>
  );
};

export default Dashboard;
