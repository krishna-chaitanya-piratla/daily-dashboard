# Daily Dashboard

This is a dashboard I've built for my personal use using TypeScript, React.js and Node.js. Feel free to modify to suit your own needs 

![enter image description here](https://i.postimg.cc/c1PcY5Rw/image.png)

Currently, this dashboard supports the following features: 

 - Todo Lists
 - Background Customization
 - Current Location and Weather Display
 - Joke Widget

## Todo Lists
### Adding Todo Lists
 - You can add multiple todo lists in the Todos widget you can see at the bottom right of the screen.
 - You can switch between the lists seamlessly
 - You can minimize the widget to hide the contents

![Creating and Working with Todo Lists](https://i.postimg.cc/nr9y1FHq/05-Create-Todo-Lists.gif)

- ![Minimize Todo List widget](https://i.postimg.cc/dVF0DXB5/image.png) Minimizes the Todo List Widget
- ![Open Todo List widget](https://i.postimg.cc/2jPyN3BR/image.png) Opens the Todo List Widget
- ![Open Dropdown Menu](https://i.postimg.cc/6phpZ0bt/image.png) Opens the dropdown menu to switch between lists or to create a new list
- ![Edit the name of Todo List](https://i.postimg.cc/7LYYn2j7/image.png) Edit the name of the list
- ![Clear the contents of Todo List](https://i.postimg.cc/yNQ6QNzG/image.png) Clears the items in the list (*retains the list to add new items to it*)
- ![Delete the Todo List](https://i.postimg.cc/HxrYfCYk/image.png) Deletes the list completely 


### Adding, Completing, and Deleting Todo Items
The Todo items can be added, edited, marked as complete, and deleted from the list - one at a time or all in one-go.
![Adding, Completing, and Deleting Todo Items](https://i.postimg.cc/25hRv8Sv/06-Working-With-Todos.gif)

## Customizing Background
You can choose between a solid background or a beautiful photo fetched from [Unsplash](https://unsplash.com/) (requires getting a developer API from Unsplash for your personal use)

### Solid Background
You can choose from existing presets or choose a custom color of your liking. You can also add it to the custom color palette for future use.
![enter image description here](https://i.postimg.cc/MGkgW2mG/02-Change-Solid-Background.gif)

### Custom Background
**NOTE**: *You'll need to setup your Unsplash API in the .env file in the frontend folder. (See the setup instructions below)*
You can pass a search query to fetch a random photo from Unsplash and set it as the background.
You can fetch another random photo using the same search query by clicking on the refresh icon.

![enter image description here](https://i.postimg.cc/hG96vy21/03-Set-Unsplash-Background.gif)

**Caution**: Unsplash sets a rate-limit on the number of times their API can be called. Currently, this limit is set at 50 calls/hour for the free-tier. If you refresh the background too many time, you will have to wait for the limit to reset until you can fetch another photo.


## Other Widgets
### Location and Weather
This widget displays your current location by making an API call to [ipapi](https://ipapi.com/). The ipapi response  is saved to your file system (You'll need to setup the path to your data directory for the app while setting it up - see Setup Instructions below). This helps to make an API call only when your ip address changes, avoiding unnecessary API calls.

The widget displays weather information by making an API call to [Tomorrow.io](https://www.tomorrow.io/). 
To prevent unnecessarily frequent API calls, the widget refreshes the weather data only once every hour (unless the user forces an updated request). So, the weather information might not provide real-time weather.  

Currently, switching between Celsius and Fahrenheit makes a fresh API call. Please keep in mind that tomorrow.io has a limit on the number of free API calls (20 per hour, currently). So, make sure to not switch the temperature units too frequently. 

### Joke Widget 
This widget displays a random dad joke - which can be manually refreshed too - by making an API call to [icanhazdadjoke](https://icanhazdadjoke.com/). 

----
Both these widgets can be shown or hidden using the toggles in the sidebar.
![Hide and Unhide Widgets](https://i.postimg.cc/C1JFBLc7/04-Hideand-Unhide-Widgets.gif)


### Display Name
Customize your display name either through the sidebar or on the homepage itself. 
![Customize display name](https://i.postimg.cc/T11XWJwh/01-Change-User-Name.gif)

## Setup Instructions
### Prerequisites
- Node
- Unsplash API key (to fetch and set random background photos)
- Tomorrow.io API key (to get the weather data for your location)

### Steps
- [Install node](https://nodejs.org/en/download/package-manager) on your computer if you do not have it already.
- Clone the repo into your local
- The repo will be in the folder `daily-dashboard`
- While within the `daily-dashboard` folder, run 
```
npm install
```
This installs the dependencies required for both frontend and backend
- Inside the `daily-dashboard` folder, you'll find two folders: `frontend` and `backend`
- Navigate to the backend folder. In the backend folder, create a file with the name `.env` and set it up as follows:
```
NODE_ENV='local'

  

# LOCAL ENV

CLIENT_URL_LOCAL =http://localhost

CLIENT_PORT_LOCAL=9999

SERVER_URL_LOCAL =http://localhost

SERVER_PORT_LOCAL=9988

DATA_LOCATION_LOCAL=/path/to/your/data/folder

REACT_APP_TOMORROW_API_KEY=abcdxyz

REACT_APP_TOMORROW_API_URL=https://api.tomorrow.io/v4/weather/forecast
```

`DATA_LOCATION_LOCAL` - This is the path to the folder where you want the app to store all your data: your todos, your location, weather, your customization settings. If this path is not set properly, the app will not save your changes and you'll not be able to see your changes upon reloading the page.
 `REACT_APP_TOMORROW_API_KEY` - This is where you need to update your personal Tomorrow.io API key in order to get the weather information for your location.

- Now navigate to the `frontend` folder and create a `.env` file with the following contents:
```
PORT=9999

REACT_APP_UNSPLASH_ACCESS_KEY=enter_your_unsplash_api_access_key_here

REACT_APP_BACKEND_URL=http://localhost:9988
```
`REACT_APP_UNSPLASH_ACCESS_KEY` - This is where you need to update your personal Unsplash API key in order to be able to fetch beautiful photos from Unsplash. 

- Navigate back to the `daily-dashboard` folder and run 
```
npm start
```

This will start both the frontend and backend servers. You can access the app by opening `localhost:9999` in your browser.

