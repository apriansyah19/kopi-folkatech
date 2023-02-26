// https://stackoverflow.com/a/9808332
const emailPattern =
  /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-z0-9-]{1,63}\.){1,8}[a-z]{2,63}$/;

export const emailFormat = (val) =>
  emailPattern.test(val) || val === "" || "Please enter a valid email address";

export const required = (val) => !!val || "Wajib diisi";

export const phoneMinLength = (val) =>
  val.length >= 10 || "Please use minimum 10 character";

export const passwordMinLength = (val) =>
  val.length >= 8 || "Please use minimum 8 character";
