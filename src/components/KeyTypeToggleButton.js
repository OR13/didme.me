import React from "react";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

export const KeyTypeToggleButton = ({ value, onChange }) => {
  const handleAlignment = (event, newKeyType) => {
    onChange(newKeyType);
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleAlignment}
      aria-label="key type"
    >
      <ToggleButton value="ed25519" aria-label="ed25519">
        Ed25519
      </ToggleButton>
      <ToggleButton value="bls12381" aria-label="bls12381">
        Bls12381
      </ToggleButton>
      <ToggleButton value="secp256k1" aria-label="secp256k1">
        Secp256K1
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
