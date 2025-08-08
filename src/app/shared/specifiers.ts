import { SpecifierType } from '../types/specifier.types';
import { SpecifierSymbols } from './specifier-symbols';

export function getSpecifiers(forTimer?: boolean): SpecifierType[] {
  const specifiers: SpecifierType[] = [
    { text: 'At Least', symbol: SpecifierSymbols.AtLeast },
    { text: 'Less Than', symbol: SpecifierSymbols.LessThan },
    { text: 'Any Value', symbol: SpecifierSymbols.AnyValue },
    { text: 'Exactly', symbol: SpecifierSymbols.Exactly },
  ];

  if (forTimer) {
    // Return without 'Exactly' option
    return specifiers.slice(0, 3);
  }

  return specifiers;
}
