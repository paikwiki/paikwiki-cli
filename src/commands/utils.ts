export const nameObjectConverter = <T extends string, U extends string>(
  names: Readonly<T[]>,
  withPrefixForValue?: string
): Readonly<Record<T, U>> => {
  const nameObject: Partial<Record<T, U>> = {};
  names.forEach((name) => {
    nameObject[name] = (
      withPrefixForValue ? `${withPrefixForValue}${name}` : name
    ) as U;
  });

  return nameObject as Readonly<Record<T, U>>; // TODO: as 제거
};
