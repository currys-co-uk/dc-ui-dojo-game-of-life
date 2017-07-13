export function stringify(array) {
  return array
        .map(row => row.join(''))
        .join('\n');
}

export function arrayify(string) {
  return string
        .trim()
        .split('\n')
        .map(
            row => row
                .split('')
                .filter(a => !a.match(/\s/)),
        );
}
