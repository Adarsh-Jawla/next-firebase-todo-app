import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Link from "next/link";

const provider = new GoogleAuthProvider();

const RegisterForm = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {authUser, isLoading, setAuthUser} = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);

  const singupHandler = async () => {
    if (!email || !password || !username) return;
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      setAuthUser({
        uid: user.uid,
        email: user.email,
        username
      })
      console.log(user);
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <>
      <main className="flex lg:h-[100vh]">
        <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
          <div className="p-8 w-[600px]">
            <h1 className="text-6xl font-semibold">Sign Up</h1>
            <p className="mt-6 ml-1">
              Already have an account ?{" "}
              <Link href="/login" className="underline hover:text-blue-400 cursor-pointer">
                Login
              </Link>
            </p>

            <div
              className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
              onClick={signInWithGoogle}
            >
              <FcGoogle size={22} />
              <span className="font-medium text-black group-hover:text-white">
                Login with Google
              </span>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mt-10 pl-1 flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mt-10 pl-1 flex flex-col">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-10 pl-1 flex flex-col">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                onClick={singupHandler}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div
          className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
          style={{
            backgroundImage: "url('/login-banner.jpg')",
          }}
        ></div>
      </main>
    </>
  );
};

export default RegisterForm;
