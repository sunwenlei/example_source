# Test001
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

1. Open VS Code, in console type ng new test001 to create a new angular project
   And type the answer when the question below be shown
   # ? Would you like to add Angular routing? Yes
   # ? Which stylesheet format would you like to use? SCSS

2. Open terminal window, type cd test001, ng add @angular/material
   this command will install @angular/material package and save depencies settings
   and choose [indigo-pink] style
   # ? Set up HammerJS for gesture recognition? (Y/n) = Y
   # ? Set up browser animations for Angular Material? (Y/n) = Y

3. In app folder, create a materail modele file. examle material-module.ts

4. Open app.module.ts, import material-module

5. Create 2 components named [persons] and [persondetail] and add them to app-routing module

6. In persons component add a get api to getting person data from a webapi service.
   The webapi service we add in [https://github.com/sunwenlei/golang/tree/master/go_webapi]

7. In persondetail component we do create/update/refer/delete to person data, and pushing data to webapi service

8. And create download/update a csv file.
   So we use file-saver package, use the both command below
   npm install @types/file-saver --save
   npm install file-saver --save

9. Done