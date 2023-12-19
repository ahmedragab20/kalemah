import type { IDoc, ILanguage } from "../types/doc";
import internal from "../store/internal";

/**
 * creates a new document instance
 */
export default class Doc {
  private readonly _key: string = "";
  private readonly _browser: boolean = false;
  private readonly _languages: ILanguage[] = [];
  private readonly _default: string = "";
  private readonly _active: string = "";

  constructor(doc: IDoc) {
    if (!doc) {
      throw new Error("Doc must be defined");
    }

    if (!doc?.languages?.length) {
      throw new Error("Doc must have at least one language");
    } else if (doc.languages?.find((l) => !l?.name || !l.content)) {
      throw new Error("Every Language must have a name and content for each language");
    }

    this._key = doc.key || "default";
    this._browser = doc.browser || false;
    this._languages = doc.languages;
    this._default = doc.default || doc.languages?.[0]?.name;
    this._active = doc.active || this._default;

    // persist the doc internally
    internal.set(this._key, this);
  }
}
