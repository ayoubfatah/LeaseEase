// app/sign-up/page.tsx
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="h-[900px]  flex justify-center items-center w-full">
    <div className="bg-white ">
      <SignUp />
    </div>
  </div>
);

export default SignUpPage;
