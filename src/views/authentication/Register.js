import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiList } from "../../API/ApiList";
import ApiService from "../../API/ApiService";


const initialValues = {
  email: process.env.NODE_ENV === "development" ? "test@gmail.com" : "",
  name: process.env.NODE_ENV === "development" ? "kminchelle" : "",
  password: process.env.NODE_ENV === "development" ? "test123" : "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Please Enter Your name"),
  email: Yup.string().required("Please Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [img, setImg] = useState([]);

  const naviagte = useNavigate();

  const handleChangeImage = (e) => {
    setImg(e.target.files[0]);
  };

  const onSubmit = async (values) => {
    const temp = values;
    const bodyFormData = new FormData();
    bodyFormData.append("profile_image", img);
    for (const key in temp) {
      bodyFormData.append(key, temp[key]);
    }

    const apiRes = await ApiService(
      apiList.REGISTER,
      "POST",
      bodyFormData,
      true
    );
    if (apiRes.statusCode === 201) {
    
      toast.success("Succesfully Create User");
      naviagte("/");
    }
    else{
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
          <h2 className="mb-12 text-center text-5xl font-extrabold">Sign up</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
            action="#"
          >
            <div className="mb-4">
              <label className="block mb-1" htmlFor="name">
                User Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.name}
                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
              {validation.touched.name && validation.errors.name ? (
                <div className="text-[#DC2626]">{validation.errors.name}</div>
              ) : null}
            </div>
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
            <div className="mb-4">
              <label className="block mb-1" htmlFor="password">
                Image File
              </label>
              <div className="">
                <input
                  id="profile_image"
                  type="file"
                  name="profile_image"
                  onChange={handleChangeImage}
                  // onBlur={validation.handleBlur}
                  value={validation.values.profile_image}
                  className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </div>
              {validation.touched.profile_image &&
              validation.errors.profile_image ? (
                <div className="text-[#DC2626]">
                  {validation.errors.profile_image}
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
            </div>

            <div className="mt-6">
              <button
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                type="submit"
                disabled={validation.isSubmitting}
              >
                {validation.isSubmitting ? "register in..." : "Sign Up"}
              </button>
            </div>
            <div className="mt-6 text-center">
              <Link to="/login" className="">
                Already have an account ?{" "}
                <span className="text-[#389DF0] font-[600]">Sign in</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
