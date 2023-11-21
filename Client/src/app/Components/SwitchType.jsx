import { useState } from "react";

export default function SwitchType() {
  const [isWalkerMock, setIsWalkerMock] = useState(false);

  const handleSwitchChange = (newValue) => {
    setIsWalkerMock(newValue);
  };

  return (
    <div>
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
  );
}
