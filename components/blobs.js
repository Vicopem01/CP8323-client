import Image from "next/image";
import blob1 from "@/public/blob-1.webp";
import blob2 from "@/public/blob-2.webp";
import blob3 from "@/public/blob-3.webp";
import blob4 from "@/public/blob-4.webp";

const Blobs = () => {
  return (
    <>
      <div className={`absolute top-[1%] -right-[25%] -z-30 w-[70vw]`}>
        <Image src={blob1} alt="blob2" width={600} height={500} />
      </div>
      <div className={`absolute top-[8%] -left-[30vw] -z-30 w-[70vw]`}>
        <Image src={blob2} alt="blob2" width={600} height={500} />
      </div>
      <div className={`absolute top-[15%] -right-[25vw] -z-30 w-[90vw]`}>
        <Image src={blob3} alt="blob3" width={600} height={500} />
      </div>
      <div className={`absolute top-[35%] -left-[10vw] -z-30 w-[80vw]`}>
        <Image src={blob4} alt="blob4" width={600} height={500} />
      </div>
      <div className={`absolute top-[45%] -right-[30vw] -z-30 w-[80vw]`}>
        <Image src={blob4} alt="blob4" width={600} height={500} />
      </div>
    </>
  );
};

export default Blobs;
