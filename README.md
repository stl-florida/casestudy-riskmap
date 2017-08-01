## Flux.land risk maps
This repository holds the code for STL florida case-study related pages
<br>
This platform is built using the Aurelia framework, which has a few prerequisites. To get started, follow the machine & application setup steps.
___
### Machine setup
* Install NodeJS >= 4.x
    * You can [download it here](https://nodejs.org/en/).
* Install NPM 3.x
    * Even though you may have the latest NodeJS, that doesn't mean you have the latest version of NPM. You can check your version with `npm -v`. If you need to update, run `npm install npm -g`.
* Install Aurelia CLI
    * `npm install aurelia-cli -g`

### Application setup
* Install the project dependencies
    * `npm install`
___
### Project structure
The project structure is as follows:
- **aurelia_project**: Aurelia generated folder containing config (Check Configuration section for more details) and framework specific libraries
- **scripts**: Generated scripts from the build process
- **src**: The main application code with the following files and subfolders
  * **routes**: Read more about how Aurelia Routing works [here](http://aurelia.io/hub.html#/doc/article/aurelia/router/latest/router-configuration/1).
  * Currently supported routes include:
    * **Special flood hazard zones**: http://flux.land?risk=flood
    * **Storm surge extents**: http://flux.land?risk=stormsurge
    * **Projected ground water table rise**: http://flux.land?risk=groundwater
___
### Contribution guidelines
- Issues are tracked on [github](https://github.com/stl-florida/casestudy-riskmap/issues).
