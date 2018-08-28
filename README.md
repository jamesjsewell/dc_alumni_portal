files that need to be created by you

these files should be placed in the root of the project
create a nav_links.js file and add the contents of nav_links.placeholder.js to it. Replace the values of the variables with the routes you would like the front-end to use. The routes should be prefixed with a / for example /grad-dashboard

create a .env file ( . infront of the file makes it hidden ), copy the contents of the existing .env.default to it

explanation of the variables in .env.default

SENDGRID_API_KEY="your sendgrid api key" get an api from https://sendgrid.com/"
DB_PASS="the password of your mongodb database"
CLIENT_URL="the url where your front end is hosted, for example: http://localhost:8080"
AUTH_SECRET="a random string you come up with"
API_PASS="another random string you come up with"
npm scripts

"start": "node ./api/server.js",
this is used in production by heroku to run the server
"dev": "run-p dev_api dev_webpack",
this starts the dev server
"dev_api": "NODE_ENV=development nodemon ./api/server.js",
this gets started by the above dev script
"dev_webpack": "webpack-dev-server --open --config webpack.dev.js -d",
this gets started with the dev_api script from dev
"prod_api": "NODE_ENV=production node ./api/server.js",
this starts the api with the server in production ( i haven't used this yet, forgot why i cereated it )
"prod_build": "webpack --config webpack.prod.js"
this populates the dist folder with the bundled production files