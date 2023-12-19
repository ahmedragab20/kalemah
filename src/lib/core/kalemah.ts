import internal from "../store/internal";
import { IGeneric } from "../types";
import {
  getActiveLanguage,
  getActiveLanguageContent,
  getObjPath,
} from "../utils/helpers";

import { setActiveLanguage } from "../utils/helpers";

export interface IKalemah {
  /**
   * Returns the value of the path in the active language.
   * @param path {string}
   * @param dynamics {object}
   * @returns {string}
   */
  k: (path: string, dynamics?: IGeneric) => any;
  /**
   * The active language name.
   */
  lng: () => string;
  /**
   * Set the active language.
   */
  setLng: (lng: string) => void;
}

export default function kalemah(docKey?: string): IKalemah {
  if (docKey && !internal.has(docKey)) {
    throw new Error(`docKey ${docKey} not found`);
  }

  const _activeLng = () => getActiveLanguageContent({ docKey: docKey || "default" }) || {};

  const k = (path: string, dynamics?: IGeneric): string => {
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
  };

  return {
    k,
    lng: () => getActiveLanguage({ docKey: docKey || "default" })!,
    setLng: (lng: string) => setActiveLanguage({ docKey: docKey || "default", name: lng }),
  };
}
