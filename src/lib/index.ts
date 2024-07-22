import { generateTypes, resolveSchema } from "untyped";

import Doc from "./core/doc";
import kalemah from "./core/kalemah";
import { resolveType } from "./utils/helpers";

export { Doc, kalemah };
const doc = new Doc({
  default: "en",
  localizations: [
    {
      name: "en", // must be unique
      content: {
        title: "Hello World",
        country: {
          name: "Saudi Arabia",
          capital: "Makkah",
          more: {
            name: "More {{category}}",
          },
        },
      },
    },
    {
      name: "ar", // must be unique
      content: {
        title: "مرحبا بالعالم",
        country: {
          name: "السعودية",
          capital: "مكة المكرمة",
          more: {
            name: "المزيد {{category}}",
          },
        },
      },
    },
  ],
});

const { kx } = kalemah();

const title = kx<{ title: string }>((l) => l.title);

const defaultPlanet = {
  name: "earth",
  home: {
    rooms: 4,
    salon: 1,
  },
};

const types = await resolveType(defaultPlanet);
console.log(types);
