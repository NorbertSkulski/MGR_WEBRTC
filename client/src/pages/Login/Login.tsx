import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import "../Login/Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="Login">
      <LoginForm />
    </div>
  );
};

export default Login;
