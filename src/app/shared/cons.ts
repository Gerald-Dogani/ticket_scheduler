export const LUFTHANSA_IMAGE = "https://www.lufthansa.com/etc/designs/dcep/lh-logo-crane-typo.svg"
export const SITE_KEY = '6LdXNKEeAAAAACZ3urPRamdA8CTAVGuDqT6xNUhe'


export function scFormatDateTimeToTimeStamp(dateInput: Date): any | '' {

  try {
    return dateInput;
  } catch (e) {
    return '';
  }
}
