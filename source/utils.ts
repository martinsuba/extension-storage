export function validateArgument(argument: unknown, type: 'string' | 'array' | 'object'): void {
  let valid: boolean;
  if (type === 'array') {
    valid = Array.isArray(argument);
  } else {
    valid = typeof argument === type;
  }
  if (!valid) {
    throw new Error(`[Browser extension storage]: Invalid argument. Should be type of '${type}'`);
  }
}
