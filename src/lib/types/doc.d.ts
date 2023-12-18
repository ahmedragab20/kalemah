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
  languages: Partial<ILanguage>[];
  /**
   * The default language to use (file path).
   */
  default?: string;
}

export interface ILanguage {
  /**
   * The path to the file.
   */
  path: string;
  /**
   * the files of the languages
   * @type object (keys, values)
   */
  content: IGeneric;
}
