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

export const readClipboardHtml = async () => {
  try {
    // Check if Clipboard API is available
    if (!navigator.clipboard) {
      console.error('Clipboard API not available');
      return;
    }

    // Request permission to read from the clipboard
    const permission = await navigator.permissions.query({ name: "clipboard-read" as PermissionName });

    if (permission.state === "granted" || permission.state === "prompt") {
      // Read from the clipboard
      const clipboardItems = await navigator.clipboard.read();

      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type === "text/html") {
            const blob = await clipboardItem.getType(type);
            const html = await blob.text();
            return html; // Return the HTML content
          }
        }
      }

      console.log('No HTML content found on the clipboard');
    } else {
      console.error('Clipboard read permission denied');
    }
  } catch (err) {
    console.error('Error reading from clipboard:', err);
  }
}