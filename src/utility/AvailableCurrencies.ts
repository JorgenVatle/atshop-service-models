export type CurrencyCode<Extras extends string = never> = 'USD' | 'EUR' | 'GBP' | Extras;

export default [
    'USD',
    'EUR',
    'GBP',
] as CurrencyCode[];