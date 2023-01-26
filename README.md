GEOSOLAR
===================================================================
<b>Power generation</b> with the usage of <i>photovoltaic cells</i> has a quite unstable character and depends on many factors of the environment. 
One of them is a quantity of solar energy that falls on a plane of PV cell.
	The maximal <b>work efficiency</b> of the photovoltaic station is achieved when the inclination angle is calculated properly.
	This application consists an algorithm for definition of the <b>optimal angle of the PV cell</b>. It depends on a geolocation and work period of the solar station.
	
<b>GEOSOLAR</b> is a web app that calculates the most suitable angle of a solar panel for your geolocation.

Use node.js v 8.17

```
nvm install 8.17.0
nvm use 8.17.0 
```

### Start

To start the app open the terminal and clone the repo 

`git clone https://github.com/yaroslav0507/GeoSolar.git` 
	
enter the app directory `cd path/to/cloned/application` 
install node modules via <b>NPM</b>

`npm install`
  
run gulp task 

```
gulp watch
```

Serve statics 

```
cd public
npx serve
```
	
<img width="392" alt="image" src="https://user-images.githubusercontent.com/6556178/214955714-a7ded167-853a-4f07-a610-8ed3c5175b48.png">


### Interface

<img width="1776" alt="image" src="https://user-images.githubusercontent.com/6556178/214954687-12527823-f97f-4556-aaee-77b4a4ca265d.png">

<!-- ![Interface of the application](https://www.dropbox.com/s/eiw8d2s9f6x3fyd/solar.styleworks.com.ua.png?dl=1) -->





