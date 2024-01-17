import React, { useCallback, useState } from "react";
import { InputField, Button } from "../../components";
import { apiLogin, apiRegister } from "../../apis";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { useDispatch } from "react-redux";
import { register } from "../../store/users/userSlide";

const Login = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const localtion = useLocation();
  const [payload, setPayLoad] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {
    setPayLoad({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobile: "",
    });
  };
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      if (response.success) {
        Swal.fire("Congratulation!", response.mes, "success").then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else {
        Swal.fire("Oops!", response.mes, "error");
      }
    } else {
      const rs = await apiLogin(data);
      if (rs.success) {
        dispath(
          register({
            isLoggedIn: true,
            token: rs.accessToken,
            userData: rs.userData,
          })
        );
        navigate(`/${path.HOME}`);
      } else {
        Swal.fire("Oops!", rs.mes, "error");
      }
    }
  }, [payload, isRegister]);
  return (
    <div className="w-screen h-screen relative bg-slate-300">
      {/* <img
        src="https://www.shutterstock.com/shutterstock/videos/1107990943/thumb/1.jpg?ip=x480"
        alt=""
        className="w-full h-full object-cover"
      ></img> */}
      <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayLoad}
                nameKey="firstname"
              ></InputField>
              <InputField
                value={payload.lastname}
                setValue={setPayLoad}
                nameKey="lastname"
              ></InputField>
            </div>
          )}
          <InputField
            value={payload.email}
            setValue={setPayLoad}
            nameKey="email"
          ></InputField>
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayLoad}
              nameKey="mobile"
            ></InputField>
          )}
          <InputField
            value={payload.password}
            setValue={setPayLoad}
            nameKey="password"
            type="password"
          ></InputField>
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fw
          ></Button>
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span className="text-blue-500 hover: underline cursor-pointer">
                Forgot your password?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover: underline cursor-pointer"
                onClick={() => {
                  setIsRegister(true);
                  resetPayload();
                }}
              >
                Create Account
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover: underline cursor-pointer w-full text-center"
                onClick={() => {
                  setIsRegister(false);
                  resetPayload();
                }}
              >
                Go to login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
