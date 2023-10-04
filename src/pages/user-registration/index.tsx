// Import necessary components and libraries
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Importing the Input component
import { Label } from "@/components/ui/label"; // Importing the Label component
import { useFormik } from "formik"; // Importing useFormik hook for form handling
import { useRouter } from "next/router";
import { FC } from "react"; // Importing FC (Functional Component) type from React
import * as Yup from "yup"; // Import Yup for form validation

// Define the props interface for the 'index' component
interface indexProps {}

// Define the 'index' component as a functional component
const index: FC<indexProps> = ({}) => {
  const router = useRouter();
  const approved = true;
  // Define the Yup schema for form validation
  const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    repassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords dont match"
    ),
  });

  // Initialize Formik for form management
  const formik = useFormik({
    initialValues: {
      username: "", // Initial value for the 'username' field
      email: "",
      password: "",
      repassword: "",
    },
    validationSchema: RegistrationSchema, // Apply the Yup schema for validation
    onSubmit: () => {
      if (approved) {
        console.log(formik.values);
        router.push("/user-dashboard");
      }
    },
  });

  return (
    // Render the main content within a grid layout
    <div className="grid h-screen place-items-center">
      {/* Forms Code */}
      <div
        id="forms-wrapper"
        className="p-5 border-2 border-black rounded-lg 2xl:w-fit "
      >
        <h1 className="text-3xl text-center font-bold">User Registration</h1>
        <form onSubmit={formik?.handleSubmit}>
          {/* Create a grid layout with two columns and gap between them */}
          <div className="grid grid-cols-2 gap-5 aspect-auto">
            <div className="col-span-2">
              <Label>Username</Label>
              {/* Input field for entering a username */}
              <Input
                type="text"
                name="username"
                placeholder="Please enter your username"
                className="form-input"
                value={formik?.values?.username}
                onChange={formik?.handleChange}
              />
              {formik?.errors?.username && formik.touched.username ? (
                <p>{formik.errors.username}</p>
              ) : (
                ""
              )}
            </div>
            <div className="col-span-2">
              <Label>Email</Label>
              {/* Input field for re-entering the password */}
              <Input
                type="email"
                name="email"
                placeholder="Please enter your email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="form-input"
              />
              {formik?.errors?.email && formik.touched.email ? (
                <p>{formik.errors.email}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <Label>Password</Label>
              {/* Input field for entering a password */}
              <Input
                type="password"
                name="password"
                placeholder="Please enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="form-input"
              />
              {formik?.errors?.password && formik.touched.password ? (
                <p>{formik.errors.password}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <Label>Re-Enter password</Label>
              {/* Input field for re-entering the password */}
              <Input
                type="password"
                name="repassword"
                placeholder="Please re-enter your password"
                onChange={formik.handleChange}
                value={formik.values.repassword}
                className="form-input"
              />
              {formik?.errors?.repassword && formik.touched.repassword ? (
                <p>{formik.errors.repassword}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex justify-center pt-5">
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index; // Export the 'index' component as the default export
