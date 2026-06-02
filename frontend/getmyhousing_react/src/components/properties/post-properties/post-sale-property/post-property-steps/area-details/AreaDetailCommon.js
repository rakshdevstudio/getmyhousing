export const floorOptions = Array.from({ length: 203 }, (_, index) => {
  if (index === 0) {
    return "Basement 1";
  } else if (index === 1) {
    return "Basement 2";
  } else if (index === 2) {
    return "Ground Floor";
  } else {
    // Remove leading zeros for labels greater than 2
    const label = String(index - 2);
    return label === "0" ? "00" : label;
  }
});

export const shopFloorOptions = Array.from({ length: 205 }, (_, index) => {
  if (index === 0) {
    return "Basement 1";
  } else if (index === 1) {
    return "Basement 2";
  } else if (index === 2) {
    return "Lower Ground Floor";
  } else if (index === 3) {
    return "Ground Floor";
  } else if (index === 4) {
    return "Ground+Mezzanine";
  } else if (index === 5) {
    return "Mezzanine Floor";
  } else {
    // Remove leading zeros for labels greater than 5
    const label = String(index - 5);
    return label === "0" ? "00" : label;
  }
});

export const rooms = Array.from({ length: 990 }, (_, index) =>
  (index + 11).toString()
);

export const washroomount = Array.from({ length: 11 }, (_, index) => {
  return index === 0
    ? "None"
    : String(index).padStart(2, "0").replace(/^0+/, "");
});

export const floorOptionsres = Array.from({ length: 203 }, (_, index) => {
  if (index === 0) {
    return "Ground Floor";
  } else {
    // Remove leading zeros for labels greater than 0
    const label = String(index);
    return label === "0" ? "00" : label;
  }
});
