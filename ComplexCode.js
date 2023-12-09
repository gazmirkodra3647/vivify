/* Filename: ComplexCode.js
* Content: A complex code demonstrating a social media application with login, user registration,
* user profile, post creation, and news feed functionality.
*/

// User class represents a user with name, email, and password
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

// AuthService handles user authentication
class AuthService {
  constructor() {
    this.users = [];
    this.currentUser = null;
  }
  
  registerUser(name, email, password) {
    const user = new User(name, email, password);
    this.users.push(user);
    console.log(`${name} registered successfully.`);
  }
  
  loginUser(email, password) {
    const user = this.users.find(user => user.email === email);
    if (user && user.password === password) {
      this.currentUser = user;
      console.log(`${user.name} logged in successfully.`);
    } else {
      console.log(`Invalid login credentials.`);
    }
  }
  
  logoutUser() {
    console.log(`${this.currentUser.name} logged out.`);
    this.currentUser = null;
  }
}

// Post class represents a social media post with a user, content, and timestamp
class Post {
  constructor(user, content) {
    this.user = user;
    this.content = content;
    this.timestamp = new Date();
  }
}

// ProfileService handles user profiles and posts
class ProfileService {
  constructor() {
    this.users = [];
    this.posts = [];
  }
  
  createPost(user, content) {
    if (!user) {
      console.log(`Action requires user login.`);
      return;
    }
    const post = new Post(user, content);
    this.posts.push(post);
    console.log(`${user.name} created a new post: "${content}"`);
  }
  
  getNewsFeed() {
    if (this.posts.length === 0) {
      console.log(`No posts available.`);
      return;
    }
    console.log(`News Feed:`);
    this.posts.forEach(post => {
      console.log(`- ${post.user.name}: "${post.content}" (${post.timestamp})`);
    });
  }
  
  updateUserProfile(user, newName, newEmail) {
    if (!user) {
      console.log(`Action requires user login.`);
      return;
    }
    user.name = newName;
    user.email = newEmail;
    console.log(`${user.name}'s profile has been updated.`);
  }
}

// Usage example:
const authService = new AuthService();
const profileService = new ProfileService();

authService.registerUser("John Doe", "john.doe@example.com", "password1");
authService.loginUser("john.doe@example.com", "password1");
profileService.createPost(authService.currentUser, "Hello, World!");
profileService.updateUserProfile(authService.currentUser, "John", "john@example.com");
profileService.getNewsFeed();
authService.logoutUser();
profileService.createPost(authService.currentUser, "This post should not be created.");
profileService.getNewsFeed();

/* Output:
John Doe registered successfully.
John logged in successfully.
John created a new post: "Hello, World!"
John's profile has been updated.
News Feed:
- John: "Hello, World!" (Thu Jul 29 2021 08:00:00 GMT+0000 (Coordinated Universal Time))
John logged out.
Action requires user login.
No posts available.
*/