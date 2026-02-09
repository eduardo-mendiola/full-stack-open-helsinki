## Link Render: https://full-stack-open-helsinki-1-9bgj.onrender.com/

# Exercises 3.1.-3.6.
## 3.1: Phonebook backend step 1
Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

Data:

[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

copy
Output in the browser after GET request:

JSON data of 4 people in browser from api/persons
Notice that the forward slash in the route api/persons is not a special character, and is just like any other character in the string.

The application must be started with the command npm start.

The application must also offer an npm run dev command that will run the application and restart the server whenever changes are made and saved to a file in the source code.

## 3.2: Phonebook backend step 2
Implement a page at the address http://localhost:3001/info that looks roughly like this:

Screenshot for 3.2
The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.

## 3.3: Phonebook backend step 3
Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.

## 3.4: Phonebook backend step 4
Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

Test that your functionality works with either Postman or the Visual Studio Code REST client.

## 3.5: Phonebook backend step 5
Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.

## 3.6: Phonebook backend step 6
Implement error handling for creating new entries. The request is not allowed to succeed, if:

The name or number is missing
The name already exists in the phonebook
Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.:

{ error: 'name must be unique' }

# Exercises 3.7.-3.8.
## 3.7: Phonebook backend step 7
Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.

The documentation for Morgan is not the best, and you may have to spend some time figuring out how to configure it correctly. However, most documentation in the world falls under the same category, so it's good to learn to decipher and interpret cryptic documentation in any case.

Morgan is installed just like all other libraries with the npm install command. Taking morgan into use happens the same way as configuring any other middleware by using the app.use command.

## 3.8*: Phonebook backend step 8
Configure morgan so that it also shows the data sent in HTTP POST requests:

terminal showing post data being sent
Note that logging data even in the console can be dangerous since it can contain sensitive data and may violate local privacy law (e.g. GDPR in EU) or business-standard. In this exercise, you don't have to worry about privacy issues, but in practice, try not to log any sensitive data.

This exercise can be quite challenging, even though the solution does not require a lot of code.

This exercise can be completed in a few different ways. One of the possible solutions utilizes these two techniques:

creating new tokens
JSON.stringify

## Exercises 3.9.-3.11
The following exercises don't require many lines of code. They can however be challenging, because you must understand exactly what is happening and where, and the configurations must be just right.

## 3.9 Phonebook backend step 9
Make the backend work with the phonebook frontend from the exercises of the previous part. Do not implement the functionality for making changes to the phone numbers yet, that will be implemented in exercise 3.17.

You will probably have to do some small changes to the frontend, at least to the URLs for the backend. Remember to keep the developer console open in your browser. If some HTTP requests fail, you should check from the Network-tab what is going on. Keep an eye on the backend's console as well. If you did not do the previous exercise, it is worth it to print the request data or request.body to the console in the event handler responsible for POST requests.

## 3.10 Phonebook backend step 10
Deploy the backend to the internet, for example to Fly.io or Render. If you are using Fly.io the commands should be run in the root directory of the backend (that is, in the same directory where the backend package.json is).

PRO TIP: When you deploy your application to Internet, it is worth it to at least in the beginning keep an eye on the logs of the application AT ALL TIMES.

Test the deployed backend with a browser and Postman or VS Code REST client to ensure it works.

Create a README.md at the root of your repository, and add a link to your online application to it.

## 3.11 Full Stack Phonebook
Generate a production build of your frontend, and add it to the Internet application using the method introduced in this part.

Also, make sure that the frontend still works locally (in development mode when started with command npm run dev).

If you use Render, make sure the directory dist is not ignored by git on the backend.

NOTE: You shall NOT be deploying the frontend directly at any stage of this part. Only the backend repository is deployed throughout the whole part. The frontend production build is added to the backend repository, and the backend serves it as described in the section Serving static files from the backend.

## Exercise 3.12.
3.12: Command-line database
Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.

Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

NB: Do not include the password in the file that you commit and push to GitHub!

The application should work as follows. You use the program by passing three command-line arguments (the first is the password), e.g.:

node mongo.js yourpassword Anna 040-1234556copy
As a result, the application will print:

added Anna number 040-1234556 to phonebookcopy
The new entry to the phonebook will be saved to the database. Notice that if the name contains whitespace characters, it must be enclosed in quotes:

node mongo.js yourpassword "Arto Vihavainen" 045-1232456copy
If the password is the only parameter given to the program, meaning that it is invoked like this:

node mongo.js yourpasswordcopy
Then the program should display all of the entries in the phonebook:

phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236copy
You can get the command-line parameters from the process.argv variable.

NB: do not close the connection in the wrong place. E.g. the following code will not work:

Person
  .find({})
  .then(persons=> {
    // ...
  })

mongoose.connection.close()copy
In the code above the mongoose.connection.close() command will get executed immediately after the Person.find operation is started. This means that the database connection will be closed immediately, and the execution will never get to the point where Person.find operation finishes and the callback function gets called.

The correct place for closing the database connection is at the end of the callback function:

Person
  .find({})
  .then(persons=> {
    // ...
    mongoose.connection.close()
  })copy
NB: If you define a model with the name Person, mongoose will automatically name the associated collection as people.

