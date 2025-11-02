export interface MorseTable {
  [key: string]: string;
}

export interface MorseData {
  en: MorseTable;
  ja: MorseTable;
  number: MorseTable;
}

export type Mode = "en" | "ja";
