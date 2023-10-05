import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { apiList } from "../../API/ApiList";
import ApiService from "../../API/ApiService";

const initialValues = {
  email: process.env.NODE_ENV === "development" ? "test@gmail.com" : "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Please Enter Your Email"),
});

const ForgotPassword = () => {
  const naviagte = useNavigate();

  const onSubmit = async (values) => {
    await ApiService(apiList.LOGIN, "POST", values);
    toast.success("Email sent succesfully");
    naviagte("/login");
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <div>
      <main
        id="content"
        role="main"
        className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0"
      >
        <div className="mt-[-50px] bg-white rounded-xl w-[27%] shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Remember your password ? 
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  to="/login"
                >
                 &nbsp;Login here
                </Link>
              </p>
            </div>
            <div className="mt-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required=""
                        aria-describedby="email-error"
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <div className="text-[#DC2626]">
                          {validation.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center  mt-4 items-center gap-2 rounded-md border border-transparent font-semibold bg-[#DC2626] text-white hover:bg-[#DC2626]-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Reset password 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
