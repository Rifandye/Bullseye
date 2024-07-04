import Image from "next/image";
import registerBackground from "../../public/registerbackground.jpg";

export default function RegisterBackground() {
  return (
    <Image
      alt="registerbackground"
      placeholder="blur"
      src={registerBackground}
      quality={100}
      layout="fill"
      objectFit="cover"
      className="z-[-5]"
    />
  );
}
