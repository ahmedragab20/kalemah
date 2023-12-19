import ar from "./ar";
import en from "./en";

import { Doc, kalemah } from "./lib";

const doc = new Doc({
  browser: false,
  default: "en",
  localizations: [
    {
      name: "en",
      content: en,
    },
    {
      name: "ar",
      content: ar,
    },
  ],
});

console.log(doc);

const { k, lng, setLng } = kalemah();

const localStorageLng = localStorage.getItem("lng");

if (localStorageLng) {
  setLng(localStorageLng);

  if (localStorageLng === "ar") {
    document.dir = "rtl";
  } else document.dir = "ltr";
}

const txt = document.getElementById("txt")!;

txt.textContent = k(`country.${true ? "more" : ""}['name']`);

const btn = document.getElementById("btn")!;

btn.addEventListener("click", () => {
  setLng(lng() === "en" ? "ar" : "en");

  localStorage.setItem("lng", lng());
  location.reload();
});
