# Kalemah - كَلِمة

😄 Kalemah in arabic means "word"

## Get Started

```bash [npm]
npm install kalemah
```

```bash [yarn]
yarn add kalemah
```

```bash [pnpm]
pnpm add kalemah
```

### Initializing new document

Kalemah gives you the possibility to have more than one document and each document can hold mutual or different localizations with different options

```ts
import { Doc } from "kalemah";

const doc = new Doc({
  default: "en",
  localizations: [
    {
      name: "en",
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
      name: "ar",
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
```

✨ I encourage you to dig deeper into the library to understand it better, and for more info about what each property exactly does, you can just hover on it
<br />

🍄 kindly consider that some of the properties are not meant to have direct impact on your application yet<br />
some properties are designed to be used later to help in scaling the library for future purposes (stay tuned). ❤️

### 🌪️ Translation

Will go over the second method that the library provides for you to interact with the documents. <br />

🤓 the examples from the code sample above

<input type="checkbox" /> examples on using more than one document <br />

#### basic referencing

```ts
import { kalemah } from "kalemah";
...

```

<input type="checkbox" /> note that language and local means the same <br />
<input type="checkbox" /> k method <br />
<input type="checkbox" /> simple reference <br />
<input type="checkbox" /> interpolation reference <br />
<input type="checkbox" /> referencing syntax <br />
<input type="checkbox" /> activeContent <br />
<input type="checkbox" /> exists <br />
<input type="checkbox" /> activeName <br />
<input type="checkbox" /> languages <br />
<input type="checkbox" /> changeLanguage <br />
<input type="checkbox" /> getKey <br />
<input type="checkbox" /> getLocalization <br />
<input type="checkbox" /> getLocalizations <br />
<input type="checkbox" /> dir <br />
<input type="checkbox" /> examples with different documents <br />