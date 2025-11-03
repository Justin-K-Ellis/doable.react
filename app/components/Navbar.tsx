import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <p className="btn btn-ghost text-2xl md:text-3xl font-bold">Doable</p>
      </div>
      <div className="navbar-end gap-2">
        <SignedOut>
          <SignUpButton>
            <button className="btn btn-outline btn-primary">Sign up</button>
          </SignUpButton>
          <p>or</p>
          <SignInButton>
            <button className="btn btn-outline btn-primary">Login</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
