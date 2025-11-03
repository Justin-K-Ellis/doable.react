import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import Title from "./Title";

export default function LoginOrSignUp() {
  return (
    <div className="card card-border bg-base-100 w-96 pt-4">
      <Title text="Get going with Doable" />
      <div className="card-body justify-center items-center">
        <h2 className="card-title justify-center">Login or Sign up</h2>
        <p>Login or sign up to start todoing things.</p>
        <div className="card-actions justify-center">
          <SignInButton>
            <button className="btn btn-primary btn-outline">Login</button>
          </SignInButton>
          <SignUpButton>
            <button className="btn btn-primary btn-outline">Sign up</button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
