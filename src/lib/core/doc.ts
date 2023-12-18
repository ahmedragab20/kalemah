//! NOTE -> will need to investigate into how to insert localizations

import type { IDoc, ILanguage } from "../types/doc";

/**
 * creates a new document instance
 */
export default class Doc {
  private readonly _key: string = "";
  private readonly _browser: boolean = false;
  private readonly _languages: Partial<ILanguage>[] = [];
  private readonly _default: string = "";

  constructor(doc: IDoc) {
    if (!doc?.languages?.length) {
      throw new Error("Doc must have at least one language");
    } else if (doc.languages?.find((l) => !l?.path && !l.content)) {
      throw new Error("Doc must have a path or content for each language");
    }

    this._key = doc.key || "default";
    this._browser = doc.browser || false;
    this._languages = doc.languages;
    this._default = doc.default || doc.languages?.[0]?.path || "";
  }
}
