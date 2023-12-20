import internal from "../store/internal";
import type { IGeneric } from "../types";
import type { IDocInstance, ILocalization } from "../types/doc";
import {
  activeLocalizationName,
  activeLocalizationContent,
  getObjPath,
  exists,
  getLocalization,
  changeLanguage,
  getLocalizations,
} from "../utils/helpers";

export interface IKalemah {
  /**
   * Returns the value of the path in the active localization content.
   * @param path {string}
   * @param dynamics {object}
   * @returns {string}
   */
  k: (path: string, dynamics?: IGeneric) => any;
  /**
   * The active localization name.
   */
  activeName: () => string;
  /**
   * Set the active localization.
   */
  changeLanguage: (lng: string) => void;
  /**
   * Check if the path exists in the active localization content.
   */
  exists: (path: string) => boolean;
  /**
   * The active localization content.
   */
  activeContent: () => IGeneric;
  /**
   * Returns all the localizations content
   */
  contents: () => IGeneric[];
  /**
   * gets the value of a key in a localization content or in the active localization content.
   */
  getKey: (key: string, lngName?: string) => any;
  /**
   * returns Localization (with all the details)
   */
  getLocalization: (lngName?: string) => ILocalization | undefined;
  /**
   * returns the entire Localizations (with all the details)
   */
  getLocalizations: (lngName?: string) => ILocalization[] | undefined;
  /**
   * the direction of the localization
   */
  dir: (lngName?: string) => string | undefined;
}
/**
 * bunch of helpers to interact with the document
 */
export default function kalemah(docKey?: string): IKalemah {
  if (docKey && !internal.has(docKey)) {
    throw new Error(`docKey ${docKey} not found`);
  }

  function _activeLng(): IGeneric {
    return activeLocalizationContent({ docKey: docKey || "default" }) || {};
  }

  function k(path: string, dynamics?: IGeneric): string {
    if (!dynamics) {
      return getObjPath(_activeLng(), path);
    }
    console.log(dynamics);

    let txt: string = getObjPath(_activeLng(), path);

    for (const key in dynamics) {
      let pattern = new RegExp(`{{${key}}}`, "g");
      txt = txt.replace(pattern, dynamics[key]);
    }

    return txt;
  }

  function getKey(key: string, lngName?: string) {
    if (!key) {
      console.error("key is required");

      return;
    }

    const lng =
      lngName || activeLocalizationName({ docKey: docKey || "default" });
    return getObjPath(
      (internal.get(docKey || "default") as IDocInstance)?._localizations?.find(
        (l) => l.name === lng
      )?.content || {},
      key
    );
  }

  function dir(lngName?: string) {
    return getLocalization({
      docKey: docKey || "default",
      name: lngName,
    })?.dir;
  }

  return {
    k,
    activeName: () => activeLocalizationName({ docKey: docKey || "default" })!,
    changeLanguage: (lng: string) =>
      changeLanguage({ docKey: docKey || "default", name: lng }),
    exists: (path: string) => exists({ docKey: docKey || "default", path }),
    activeContent: () => _activeLng(),
    contents: () =>
      (internal.get(docKey || "default") as IDocInstance)?._localizations?.map(
        (l) => l.content
      ),
    getKey,
    getLocalization: (lngName?: string) =>
      getLocalization({
        docKey: docKey || "default",
        name: lngName,
      }),
    getLocalizations: (docKey?: string) =>
      getLocalizations({
        docKey: docKey || "default",
      }),
    dir,
  };
}
