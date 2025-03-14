import React from "react";
import SignInForm from "../../components/auth/signin-form";

function SigninPage() {
  return (
    <div className="mt-8 flex w-full justify-center lg:mt-0 lg:min-h-screen lg:items-center">
      <SignInForm />
    </div>
  );
}

export default SigninPage;
