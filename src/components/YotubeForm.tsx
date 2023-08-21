import React, { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
type FormValues = {
  username: string;
  email: string;
  channel: string;
  age: number;
  dob: Date;
  // Dealing with nested objects
  socials: {
    twitter: string;
    facebook: string;
  };

  // dealing with arrays
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
};

function YotubeForm() {
  const form = useForm<FormValues>({
    // Use this if you only want to initialize the state
    defaultValues: {
      username: "sunday",
      email: "",
      channel: "",
      age: 0,
      dob: new Date(),
      // Dealing with nested objects
      socials: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
    },
    mode: "onSubmit", // other options onSubmit (default), onBlur, OnChange, all, onTouched

    // Use this if you want to call an endpoint to prefill the state,
    // or when you want to just use a function

    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/1"
    //   );
    //   const data = await response.json();
    //   return {
    //     username: "sunday",
    //     email: data.email,
    //     channel: "",
    //   };
    // },
  });
  const { register, handleSubmit, formState, control, reset } = form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitSuccessful,
    isSubmitted,
    isSubmitting,
    submitCount,
  } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control: control,
  });

  renderCount++;

  console.log({
    touchedFields,
    dirtyFields,
    isDirty,
    isSubmitSuccessful,
    isSubmitted,
    isSubmitting,
    submitCount,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  const onError = (error: FieldErrors<FormValues>) => {
    console.log(error);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <div className="container">
      <h1>YoutubeForm({renderCount / 2}) </h1>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        className="form-container"
      >
        <div className="form-control ">
          <div className=" flex justify-start ">
            <label htmlFor="username" className="w-10">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Username is required",
              })}
            />
          </div>
          <div className=" flex justify-start ">
            <p className="w-10"></p>
            <p className="w-10 error ">{errors.username?.message}</p>
          </div>
        </div>

        <div className="form-control ">
          <div className="flex justify-start ">
            <label htmlFor="email" className="w-10">
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email", {
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Invalid Email Format",
                },
                validate: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
              })}
            />
          </div>

          <div className=" flex justify-start m-10">
            <p className="w-10"></p>
            <p className="w-10 error ">{errors.email?.message}</p>
          </div>
        </div>

        <div className="form-control ">
          <div className="flex justify-start m-10">
            <label htmlFor="channel" className="w-10">
              Channel
            </label>
            <input
              type="text"
              id="channel"
              {...register("channel", {
                required: {
                  value: true,
                  message: "Channel is required",
                },
                validate: {
                  notAdmin: (fieldValue) => {
                    return (
                      fieldValue !== "sunday" ||
                      "Enter a different channel name"
                    );
                  },
                  notSuper: (fieldValue) => {
                    return (
                      fieldValue !== "super" ||
                      "Don't enter 'super' as channel name "
                    );
                  },
                },
              })}
            />
          </div>
          <div className=" flex justify-start m-10">
            <p className="w-10"></p>
            <p className="w-10 error ">{errors.channel?.message}</p>
          </div>
        </div>

        <div className="form-control ">
          <div className="flex justify-start m-10">
            <label htmlFor="channel" className="w-10">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              {...register("dob", {
                valueAsDate: true,
                required: {
                  value: true,
                  message: "Date of Birth is required",
                },
              })}
            />
          </div>
          <div className=" flex justify-start m-10">
            <p className="w-10"></p>
            <p className="w-10 error ">{errors.dob?.message}</p>
          </div>
        </div>

        <div className="form-control ">
          <div className="flex justify-start m-10">
            <label htmlFor="age" className="w-10">
              Age
            </label>
            <input
              type="number"
              id="age"
              {...register("age", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "age is required",
                },
              })}
            />
          </div>
          <div className=" flex justify-start m-10">
            <p className="w-10"></p>
            <p className="w-10 error ">{errors.age?.message}</p>
          </div>
        </div>

        <div className="form-control ">
          <div className=" flex justify-start ">
            <label htmlFor="twitter" className="w-10">
              twitter
            </label>
            <input
              type="text"
              id="twitter"
              {...register("socials.twitter", {
                required: "twitter is required",
              })}
            />
          </div>
          <div className=" flex justify-start ">
            <p className="w-10"></p>
            <p className="w-10 error ">{errors.socials?.twitter?.message}</p>
          </div>
        </div>

        <div className="form-control ">
          <div className=" flex justify-start ">
            <label htmlFor="facebook" className="w-10">
              facebook
            </label>
            <input
              type="text"
              id="facebook"
              {...register("socials.facebook", {
                required: "facebook is required",
              })}
            />
          </div>
          <div className=" flex justify-start ">
            <p className="w-10"></p>
            <p className="w-10 error ">{errors.socials?.facebook?.message}</p>
          </div>
        </div>

        <div className="form-control ">
          <div className=" flex justify-start ">
            <label htmlFor="phoneNumbers" className="w-10">
              Primary Phone Number
            </label>
            <input
              type="text"
              id="phoneNumbers"
              {...register("phoneNumbers.0", {
                required: "primary is required",
              })}
            />
          </div>
          <div className=" flex justify-start ">
            <p className="w-10"></p>
            <p className="w-10 error ">{errors.phoneNumbers?.[0]?.message}</p>
          </div>
        </div>

        <div className="form-control ">
          <div className=" flex justify-start ">
            <label htmlFor="phoneNumbers" className="w-10">
              Secondary Phone Number
            </label>
            <input
              type="text"
              id="phoneNumbers"
              {...register("phoneNumbers.1", {
                required: "Secondary is required",
              })}
            />
          </div>
          <div className=" flex justify-start ">
            <p className="w-10"></p>
            <p className="w-10 error ">{errors.phoneNumbers?.[1]?.message}</p>
          </div>
        </div>

        <div>
          <label htmlFor="">List of numnbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="form-control flex justify-between "
                >
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button
                      className="btn"
                      onClick={() => remove(index)}
                      type="button"
                    >
                      Remove Phone number
                    </button>
                  )}
                </div>
              );
            })}
            <div>
              <button
                className="btn"
                onClick={() => append({ number: "" })}
                type="button"
              >
                Add Phone number
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-start">
          <button disabled={!isDirty || !isValid} className="btn">
            {" "}
            Submit
          </button>
          <button onClick={() => reset()} className="btn">
            {" "}
            Reset
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default YotubeForm;
