import type { IGeneric } from ".";
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
   * The languages in this doc.
   */
  languages: ILanguage[];
  /**
   * The default language to use (language name).
   */
  default?: string;
  /**
   * active language
   */
  active?: string;
}

export interface ILanguage {
  /**
   * name of the language
   */
  name: string;
  /**
   * the files of the languages
   * @type object (keys, values)
   */
  content: IGeneric;
}
