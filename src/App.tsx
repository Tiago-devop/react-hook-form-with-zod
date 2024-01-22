import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import "./styles.css";

// Define the schema for form validation using Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Infer the type of the form fields based on the Zod schema
type FormFields = z.infer<typeof schema>;

// React functional component
export default function App() {
  // Destructure functions and state variables from the useForm hook
  const {
    register, // Function to register form inputs
    handleSubmit, // Function to handle form submission
    setError, // Function to manually set form errors
    formState: { errors, isSubmitting }, // State variables for errors and submission status
  } = useForm<FormFields>({
    // Set default form values
    defaultValues: {
      email: "test@email.com",
    },
    // Integrate Zod schema for form validation
    resolver: zodResolver(schema),
  });

  // Form submission handler
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Simulate an asynchronous operation with a delay
      await new Promise((res) => setTimeout(res, 1000));
      // Log the form data after successful submission
      console.log(data);
    } catch (error) {
      // If an error occurs (simulating a server error), set a custom error message for the entire form
      setError("root", {
        message: "This email is already in use",
      });
    }
  };

  // JSX code for the form
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Input field for email */}
      <input {...register("email")} type="text" placeholder="Email" />
      {/* Display error message for the email field, if any */}
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

      {/* Input field for password */}
      <input {...register("password")} type="password" placeholder="Password" />
      {/* Display error message for the password field, if any */}
      {errors.password && (
        <p style={{ color: "red" }}>{errors.password.message}</p>
      )}

      {/* Submit button with dynamic text based on form submission status */}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {/* Display error message for the entire form, if any */}
      {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}
    </form>
  );
}
