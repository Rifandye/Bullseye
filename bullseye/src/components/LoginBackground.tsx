import Image from "next/image";
import loginBackground from "../../public/loginbackground.jpg";

export default function LoginBackground() {
  return (
    <div className="absolute inset-0 z-[-5]">
      <Image
        alt="loginbackground"
        src={loginBackground}
        placeholder="blur"
        quality={100}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
