export function makeid(length: number = 5) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

export const isOdd = (num: number) => num % 2

export const combineClassNames = (...classNames: (string | undefined)[]): string => {
  if (!classNames?.length) return ''
  return classNames.filter((className) => !!className).join(' ')
}

export const isNumber = (value: unknown) => {
  return typeof value === 'number' && isFinite(value)
}

const levenshteinDistance = (a: string, b: string) => {
  const matrix = [];

  // Initialize the matrix
  for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
  }

  // Calculate the distance
  for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) == a.charAt(j - 1)) {
              matrix[i][j] = matrix[i - 1][j - 1];
          } else {
              matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                                      Math.min(matrix[i][j - 1] + 1, // insertion
                                               matrix[i - 1][j] + 1)); // deletion
          }
      }
  }

  return matrix[b.length][a.length];
}

export const isSimilar = (str1: string, str2: string) => {
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return true; // both strings are empty

  const distance = levenshteinDistance(str1, str2);
  const similarity = (maxLength - distance) / maxLength;
  return similarity >= 0.8;
}