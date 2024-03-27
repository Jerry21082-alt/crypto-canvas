"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  TvalidtateCredentials,
  validateCredentials,
} from "@/src/lib/validator/credentials";
import { trpc } from "@/src/trpc/client";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TvalidtateCredentials>({
    resolver: zodResolver(validateCredentials),
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use!");

        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);

        return;
      }

      toast.error("Something went wrong. Try again");
    },

    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification sent to ${sentToEmail}`);
      router.push("/verify-email?to=" + sentToEmail);
    },
  });
  const onSubmit = ({ email, password }: TvalidtateCredentials) => {
    mutate({ email, password });
  };

  return (
    <>
      <div className="container relative flex sm:p-0 md:p-20 flex-col items-center justify-center lg:px-0">
        <div className="flex justify-center flex-col items-center text-white rounded-xl w-full md:w-1/2 sm:p-2 md:p-10 mx-auto">
          <div>logo</div>
          <div className="mt-10 flex items-center justify-center flex-col gap-5">
            <h2 className="font-semibold text-3xl">Create an account</h2>
          </div>

          <div className="w-full flex items-center flex-col mt-10">
            <form className="w-full md:w-1/2" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="border-b-2 border-white py-2">
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className={cn(
                      "bg-transparent outline-none border-none w-full h-full",
                      {
                        "focus-visible: ring-red-500": errors.password,
                      }
                    )}
                  />
                </div>

                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}

                <div className="border-b-2 border-white py-2">
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className={cn(
                      "bg-transparent outline-none border-none w-full h-full",
                      {
                        "focus-visible: ring-red-500": errors.password,
                      }
                    )}
                  />
                </div>

                {errors?.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button className="w-full bg-white text-black mt-10  min-h-12 rounded-3xl relative  flex justify-center items-center">
                {!isLoading ? (
                  <span className="font-semibold">Sign up</span>
                ) : (
                  <div className="loader flex gap-[.25rem]">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-[.8rem] h-[.8rem] bg-red-500 rounded-full"
                      ></div>
                    ))}
                  </div>
                )}
              </button>
            </form>

            <div className="flex items-center mt-10 gap-1">
              <p>Have an account?</p>
              <Link href="/sign-in" className="text-skyBlue">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
