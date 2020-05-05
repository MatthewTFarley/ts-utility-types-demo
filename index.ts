/**
 * * Example type for demonstration
 */
type User = {
  id: number;
  name: string;
};

/**
 * * Example type for demonstration
 */
type Post = {
  id: number;
  title: string;
};






/**
 * * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type keyofUser = keyof User;

var user1: User = {
  id: 1,
  name: "Jane",
};

var partialUser: Partial<User> = {
  name: "John",
};

function overlyStrict(user: User, updates: User): User {
  return {
    ...user,
    ...updates,
  };
}

function updateUser(user: User, updates: Partial<User>): User {
  return {
    ...user,
    ...updates,
  };
}

overlyStrict(user1, { name: "Jim" });
// ! Argument of type '{ name: string; }' is not assignable to parameter of type 'User'.
// ! Property 'id' is missing in type '{ name: string; }' but required in type 'User'

// partial User allows y to be left out
updateUser(user1, { name: "Jane" });











/**
 * * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};

var user1: Required<User> = {
  // ! Property 'name' is missing in type '{ id: number; }'
  // ! but required in type 'Required<User>'
  id: 1,
};

var user2: Required<User> = {
  id: 2,
  name: "John",
};










/**
 * * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

var readOnlyUser: Readonly<User> = {
  id: 1,
  name: "Jane",
};

readOnlyUser.name = "Jen"; // ! Cannot assign to 'name' because it is a read-only property.










/**
 * * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

var badPickedUser: Pick<User, "age"> = {
  // ! Type '"age"' does not satisfy the constraint '"id" | "name"'.
  age: 1,
};

var pickedUser: Pick<User, "name"> = {
  name: "Sam",
};

pickedUser.id = 1; // ! Property 'id' does not exist on type 'Pick<User, "name">'
pickedUser.name = "Graham";









/**
 * * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

var userRecord: Record<string, User> = {
  "1": { id: 1, name: "Harry" },
  "7": { id: 7, name: "Anne" },
};








/**
 * * Exclude from T those types that are assignable to U
 */

type Exclude<T, U> = T extends U ? never : T;

let userKeysWithPostKeysExcluded: Exclude<keyof User, keyof Post>;

userKeysWithPostKeysExcluded = "name";
userKeysWithPostKeysExcluded = "id"; // ! Type '"id"' is not assignable to type '"name"'
userKeysWithPostKeysExcluded = "title"; // ! Type '"title"' is not assignable to type '"name"'

let postKeysWithUserKeysExcluded: Exclude<keyof Post, keyof User>;
postKeysWithUserKeysExcluded = "title";
postKeysWithUserKeysExcluded = "name"; // ! Type '"name"' is not assignable to type '"title"'
postKeysWithUserKeysExcluded = "id"; // ! Type '"id"' is not assignable to type '"name"'

var userWithExcludedPostProperties: Pick<
  User,
  typeof userKeysWithPostKeysExcluded
> = {
  id: 1, // ! Type '{ id: number; name: string; }' is not assignable to type 'Pick<User, "name">'.
  // ! Object literal may only specify known properties, and 'id' does not exist in type 'Pick<User, "name">'.
  name: "Mike",
};









/**
 * * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;

let userKeysFoundInPost: Extract<keyof User, keyof Post>;

userKeysFoundInPost = "id";
userKeysFoundInPost = "name"; // ! Type '"name"' is not assignable to type '"id"'.
userKeysFoundInPost = "title"; // ! Type '"title"' is not assignable to type '"id"'.

var userWithIncludedPostProperties: Pick<User, typeof userKeysFoundInPost> = {
  id: 1,
  title: "Mike",
  // ! Type '{ id: number; title: string; }' is not assignable to type 'Pick<User, "id">'.
  // ! Object literal may only specify known properties, and 'title' does not exist in type 'Pick<User, "id">'.
};








/**
 * * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

let userWithNameOmitted: Omit<User, "name">;

userWithNameOmitted.id = 1;
userWithNameOmitted.name = "Bill";






/**
 * * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;

let excludedNulls: NonNullable<string | number | undefined | null>;

// requires --strictNullChecks to be turned on
excludedNulls = null;      // ! Type 'null' is not assignable to type 'string | number'.
excludedNulls = undefined; // ! Type 'undefined' is not assignable to type 'string | number'.







/**
 * * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

function myFn(
  arg1: string,
  arg2: number,
  ...rest: Parameters<typeof updateUser>
): [string, number, User, Partial<User>] {
  return [arg1, arg2, rest[0], rest[1]];
}

myFn("apple", 2, user1, { id: 2 });






/**
 * * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<
  T extends new (...args: any) => any
> = T extends new (...args: infer P) => any ? P : never;

class Page {
  constructor(public currentUser: User) {
    this.currentUser = currentUser;
  }
}

type PageClass = typeof Page;

user1.id = 1;
user1.name = "Jim";
let constructorParams: ConstructorParameters<PageClass> = [user1];







/**
 * * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

type myFnReturnType = ReturnType<typeof myFn>;

function myNewFn(..._args: myFnReturnType): true {
  return true;
}

myNewFn("apple", 2, user1, { id: 2 });






/**
 * * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;

type PageInstance = InstanceType<typeof Page>;

var page: InstanceType<typeof Page> = new Page(user1);

// * ^ is the equivalent to:

var page: Page = new Page(user1);





/**
 * Custom utility types. BONUS!
 */


/**
 * * Make only the listed properties optional
 */
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

var user3: PartialBy<User, 'name'> = {
  id: 1,
}

/**
 * * Make only the listed properties required
 */
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

var user4: RequiredBy<Partial<User>, 'id'> = {
  id: 1,
}
