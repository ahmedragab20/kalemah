import internal from "../store/internal";
import { IGeneric } from "../types";
import { IDocInstance, ILocalization } from "../types/doc";

export function setActiveLanguage({
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

export function getActiveLanguage({
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

export function getActiveLanguageContent({
  docKey,
}: {
  docKey: string;
}): IGeneric | undefined {
  let doc = internal.get(docKey);
  if (!doc) {
    console.error("doc not found");
    return;
  }

  let active = doc._localizations.find(
    (l: ILocalization) => l.name === doc._active
  );
  if (!active) {
    console.error("active language not found");
    return;
  }

  return active.content;
}

/**
 * gets a property in an object based on string
 *
 * e.g. => "k1.c.p" or "['k1'].c.p"
 */
export function getObjPath(obj: IGeneric, path: string): any {
  const keys = parsePath(path);

  let current = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return undefined; // Property not found
    }
  }

  return current;
}

/**
 * parses the input path and returns an array of keys
 */
function parsePath(path: string): string[] {
  const bracketsRegex = /\['(.*?)'\]/g;
  return path.replace(bracketsRegex, ".$1").split(".");
}
