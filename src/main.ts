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
      dir: "ltr",
    },
    {
      name: "ar",
      content: ar,
      dir: "rtl",
    },
  ],
});

console.log(doc);

const {
  k,
  activeContent,
  changeLanguage,
  exists,
  activeName,
  languages,
  getKey,
  getLocalization,
  dir
} = kalemah();

const localStorageLng = localStorage.getItem("lng");

if (localStorageLng) {
  changeLanguage(localStorageLng);

  if (localStorageLng === "ar") {
    document.dir = "rtl";
  } else document.dir = "ltr";
}

console.log("🌊 does path exist?", exists("country['name']"));

console.log("🌂 active language name", activeName());

console.log("📑 active language content", activeContent());

console.log("🗺 all languages", languages());

console.log("🗝 get key", getKey("country['cities']['0'].name", "en"));


console.log("📚 localization", getLocalization("ar"));

console.log("📚 dir", dir());


const txt = document.getElementById("txt")!;

txt.textContent = k(`country.${true ? "more" : ""}['name']`);

const btn = document.getElementById("btn")!;

btn.addEventListener("click", () => {
  changeLanguage(activeName() === "en" ? "ar" : "en");

  localStorage.setItem("lng", activeName());
  location.reload();
});
