# RS Lang
Application for learning English language.

# [UI part of application](https://rslang-team15-natein.netlify.app)

Stack:
- react
- redux
- react-router

Styling:
- material-ui
- styled-components
- devexpress(for charts)

Testing libraries:
- Jest
- React testing library

Additional tools:
- eslint
- prettier

To start application you need to perform two steps:
1. `npm ci`
2. `npm run start`

Application will start at port 3000

To specify link to backend application you need to provide environment variable `REACT_APP_API` on start-up.
Alternatevly you can create `.env` file in the root folder of frontend application and specify single line:

```
REACT_APP_API=https://react-rslang-team15.herokuapp.com
```

value can be changed based on your backend application url. Note that for local deployment you need to use http instead of https

# [Backend part of application](https://github.com/kvalexandr/react-rslang-be)

Stack:
- Node.JS
- Express
- mongoose
- helmet

To start application locally you need perform such steps:
- `npm ci`
- `npm run start:dev`

Application will start at port 3001

Additionaly you need to create `.env` file in backend application root directory and specify such variables in it:

```
MONGO_CONNECTION_STRING=mongodb+srv://databaseUserName:password@cluster0.ucess.mongodb.net/learnwords
JWT_SECRET_KEY=jwtSecretKey
JWT_REFRESH_SECRET_KEY=refreshSecretKey
PORT=3001
AUTH_MODE=true
```
### NOTE that specified values is not real values and if you really want to start application locally please contact any team member

### Second NOTE: UI application points to backend application that is deployed on heroku. If you want to point it to your local build then you need to change value on `REACT_APP_API` in .env file stored in UI repository
