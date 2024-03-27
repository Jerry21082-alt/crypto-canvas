"use client";

import { trpc } from "@/src/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isError, isLoading } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-500" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-muted-foreground text-sm">
          This token is not valid. Please try again
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col justify-center items-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src={``} alt="email sent image" fill />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="mt-1 text-muted-foreground text-center"></p>
        <Link
          href="/sign-in"
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="animate-spin h-8 w-8 text-zinc-300" />
      <h3 className="font-semibold text-xl">Verifying...</h3>
      <p className="text-muted-foreground text-sm">
        This won&&apos;t take long.
      </p>
    </div>;
  }
};

export default VerifyEmail;
