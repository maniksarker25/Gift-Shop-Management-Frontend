import { Button, Row } from "antd";
import GForm from "../components/form/GForm";
import GInput from "../components/form/GInput";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ApiError } from "../types/responseType";
import ShowCredentialModal from "../components/ui/modal/ShowCredentialModal";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FieldValues) => {
    setErrorMessage("");
    try {
      const loginInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(loginInfo).unwrap();
      if (res.success) {
        const user = verifyToken(res.data.token) as TUser;
        dispatch(setUser({ user, token: res.data.token }));
        toast.success("User login successfully");
        navigate("/");
      }
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(apiError?.data.errorMessage);
    }
  };
  return (
    <Row style={{ height: "100vh" }} justify={"center"} align={"middle"}>
      <GForm onSubmit={onSubmit}>
        <GInput type={"email"} name={"email"} label={"Email"} />
        <GInput type={"password"} name={"password"} label={"Password"} />
        {errorMessage && (
          <p style={{ color: "red", marginBottom: "7px" }}>{errorMessage}</p>
        )}

        <div>
          <Button
            style={{
              width: "100%",
              backgroundColor: "#1677FF",
              color: "white",
            }}
            htmlType="submit"
          >
            Login
          </Button>
          <p style={{ fontSize: "16px", marginTop: "4px" }}>
            Don't have an account?{" "}
            <Link
              to={"/register"}
              style={{ color: "#1677FF", cursor: "pointer" }}
            >
              Register
            </Link>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <ShowCredentialModal />
        </div>
      </GForm>
    </Row>
  );
};

export default Login;
