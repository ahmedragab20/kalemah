import internal from "../store/internal";
import type { IGeneric } from "../types";
import type { IDocInstance, ILocalization } from "../types/doc";

export function changeLanguage({
  docKey,
  name,
}: {
  docKey: string;
  name: string;
}): string | undefined {
  let doc: IDocInstance = internal.get(docKey);
  if (!doc) {
    console.error("doc not found");
    return;
  }

  // check if name doesn't exist
  const wrongName = doc?._localizations?.find((l) => l.name === name);

  if (!wrongName) {
    console.error("please double check the name, it doesn't exist");
    return;
  }

  doc._active = name;
  internal.set(docKey, doc);
}

export function activeLocalizationName({
  docKey,
}: {
  docKey: string;
}): string | undefined {
  let doc = internal.get(docKey);
  if (!doc) {
    console.error("doc not found");
    return;
  }

  return doc._active;
}

export function activeLocalizationContent({
  docKey,
}: {
  docKey: string;
}): IGeneric | undefined {
  let doc = internal.get(docKey);
  if (!doc) {
    console.error("doc not found");
    return;
  }

  return activeLocalization({ docKey: docKey }).content;
}

/**
 * Returns The Active Localization
 */
export function activeLocalization({ docKey }: { docKey: string }) {
  let doc = internal.get(docKey);
  if (!doc) {
    console.error("doc not found");
    return;
  }

  let active = doc._localizations.find(
    (l: ILocalization) => l.name === doc._active
  );

  if (!active) {
    console.error("active Localization not found");
    return;
  }

  return active;
}

/**
 * checks if the key exist in the document
 */
export function exists({
  docKey,
  path,
}: {
  docKey: string;
  path: string;
}): boolean {
  let doc = internal.get(docKey);
  if (!doc) {
    console.error("doc not found");
    return false;
  }

  return (
    getObjPath(activeLocalizationContent({ docKey }) || {}, path) !== undefined
  );
}

/**
 * returns localization by name
 */

export function getLocalization({
  docKey,
  name,
}: {
  docKey: string;
  name?: string;
}): ILocalization | undefined {
  let doc: IDocInstance = internal.get(docKey);
  if (!doc) {
    console.error("doc not found");
    return;
  }
  if (!name) {
    return activeLocalization({ docKey: docKey });
  }

  return doc._localizations.find((l) => l.name === name);
}

/**
 * Get all localizations
 */
export function getLocalizations({ docKey }: { docKey: string }) {
  let doc: IDocInstance = internal.get(docKey);
  if (!doc) {
    console.error("doc not found");
    return;
  }

  return doc._localizations;
}

/**
 * gets a property in an object based on string
 *
 * e.g. => "k1.c.p" or or "k1.['c']['0']"
 */
export function getObjPath(obj: IGeneric, path: string): any {
  const keys = parsePath(path);

  if (!keys || !keys?.length) {
    return;
  }

  let current = obj;
  for (const key of keys) {
    if (current && typeof current === "object") {
      if (Array.isArray(current) && /^\d+$/.test(key) /* if key is digit */) {
        const index = parseInt(key, 10);

        if (index >= 0 && index < current.length) {
          current = current[index];
        } else {
          return undefined;
        }
      } else if (key in current) {
        // @ts-ignore
        current = current[key];
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  return current;
}

/**
 * parses the input path and returns an array of keys
 */
function parsePath(path: string): string[] | undefined {
  if (!path) {
    console.warn("key is undefined");
    return;
  }

  const bracketsRegex = /\['(.*?)'\]/g;

  return path?.replace(bracketsRegex, ".$1")?.split(".");
}
