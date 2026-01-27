// user data

const userData = [
  {
    id: 1,
    name: "john doe",
    email: "john@example.com",
    age: 22,
    roles: ["user"],
    isActive: true,
  },
  {
    id: 2,
    name: "jane smith",
    email: "jane@company.com",
    age: 17,
    roles: ["admin"],
    isActive: true,
  },
  {
    id: 3,
    name: "mark lee",
    email: "mark@oldmail",
    age: 30,
    roles: ["user"],
    isActive: false,
  },

  {
    id: 4,
    name: "john lee",
    email: "john@oldmail",
    age: 32,
    roles: ["user"],
    isActive: true,
  },
];
// QUESTIONS
// 1. Filter the data
//     a. Work only with users who are active.
//     b. Ensure the original data remains unchanged.
// 2. Normalize user information
//     a. Format user names consistently.
//     b. Add a derived property indicating whether the user is an adult.
// 3. Validate conditions
//     a. Check whether at least one user has an admin role.
//     b. Check whether all active users have valid email addresses.
// 4. Generate insights
//     a. Calculate the average age of active users.
// 5. Organize logic using objects
//     a. Use object methods to generate summaries.
//     b. Access all data using the this keyword.
// */

//Approach 1 : Using Pure functions
// => this approach of using standlone function is good but limited when it comes to working with larger data sets
// and extendin operation that is interconnected . They will only work on the data passed to them as arguments not on the object itself
// => this can lead to code duplication and make it harder to maintain the codebase as the application grows

// Approach 2 : Using Object with methods
// this approach is good as it encapsulates the data and related operation withi a sinle object .
// This makes it easier to manage and extend the functionality as needed .
// using this keyword helps in accessing data directly within menthods to pass as arguments
// but this approac is useful if only forking in single instace ->if another userData2 is there , we have to either mutate the exixting one or
// creae another object with same methofs -> repeating
//

// Approach 3 : Using Class
// this approach is more flexible and scalable as it allows creating multiple instances of the data handler with different datasets
// This is particularly useful in scenarios where you need to manage multiple sets of user data independently .
// with very new data , we can create new instance of the class without affecting existing ones

class UserDataHandler {
  constructor(data) {
    this.data = data;
  }

  // question 1 : Filter active users
  getActiveUsers() {
    return this.data.filter((user) => user.isActive); // creates separate array , original data remains unchanged
  }

  // question 2 : Normalize user information( formatting first letter  and adding isAdult property)
  getNormalizedUsers() {
    return this.getActiveUsers().map((user) => ({
      ...user,
      name: user.name
        .split(" ")
        .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
        .join(" "),
      isAdult: user.age >= 18,
    }));
  }

  // question 3a : Check if at least one user has admin role
  hasAdminUser() {
    return this.data.some((user) => user.roles.includes("admin")); // return true/false
  }

  // question 3b : Check if all active users have valid email addresses
  hasValidEmails() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return this.getActiveUsers().every((user) => emailRegex.test(user.email)); // return true/false
  }

  // question 4 : a. Calculate the average age of active users.
  averageAge() {
    const active = this.getActiveUsers();
    if (!active.length) return 0;
    return active.reduce((sum, u) => sum + u.age, 0) / active.length;
  }

  generatedSummaries() {
    const normalized = this.getNormalizedUsers();
    return {
      activeUsers: normalized,
      averageAge: this.averageAge(),
      hadAdmin: this.hasAdminUser(),
      ValidEmails: this.hasValidEmails(),
    };
  }
}

const userData1Output = new UserDataHandler(userData);
console.log(userData1Output.generatedSummaries());
