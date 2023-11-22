export function makeid(length: number = 5) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export const isOdd = (num: number) => num % 2;

export const combineClassNames = (...classNames: (string | undefined)[]): string => {
  if(!classNames?.length) return ''
  return classNames.filter(className => !!className).join(' ')
}