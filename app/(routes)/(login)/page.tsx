import Banner from "@/app/_features/login/components/banner";
import LoginForm from "@/app/_features/login/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="hidden sm:w-[40%] sm:bg-darkGreen-500 sm:grid sm:place-items-center">
        <Banner
          wrapperClassName="text-white text-center flex flex-col gap-4"
          width={175}
          height={175}
          headerClassName="text-xl"
          paragraphClassName="text-3xl font-extrabold"
        />
      </div>
      <div className="sm:w-[60%] sm:mt-0 w-full sm:grid sm:justify-normal sm:place-items-center flex justify-center mt-20">
        <div className="w-[80%] sm:w-[60%]">
          <div className="mb-4 grid gap-2">
            <p className="hidden sm:block sm:text-3xl sm:font-bold">Login</p>
            <p className="hidden sm:block sm:text-xl">
              Enter your credentials to continue
            </p>
            <Banner
              wrapperClassName="sm:hidden text-center flex flex-col gap-2 mb-4"
              width={120}
              height={120}
              headerClassName="mt-4"
              paragraphClassName="text-lg font-bold"
            />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
