import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.css";

type FormFields = {
  email: string;
  password: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((res) => setTimeout(res, 1000));
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Email is required",
          validate: (value) => {
            if (!value.includes("@")) {
              return "Email must include @";
            }
            return true;
          },
        })}
        type="text"
        placeholder="Email"
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      <input
        {...register("password", {
          required: "Email is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && (
        <p style={{ color: "red" }}>{errors.password.message}</p>
      )}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
