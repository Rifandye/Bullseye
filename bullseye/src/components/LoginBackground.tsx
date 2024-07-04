import Image from "next/image";
import loginBackground from "../../public/loginbackground.jpg";

export default function LoginBackground() {
  return (
    <Image
      alt="loginbackground"
      src={loginBackground}
      placeholder="blur"
      quality={100}
      layout="fill"
      objectFit="cover"
      className="z-[-5]"
    />
  );
}
