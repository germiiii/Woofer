import { useState } from "react";
import Image from "next/image";
import styles from '../home/StyledHome.module.css'



export default function SwitchType() {
  const [isWalkerMock, setIsWalkerMock] = useState(false);

  const handleSwitchChange = (newValue) => {
    setIsWalkerMock(newValue);
  };

  return (
    <div>

      <div>Choose your type</div>
      <div className="flex flex-col lg:flex-row ml-2">
  {/* <button
    className="px-12 py-5 rounded-full w-full sm:w-fit mr-40 ml-10 bg-gradient-to-r from-violet-200 via-violet-600 to-blue-900 hover:bg-slate-800 text-white border mt-3 lg:mt-0 relative"
    onClick={() => {
      router.push("/login");
    }}
  >
    <Image
      src="/dog.png"
      alt="Dog"
      width={50}
      height={50}
      checked={!isWalkerMock}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />
  </button> */}

  <label>

        Owner
        <input
          type="radio"
          checked={!isWalkerMock}
          onChange={() => handleSwitchChange(false)}
        />
      </label> 
      <label>

        Walker
        <input
          type="radio"
          checked={isWalkerMock}
          onChange={() => handleSwitchChange(true)}
        />
      </label> 
      
</div>

{/* <button
    className="px-12 py-5 rounded-full w-full sm:w-fit mr-40 ml-10 bg-gradient-to-r from-violet-200 via-violet-600 to-blue-900 hover:bg-slate-800 text-white border mt-3 lg:mt-0 relative"
    onClick={() => {
      router.push("/login");
    }}
  >
    <Image
      src="/walker.png"
      alt="walker"
      width={50}
      height={50}
      checked={isWalkerMock}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />
  </button> */}

{/* <label className={styles.switchContainer}>
      <div className={styles.toggle}>
        <input
          type="checkbox"
          className={styles.checkboxInput}
          checked={isWalkerMock}
          onChange={() => handleSwitchChange(!isWalkerMock)}
        />
        <div className={`${styles.toggle__line} w-full h-4 rounded-full`} />
        <div className={`${styles.toggle__dot} w-6 h-6 rounded-full`} />
      </div>
      <div className="ml-3 text-gray-700 font-medium">Walker</div>
    </label> */}

    </div>
  );
}
