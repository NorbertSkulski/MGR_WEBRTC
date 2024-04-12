import {  Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux/reduxHook";
import { add, divide } from "../../store";
import { useQuery } from "@tanstack/react-query";
import "../Dashboard/Dashboard.scss"

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
      <div>
          <Routes>
            <Route path="/contact" element={<div>"Contact"</div>} />
          </Routes>
      Dashboard{" "}
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Click
      </button>
      <button
        onClick={() => {
          dispatch(add({value:22,isAuth:false}))
        }}
      >
        Click2
      </button>
      <button
        onClick={() => {
          dispatch(divide({value:21}))
        }}
      >
        Click3
      </button>
      </div>
      
    </div>
  );
};

export default Dashboard;
