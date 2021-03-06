export const required = value => (value ? undefined : 'Required')

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'enter full email'
    : undefined

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

export const maxLength = max => value =>
  value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined
export const maxLength140 = maxLength(140)

export const minLength = min => value =>
  value && value.length < min
    ? `Must be ${min} characters or more`
    : undefined
// export const minLength2 = minLength(2)

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
