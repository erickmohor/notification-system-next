export function checkIfPhoneNumberIsValid(phone: string) {
  return /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(phone)
}