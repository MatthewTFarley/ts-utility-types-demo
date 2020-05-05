var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var user1 = {
    id: 1,
    name: 'Jane'
};
var partialUser = {
    name: 'John'
};
function overlyStrict(user, updates) {
    return __assign(__assign({}, updates), user);
}
function updateUser(user, updates) {
    return __assign(__assign({}, updates), user);
}
overlyStrict(user1, { name: 'Jim' }); // * Argument of type '{ name: string; }' is not assignable to parameter of type 'User'.
// * Property 'id' is missing in type '{ name: string; }' but required in type 'User'
// partial User allows y to be left out
updateUser(user1, { name: 'Jane' });
var user1 = {
    id: 1
};
var user2 = {
    id: 2,
    name: 'John'
};
var readOnlyUser = {
    id: 1,
    name: 'Jane'
};
readOnlyUser.name = 'Jen'; // * Cannot assign to 'name' because it is a read-only property.
var badPickedUser = {
    age: 1
};
var pickedUser = {
    name: 'Sam'
};
pickedUser.id = 1; // * Property 'id' does not exist on type 'Pick<User, "name">'
pickedUser.name = 'Graham';
var userRecord = {
    '1': { id: 1, name: 'Harry' },
    '7': { id: 7, name: 'Anne' }
};
var userKeysWithPostKeysExcluded;
userKeysWithPostKeysExcluded = 'name';
userKeysWithPostKeysExcluded = 'id'; // * Type '"id"' is not assignable to type '"name"'
userKeysWithPostKeysExcluded = 'title'; // * Type '"title"' is not assignable to type '"name"'
var postKeysWithUserKeysExcluded;
postKeysWithUserKeysExcluded = 'title';
postKeysWithUserKeysExcluded = 'name'; // * Type '"name"' is not assignable to type '"title"'
postKeysWithUserKeysExcluded = 'id'; // * Type '"id"' is not assignable to type '"name"'
var userKeysFoundInPost;
userKeysFoundInPost = 'id';
userKeysFoundInPost = 'name'; // * Type '"name"' is not assignable to type '"id"'.
userKeysFoundInPost = 'title'; // * Type '"title"' is not assignable to type '"id"'.
var userWithNameOmitted;
userWithNameOmitted.id = 1;
userWithNameOmitted.name = 'Bill';
var excludedNulls;
excludedNulls = undefined; // * ???
excludedNulls = null; // * ???
function myFn(arg1, arg2) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return [arg1, arg2, rest[0], rest[1]];
}
myFn('apple', 2, user, { id: 2 });
var Page = /** @class */ (function () {
    function Page(currentUser) {
        this.currentUser = currentUser;
        this.currentUser = currentUser;
    }
    return Page;
}());
var pageClassConstructorParams;
var user = pageClassConstructorParams[0];
user.id = 1;
user.name = 'Jim';
function myNewFn() {
    var _args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _args[_i] = arguments[_i];
    }
    return true;
}
myNewFn('apple', 2, user, { id: 2 });
var page = new Page(user);
// * this is the same as
var page = new Page(user);
