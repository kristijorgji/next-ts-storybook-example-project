import prem from 'polished/lib/helpers/rem';

export const getRem: () => (val: number) => string = () => (val: number) => prem(val);
