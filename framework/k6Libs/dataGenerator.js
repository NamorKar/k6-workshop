import { randomIntBetween, randomString, randomItem } from './k6Utils.js';

// First names pool
const firstNames = [
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph',
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica',
  'Thomas', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven',
  'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Helen', 'Sandra', 'Donna'
];

// Last names pool
const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White',
  'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Hall'
];

// Email domains pool
const emailDomains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'test.com',
  'example.com', 'mail.com', 'inbox.com', 'email.com'
];

// Street names pool
const streetNames = [
  'Main', 'Oak', 'Pine', 'Maple', 'Cedar', 'Elm', 'Washington', 'Lake',
  'Hill', 'Park', 'Church', 'Center', 'Market', 'Union'
];

const streetTypes = ['St', 'Ave', 'Blvd', 'Rd', 'Ln', 'Dr', 'Way', 'Ct'];

/**
 * Generate a random first name
 */
export function randomFirstName() {
  return randomItem(firstNames);
}

/**
 * Generate a random last name
 */
export function randomLastName() {
  return randomItem(lastNames);
}

/**
 * Generate a random full name
 */
export function randomFullName() {
  return `${randomFirstName()} ${randomLastName()}`;
}

/**
 * Generate a random username
 * @param {number} length - Optional length of random suffix
 */
export function randomUsername(length = 4) {
  const firstName = randomFirstName().toLowerCase();
  const suffix = randomIntBetween(100, 9999);
  return `${firstName}_${suffix}`;
}

/**
 * Generate a random email address
 */
export function randomEmail() {
  const firstName = randomFirstName().toLowerCase();
  const lastName = randomLastName().toLowerCase();
  const domain = randomItem(emailDomains);
  const separator = randomItem(['', '.', '_']);
  const number = Math.random() > 0.5 ? randomIntBetween(1, 999) : '';
  
  return `${firstName}${separator}${lastName}${number}@${domain}`;
}

/**
 * Generate a random phone number (US format)
 */
export function randomPhone() {
  const areaCode = randomIntBetween(200, 999);
  const prefix = randomIntBetween(200, 999);
  const lineNumber = randomIntBetween(1000, 9999);
  
  return `+1${areaCode}${prefix}${lineNumber}`;
}

/**
 * Generate a random password
 * @param {number} length - Password length (default: 12)
 */
export function randomPassword(length = 12) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  
  const allChars = lowercase + uppercase + numbers + symbols;
  
  // Ensure at least one of each type
  let password = '';
  password += lowercase[randomIntBetween(0, lowercase.length - 1)];
  password += uppercase[randomIntBetween(0, uppercase.length - 1)];
  password += numbers[randomIntBetween(0, numbers.length - 1)];
  password += symbols[randomIntBetween(0, symbols.length - 1)];
  
  // Fill remaining length
  for (let i = password.length; i < length; i++) {
    password += allChars[randomIntBetween(0, allChars.length - 1)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

/**
 * Generate a random address
 */
export function randomAddress() {
  const streetNumber = randomIntBetween(1, 9999);
  const streetName = randomItem(streetNames);
  const streetType = randomItem(streetTypes);
  
  return `${streetNumber} ${streetName} ${streetType}`;
}

/**
 * Generate a random city name
 */
export function randomCity() {
  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Seattle', 'Denver', 'Boston', 'Portland', 'Nashville', 'Detroit', 'Miami'
  ];
  return randomItem(cities);
}

/**
 * Generate a random US state code
 */
export function randomState() {
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  return randomItem(states);
}

/**
 * Generate a random ZIP code
 */
export function randomZipCode() {
  return randomIntBetween(10000, 99999).toString();
}

/**
 * Generate a random company name
 */
export function randomCompany() {
  const prefixes = ['Tech', 'Global', 'Smart', 'Digital', 'Cyber', 'Web', 'Cloud', 'Data'];
  const suffixes = ['Corp', 'Inc', 'LLC', 'Systems', 'Solutions', 'Technologies', 'Group', 'Labs'];
  
  return `${randomItem(prefixes)} ${randomItem(suffixes)}`;
}

/**
 * Generate a random credit card number (for testing - not valid)
 */
export function randomCreditCard() {
  const parts = [];
  for (let i = 0; i < 4; i++) {
    parts.push(randomIntBetween(1000, 9999));
  }
  return parts.join('-');
}

/**
 * Generate a random date between two dates
 * @param {Date} start - Start date
 * @param {Date} end - End date
 */
export function randomDate(start = new Date(2020, 0, 1), end = new Date()) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  
  return new Date(randomTime);
}

/**
 * Generate a random boolean
 */
export function randomBoolean() {
  return Math.random() >= 0.5;
}

/**
 * Generate a random user object with common fields
 */
export function generateRandomUser() {
  const firstName = randomFirstName();
  const lastName = randomLastName();
  
  return {
    id: randomIntBetween(1000000, 9999999),
    username: randomUsername(),
    firstName: firstName,
    lastName: lastName,
    email: randomEmail(),
    password: randomPassword(),
    phone: randomPhone(),
    userStatus: randomItem([0, 1, 2])
  };
}

/**
 * Generate a random product name
 */
export function randomProduct() {
  const adjectives = ['Premium', 'Deluxe', 'Professional', 'Ultimate', 'Advanced', 'Standard'];
  const products = ['Widget', 'Gadget', 'Tool', 'Device', 'System', 'Kit', 'Package'];
  
  return `${randomItem(adjectives)} ${randomItem(products)}`;
}

/**
 * Generate a random price
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 */
export function randomPrice(min = 10, max = 1000) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// Re-export utility functions from k6Utils for convenience
export { randomIntBetween, randomString, randomItem } from './k6Utils.js';
