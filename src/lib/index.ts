import Doc from "./core/doc";
import kalemah from "./core/kalemah";

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
