import icons from "./icons";

const { BiSolidStar, BiStar } = icons;

export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (number) => Number(number?.toFixed(1)).toLocaleString();


export const renderStarFromNumber = (number, size) => {
  const stars = [];
  for (let i = 0; i < +number; i++) stars.push(<BiSolidStar color="orange" size ={size || 16}></BiSolidStar>);
  for (let i = 5; i > +number; i--) stars.push(<BiStar color="orange" size ={size || 16}></BiStar>);
  return stars;
};
