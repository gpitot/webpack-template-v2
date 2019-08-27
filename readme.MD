## INSTALLATION
* nvm use
* npm i



## RUNNING 
* npm start



## DEPLOYMENT
* push to master



## GOING LIVE
#### GETTING STUDIO PROJECTS
* clone this directory - https://stash.9msn.net/projects/CS/repos/studios-deployment/browse (not into your project!)
* edit deploy-config folder
* find the latest site that has gone live
* copy folder and rename to the name of your new project (this will match PROJECT_NAME in CI parameters)
* git add / commit / push


#### create CI pipeline
* go to latest project we have made
* edit project settings
* actions - copy
* change name to Studios - "name"
* save

#### edit CI pipeline
* go to parameters on left
* change appropriate
* go to build home
* click preprod (DONT RUN YET!)
* go to parameters
* change deploy_strat to 'deploy:bluegreen' (no quotes)
* run build
* run staging and preprod
* once successfully complete rename preprod deploy_strat to deploy:newUniqueEnvironment
* promote prod
* delete old prod (optional)
* get preview link from beanstalk page 
* contact dev ops about setting up DNS