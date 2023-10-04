// Import necessary components and libraries
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Importing the Input component
import { Label } from "@/components/ui/label"; // Importing the Label component
import { useFormik } from "formik"; // Importing useFormik hook for form handling
import { FC } from "react"; // Importing FC (Functional Component) type from React
import * as Yup from "yup";

// Define the props interface for the 'index' component
interface indexProps {}

// Define the 'index' component as a functional component
const index: FC<indexProps> = ({}) => {
  // Initialize Formik for form management

  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "", // Initial value for the 'username' field,
      email: "",
      password: "",
      repassword: "",
    },
    validationSchema: RegistrationSchema,
    onSubmit: () => {
      console.log(formik.values); // Log a message when the form is submitted
    },
  });

  return (
    // Render the main content within a grid layout
    <div className="grid h-screen place-items-center">
      {/* Forms Code */}
      <div id="forms-wrapper" className="p-5 border-2 border-black rounded-lg">
        <form onSubmit={formik?.handleSubmit}>
          {/* Create a grid layout with two columns and gap between them */}
          <div className="grid grid-cols-2 gap-5">
            <div>
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
                "No Error"
              )}
            </div>
            <div>
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
