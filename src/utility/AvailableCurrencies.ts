const CurrencyCodes = [
    'USD',
    'EUR',
    'GBP',
] as const;

export type CurrencyCode = typeof CurrencyCodes[number];