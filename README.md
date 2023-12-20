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
```

> 💡 <br />
> By the way, you can create limitless number of documents. **LIMITLESS!** <br />
> let me show you how...

```ts
import { Doc } from "kalemah";

const doc = new Doc({
  key: "en-fr-doc", // this will be a completely separate document from the default one
  localizations: [
    {
      name: "en", // must be unique (no worries if you're using it in anther document)
      content: {...}
    },
    {
      name: "fr", // must be unique
      content: {...}
    }
  ],
});
```

✨ I encourage you to dig deeper into the library to understand it better, and for more info about what each property exactly does, you can just hover on it
<br />

🍄 kindly consider that some of the properties are not meant to have direct impact on your application yet<br />
some properties are designed to be used later to help in scaling the library for future purposes (stay tuned). ❤️

### 🌪️ Translation

let's go over the second method that the library provides for you to interact with the documents. <br />

#### basic referencing

```ts
import { kalemah } from "kalemah";
const { k } = kalemah(/* doc_id */);

// flat
const msg = k("title");

// dot notation referencing
const msg = k("key.sub1.sub2");

// bracket notation referencing
const msg = k("key.sub1['sub2']");

// array index
const msg = k("country['cities']['0'].name");

// conditional & mixed
const msg = k(`country.${true ? "more" : ""}['names']['0']`);
```

#### Interpolation

allows you to change any key surrounded by `{{dynamic_key}}`

> prefix: _{{_ <br />
> suffix: _}}_ <br /> > **the key must be in between**

```ts
import { kalemah } from "kalemah";
const { k } = kalemah(/* doc_id */);

// { key: "{{country_name}} is where I'm from" }

const msg = k("key", {
  country_name: "Egypt",
  // the other dynamic keys go here...
});
// result: Egypt is where I'm from
```

> 🀄️ <br /> > `kalemah()` -> refers to the default document <br /> > `kalemah(/* doc_id */)` -> if you have a document with an especial "key"

#### changeLanguage(local_name)

changes the active localization for the target doc

```ts
import { kalemah } from "kalemah";
const { changeLanguage } = kalemah(/* doc_id */);

changeLanguage("local_name");
```

#### activeContent()

Returns the active localization content for the target doc

```ts
import { kalemah } from "kalemah";
const { activeContent } = kalemah(/* doc_id */);

const content = activeContent();
```

#### activeName()

Returns The active localization name for the target doc

```ts
import { kalemah } from "kalemah";
const { activeName } = kalemah(/* doc_id */);

const content = activeName();
```

#### getLocalization()

Returns the whole object of a localization in the target doc

```ts
import { kalemah } from "kalemah";
const { getLocalization } = kalemah(/* doc_id */);

const local = getLocalization(); // without local_name it will return the active localization
const arLocal = getLocalization("ar"); // the arabic localization, even if it's not the active one
```

#### getLocalizations()

Returns (All) the localizations in the target doc

```ts
import { kalemah } from "kalemah";
const { getLocalizations } = kalemah(/* doc_id */);

const locals = getLocalizations();
```

#### contents()

Returns all the localizations content in the target doc

```ts
import { kalemah } from "kalemah";
const { contents } = kalemah(/* doc_id */);

const contents = contents();
```

#### getKey()

Gets the value of a key in a localization content or in the active localization content (in the target doc).

```ts
import { kalemah } from "kalemah";
const { getKey } = kalemah(/* doc_id */);

const key = getKey("country['cities']['0'].name", "local_name");

// search in the active localization directly
const key2 = getKey("country['cities']['0'].name");
```

#### exists(prop_path?)

Check if the path exists in the active localization content.

```ts
import { kalemah } from "kalemah";
const { exists } = kalemah(/* doc_id */);

if (exists("country.code")) {
  // ...
}
```

#### dir(local_name?)

Returns the direction of the localization

```ts
import { kalemah } from "kalemah";
const { dir } = kalemah(/* doc_id */);

dir(); // active localization direction
dir("en"); // ltr
dir("ar"); // rtl
```

---
###### Palestine, Sudan, Syria - I will never forget
<h3>
🇵🇸🇸🇩🇸🇾
</h3>

###### Free My People. Be on the right side of the history

---
Alhamdulillah, Allah is the best of the planners 💚️ <br />
<strong><small>MIT © Ahmed Ragab</small></strong>
