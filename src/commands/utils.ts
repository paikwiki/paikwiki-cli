const OPTION_PREFIX = "--";

const stringToObjectConverter = <T extends string, U extends string>(
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

export const optionNameToObjectConverter = <T extends string, U extends string>(
  names: Readonly<T[]>
): Readonly<Record<T, U>> => stringToObjectConverter(names);

export const optionNameToFlagConverter = <T extends string, U extends string>(
  names: Readonly<T[]>
): Readonly<Record<T, U>> => stringToObjectConverter(names, OPTION_PREFIX);
