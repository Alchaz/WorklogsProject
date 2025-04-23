# Project Title and Description

Worklog-VUE 
This project is an exercise for demostrating skills in front end with Vue and backend with .net core.
This part of the project contains the software front end, it shows the login which has not password, with 
the users: user1, admin, user2. In the software you can add new tasks and hours, check your logs of tasks and hours 
in a report, check what tasks are undetime and overtime.


## Tech Stack
```
FrontEnd, this part of the software uses the next tech stack:
"axios": "^1.8.4",
"bootstrap": "^5.3.5",
"core-js": "^3.8.3",
"universal-cookie": "^8.0.1",
"vue": "^3.2.13",
"vue-router": "^4.5.0"
```

### How to Run Locally
```
In order for the project to run properly the backend software should be also started and configured.
-`git clone https://github.com/Alchaz/WorklogsProject`  
-set file or create .env with line: "VUE_APP_NODE_HOST=https://localhost:7155"
- `cd project-folder`  
- `npm install`  
- `npm run serve`


### Implemented Features
```
It shows the login which has not password, with 
the users: user1, admin, user2. In the software you can add new tasks and hours, check your logs of tasks and hours 
in a report, check what tasks are undetime and overtime.

```
### Project Structure
```

Root Level
-node_modules/: Contains all project dependencies.

-public/: Static assets publicly available; e.g., index.html.

-.env: Environment variables.

-.gitignore: Specifies files to be ignored by Git.

-README.md: Documentation for the project.

-babel.config.js / jsconfig.json / vue.config.js: Configuration files for Babel, JS project setup, and Vue CLI.

-package.json / package-lock.json: Project metadata and dependencies.

-src/ (Main Source Code Folder)
-api-helpers/

-AuthHelper.js: Contains functions or logic related to authentication API interactions.

-assets/

-logo.png: Image asset used in the project (typically a logo).

-components/

-CreateWorklogModal.vue, LoginPage.vue, WorklogList.vue: Reusable or modular Vue components.

-helpers/

-helpers.js: Utility functions or shared logic.

-router/

-index.js: Vue Router setup and route definitions.

-views/

-AboutPage.vue, HomePage.vue, WorklogsPage.vue, WorklogsReport.vue: Top-level pages for routing and layout purposes.

-App.vue: Root Vue component.

-main.js: Entry point of the Vue application; bootstraps the app.
```

### Known Limitations
-For the user1 and user2 the report will show only the limited data for each one.
-Help page is a demostrantion page (used lorem ipsum).
-For List users and edit users, with admin, have menu item there, but use an empty page with a description.






