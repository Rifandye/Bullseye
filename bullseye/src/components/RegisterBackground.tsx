import Image from "next/image";
import registerBackground from "../../public/registerbackground.jpg";

export default function RegisterBackground() {
  return (
    <div className="absolute inset-0 z-[-5]">
      <Image
        alt="registerbackground"
        placeholder="blur"
        src={registerBackground}
        quality={100}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
