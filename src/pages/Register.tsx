import { Button, Row } from "antd";
import GForm from "../components/form/GForm";
import GInput from "../components/form/GInput";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useState } from "react";
import { ApiError } from "../types/responseType";
// import GSelect from "../components/form/GSelect";

const Register = () => {
  const [register] = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    setErrorMessage("");
    try {
      const userInfo = {
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        password: data.password,
      };
      const res = await register(userInfo).unwrap();
      if (res.success) {
        toast.success("User registration successful");
        navigate("/login");
      }
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(apiError?.data.errorMessage);
    }
  };
  return (
    <Row style={{ height: "100vh" }} justify={"center"} align={"middle"}>
      <GForm onSubmit={onSubmit}>
        <GInput type={"fullName"} name={"fullName"} label={"Full Name"} />
        <GInput type={"email"} name={"email"} label={"Email"} />
        {/* <GSelect
          name="role"
          label="Role"
          options={[
            { value: "seller", label: "Seller" },
            { value: "manager", label: "Manager" },
          ]}
        /> */}
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
            Register
          </Button>
          <p style={{ fontSize: "16px", marginTop: "4px" }}>
            Already have account?{" "}
            <Link to={"/login"} style={{ color: "#1677FF", cursor: "pointer" }}>
              Login
            </Link>
          </p>
        </div>
      </GForm>
    </Row>
  );
};

export default Register;
