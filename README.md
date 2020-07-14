# backstage
[![Build Status](https://travis-ci.com/dojot/backstage.svg?branch=master)](https://travis-ci.com/dojot/backstage) [![DeepScan grade](https://deepscan.io/api/teams/2714/projects/3991/branches/33559/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2714&pid=3991&bid=33559) [![CodeFactor](https://www.codefactor.io/repository/github/dojot/backstage/badge)](https://www.codefactor.io/repository/github/dojot/backstage)

This repository is to get together all services can help GUI

Documentation for development: https://dojot.github.io/backstage/development/

## **Environment Variables**
Key                        | Purpose                                                  | Default Value      | Valid Values |
-------------------------- | -------------------------------------------------------- | ---------------    | -----------  |
PORT                                 | Port in which this application will be accessible         | 3005               | Integer      |
DEVICE_MANAGER_POSTGRES_USER         | User to login into postgres database which has template data                     | postgres           | String       |
DEVICE_MANAGER_POSTGRES_PASSWORD     | Password to login into postgres template database                 | postgres           | String       |
DEVICE_MANAGER_POSTGRES_DATABASE     | The name of the database with template information to be used            | dojot_devm         | String       |
DEVICE_MANAGER_POSTGRES_HOST         | Postgre's instance host address                          | postgres           | String       |
DEVICE_MANAGER_POSTGRES_PORT         | Port number used to access the Postgre instance                    | 5432               | Integer      |
BACKSTAGE_DASHBOARD_DB_NAME          | The name of the database that stores users' dashboard configuration| dojot_dash_users           | String       |
BACKSTAGE_DASHBOARD_DB_USER          | User to login into users' dashboard configuration database| postgres           | String       |
BACKSTAGE_DASHBOARD_DB_PASSWORD      | Password to login into users' dashboard configuration database                     | postgres           | String       |
BACKSTAGE_DASHBOARD_DB_HOST          | Postgre's instance host address                    | postgres           | String       |
BACKSTAGE_DASHBOARD_DB_PORT          | Port number used to access the Postgre instance that has the users' dashboard configuration database | 5432           | Integer       |
