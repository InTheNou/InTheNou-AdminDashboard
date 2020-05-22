---
title: General information
lang: en-US
---
# Project Setup
The IntheNou Dashboard project code resides in the following [Github repository](https://github.com/InTheNou/InTheNou-AdminDashboard). for running the project you need to install Vue CLI 3 and for the IDE is recommended to use [visual studio code](https://code.visualstudio.com/).  
## Depencencies
The project uses the following plugins.
-[Vue](https://vuejs.org/v2/guide/installation.html)

-[vue-google-login-npm](https://www.npmjs.com/package/vue-google-login)

-[Vuex](https://vuex.vuejs.org/installation.html)

-[eslint](https://www.npmjs.com/package/eslint)

The dependencies al already installed in the project repository, so there is no need to re install them.
## running project
#### Project setup
:::
npm install
:::
#### Compiles and hot-reloads for development
:::
npm run serve
:::
#### Compiles and minifies for production
:::
npm run build
:::
#### Run your unit tests
:::
npm run test:unit
:::
#### Lints and fixes files
:::
npm run lint
:::
#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/)
## Folder Structure
![Login component view](/FolderStructure.PNG)

In the figure above, we can see the directory structure of the project.

Directories:

-dist: contains the project distribution code. auto-generated once the build command line is executed.

-node_module: directory containing all project dependencies.

-src: directory containing all main source code of the project.

-assets: here is where statics assets such as pictures are.

-components: contains the project components which consist of the authentication module, events management module, information base module, information base management module, privilege management module, and utils module.

-plugins: the directory contains any plugin dependency installed.

-router: contains the file with the project routes to the different component modules.  using for routing in the views directory through the Vue instance. 

-store: contains the file for the centralized state management store where global variables reside.

-view: is used for the different component views of the project.

-App.vue: the root of the application-defined in Vue.

-main.js: javascript file that will initialize this root component into an element on a page.

-test/unit: folder for the Jest unit test.

-.env: holds the environmental variables.



