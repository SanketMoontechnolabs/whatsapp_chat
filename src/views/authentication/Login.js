import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import ApiService from "../../API/ApiService";
import { apiList } from "../../API/ApiList";
import { toast } from "react-hot-toast";
import { AuthAction } from "../../redux/actions/AuthAction";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const initialValues = {
  email: process.env.NODE_ENV === "development" ? "test123@gmail.com" : "",
  password: process.env.NODE_ENV === "development" ? "test123" : "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Please Enter Your email"),
  password: Yup.string().required("Please Enter Your Password"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
 

  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const onSubmit = async (values) => {
    console.log(31,values);
   
  
    const apiRes = await ApiService(apiList.LOGIN, "POST", values);
   
    if (apiRes.accessToken) {
      toast.success("Succesfully User login ");
      naviagte("/dashboard");
      dispatch(
        AuthAction({
          token: apiRes.accessToken,
          userData: apiRes.data,
        })
      );
    } else {
      toast.error(apiRes.msg);
    }
  };

  const googleLogin = async (response) => {
   const googleEmail = await jwt_decode(response.credential);

    const authdata = {
      email: googleEmail.email,
    };
    console.log(50,googleEmail.email);
    const apiRes = await ApiService(apiList.LOGIN, "POST", authdata);
  
    if (apiRes.accessToken) {
      toast.success("Successfully logged in with Google");
      naviagte("/dashboard");
      dispatch(
        AuthAction({
          token: apiRes.accessToken,
          userData: apiRes.data,
        })
      );
    } else {
      toast.error(apiRes.msg);
    }
  };


  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <div>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <h2 className="mb-12 text-center text-5xl font-extrabold">
            Welcome.
          </h2>
          <GoogleOAuthProvider clientId="420808172961-qh7r67c4li8puci68jvg5l373c46k2dp.apps.googleusercontent.com">
            <GoogleLogin
              buttonText="Login"
              onSuccess={(responseGoogle) => {
                googleLogin(responseGoogle);
                
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              isSignedIn={true}
              fetch_basic_profile={true}
              // cookiePolicy={"single_host_origin"}
            />
          </GoogleOAuthProvider>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
            action="#"
          >
            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">
                Email-Address
              </label>
              <input
                id="email"
                type="text"
                name="email"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.email}
                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
              {validation.touched.email && validation.errors.email ? (
                <div className="text-[#DC2626]">{validation.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="password">
                Password
              </label>
              <div className="flex">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.password}
                  className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
                <span
                  className="password-icon ml-[-33px] mt-[12px]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {validation.touched.password && validation.errors.password ? (
                <div className="text-[#DC2626]">
                  {validation.errors.password}
                </div>
              ) : null}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm leading-5 text-gray-900"
                >
                  {" "}
                  Remember me{" "}
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm">
                {" "}
                Forgot your password?{" "}
              </Link>
            </div>
            <div className="mt-6">
              <button
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                type="submit"
                disabled={validation.isSubmitting}
              >
                {validation.isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="mt-6 text-center">
              <Link to="/register" className="underline">
                Sign up for an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
