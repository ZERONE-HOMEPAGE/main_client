interface User {
  name: string;
  major: string;
  school: string;
}

export function parsing(account_name: string): User | null {
  try {
    const words = account_name.split('|').map((p) => p.trim());
    if (words.length !== 3) return null;

    const [name, major, school] = words;

    return { name, major, school };
  } catch (error) {
    console.error('Parsing error:', error);
    return null;
  }
}
