import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

export default function SignUpForm() {
  const {register, handleSubmit, watch, formState: {errors}} = useForm({
    mode: "onBlur",
    values: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    resolver: zodResolver(z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Email is invalid"),
      password: z.string().min(5, "Password must be at least 5 characters")
    }).required())
  });

  console.log(watch("firstName"));
  console.log("errors", errors.firstName);

  return (
    <form onSubmit={handleSubmit((data) => console.log("submit", data))}>
      <div>
        <label>
          First name
          <input {...register("firstName")} />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </label>
      </div>

      <div>
        <label>
          Last name
          <input {...register("lastName")} />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </label>
      </div>

      <div>
        <label>
          Email
          <input {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
      </div>

      <div>
        <label>
          Password
          <input type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
      </div>

      <button>Submit</button>
    </form>
  );
}