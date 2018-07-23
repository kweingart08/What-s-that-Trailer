# What-s-that-Trailer
  I'm not sure about the rest of you, but how many times have you seen: a movie trailer, a poster or even a Facebook ad for an upcoming movie that looked really good... but then you completely forgot about it. Here's an app that let's you add a list of those movies to create a digital movie bucket list.


## Getting Started
  The information below will present any installations needed, and tell you what technologies were used to create the application.

### Installation Instructions
  To Use the Site:

    Google Chrome - [https://www.google.com/chrome/?brand=CHBD&gclid=CjwKCAjwma3ZBRBwEiwA-CsblPyvpR22B4RBmScNdFsqzR9hq_NR4nT8yE9sKUWpPhPRTU6JPPvV-RoCpfMQAvD_BwE&gclsrc=aw.ds&dclid=CNiA3IWs5dsCFQ4EaQodm50Pyw]

### Technologies Used
  Technologies Used While Building the App:


    Atom:
      - Express
      - Mongoose
      - Angular
      - Node.js
      - CSS
      - HTML

    Heroku:
      - Heroku was used to deploy the app online.


### Details on the App:
  This App was created with a group of three developers collaborating and using git and github for version control.
  The App consists of an MVC framework:
    - Models:
      - Movies - There is a movie model schema to create a Movie.
      - Users - There is a user model schema used to create the different users for the database.
    - Views:
      - Angular was used for this so a views sections was not used, but partials and html files were used to show the different views for the app. There were multiple public files created:
      - There were multiple public files created:
        - index.html - index that allows for different partials to be viewed depending on what is clicked.
        - about.html - about the app
        - edit.html - edit movie page
        - footer.html - footer partial
        - home.html - main page
        - login.html - login page
        - nav.html - navigation bar
        - new_movie.html - new movie page
        - register.html - register page
        - user.html - user page
      - Controllers:
        - Movies - this controller includes the get, post, put, and delete routes for movies.
        - Users - this controller allows the app to create a User and go to the sessions controller.
        - Sessions - this controller allows users to sign in and start their session online.

      This app also includes full CRUD and authorization (sign up / log in) functionality with encrypted passwords & an authorization flow.

      This app pulls from a third party API (OMDb API) which is a RESTful web service to obtain movie information.

## Development
  These development notes will describe the approach taken when building the application as well as some of the unsolved problems and additions for the future.

### Approach Taken
  The initial approach was to determine and settle on an idea, once this had taken shape it was a matter of making a chart of what needed to be done. After that we divided up the work based on preferences, skills and importance.

### Unsolved Problems / Additional Items Not Added
  Some unsolved problem:
  - TBD

  Additional Items to add to app later:
  - TBD

## Link to Live Site
  Here is the link to the live site so you can use the app!
  [https://whats-that-trailer.herokuapp.com/]
