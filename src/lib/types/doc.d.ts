import type { IGeneric } from ".";
/**
 * The Documentation instance
 */
export interface IDoc {
  /**
   * The key of this doc.
   * @default 'default'
   */
  key?: string;
  /**
   * Whether or not this is a browser doc - used on the client side
   */
  browser?: boolean;
  /**
   * The localizations of this doc.
   */
  localizations: ILocalization[];
  /**
   * The default localization to use (localization name).
   */
  default?: string;
  /**
   * active localization
   */
  active?: string;
}

/**
 * The internal inherited properties of the document instance
 */
export interface IDocInstance {
  _key: string;
  _browser: boolean;
  _localizations: ILocalization[];
  _default: string;
  _active: string;
}

export interface ILocalization {
  /**
   * name of the localization (MUST BE UNIQUE)
   */
  name: string;
  /**
   * the file of the localization
   * @type object (keys, values)
   */
  content: IGeneric;
  /**
   * dir, will be considered if you're in the browser mode
   */
  dir?: string;
  /**
   * country code of the language, consider it if you have more than on accent for a language
   */
  country?: string;
  /**
   * code of the localization (Lang-CountryCode)
   */
  code?: string;
  /**
   * ISO code
   */
  iso?: string;
}
