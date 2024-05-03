import { Route, Routes } from "react-router-dom";
import "./ContentArea.scss";
import ContactArea from "../ContactArea/ContactArea";
import ProfileArea from "../ProfileArea/ProfileArea";




const ContentArea = () => {


  const dashboardRoutes = [
    {path: "/contact", element:<ContactArea/>},
    {path:"/profile", element:<ProfileArea/>}
  ]

  return (
    <>
      <Routes>
        {dashboardRoutes.map((el,index)=><Route key={index} path={el?.path} element={<div className="ContentArea">{el?.element}</div>} />)}        
      </Routes>
    </>
  );
};

export default ContentArea;
