import { SpecifierSymbols } from '../shared/specifier-symbols';

export type SpecifierSymbolType =
  (typeof SpecifierSymbols)[keyof typeof SpecifierSymbols];

export type SpecifierType = {
  text: string;
  symbol: SpecifierSymbolType;
};
