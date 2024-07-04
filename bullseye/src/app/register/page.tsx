import RegisterBackground from "@/components/RegisterBackground";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function RegsiterPage() {
  const handleRegister = async (formData: FormData) => {
    "use server";

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    await response.json();

    return redirect("/login");
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <RegisterBackground />
      <form action={handleRegister}>
        <div className="bg-[#171717] w-[400px] h-[500px] rounded-[20px]">
          <div className="flex justify-evenly items-center flex-col h-full">
            <div className="h-[60%] w-full flex justify-center items-center text-lg font-bold text-white gap-2">
              <h1>Welcome</h1>
            </div>
            <div className="h-full w-full flex flex-col items-center justify-evenly">
              <div className="">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-[300px] h-[45px] rounded-xl bg-transparent text-[#d3d3d3] text-sm outline-none placeholder:text-sm p-3"
                  style={{ boxShadow: "inset 2px 5px 10px rgb(5, 5, 5)" }}
                  name="username"
                />
              </div>
              <div>
                <input
                  className="w-[300px] h-[45px] rounded-xl bg-transparent text-[#d3d3d3] text-sm outline-none placeholder:text-sm p-3"
                  type="password"
                  placeholder="Password"
                  style={{ boxShadow: "inset 2px 5px 10px rgb(5, 5, 5)" }}
                  name="password"
                />
              </div>
            </div>
            <div className="h-[60%] w-full flex flex-col justify-center items-center gap-4">
              <div>
                <button
                  type="submit"
                  className="bg-[#252525] hover:bg-[#303030] text-white h-[40px] w-[150px] rounded-xl"
                  style={{ transition: "0.4s ease-in-out" }}
                >
                  Register
                </button>
              </div>
              <div className="text-sm text-white">
                <p>
                  Already have an accout?{" "}
                  <Link href="/login">
                    <span className="underline">Login</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
