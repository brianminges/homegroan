
![Homepage](https://github.com/brianminges/homegroan/blob/main/public/images/homepage.jpg?raw=true)

# Home Groan - for the unhappy homeowner
An app to keep track of household invoices and service providers.

## General information
This is my second attempt at a working app, but first using React, after studing front-end coding at Nashville Software School. It incorporates many of the areas of study, including fetch API, JSON, array methods, forms and state. The sign-in code was provided by instructors at NSS. Authentication is not an objective of the class, and this is meant only to allow for multiple users. It is not secure, and is not meant to be. 

## Technologies
- React v.17
- ES6
- HTML5
- CSS3
- Miro

## Features  
- Service providers can be created under various industries that are fully customizable by user.  
- 'Add Service Provider' page keeps track of past five most recent additions, listed in reverse chronological order.
- 'Edit Service Provider' page keeps track of past five most recent edits, listed in reverse chonological order.
- Calculator on 'Create an Invoice' page automatically totals each input field.
- A running total of expenses spent at each provider is displayed on that provider's page.
- Service providers can be favorited.

## Selected pages and features
<img src="https://user-images.githubusercontent.com/91277363/182011178-13afa8f9-84c0-44b9-8633-d9b9fc7d028a.png?raw=true" height="400" >
<img src="https://user-images.githubusercontent.com/91277363/182010562-acc7d339-3d1f-4c1a-84ec-0e1f21495eff.png?raw=true" height="400" >
<img src="https://user-images.githubusercontent.com/91277363/182010753-83455392-77d6-458e-8d2b-5b371d8ae342.png?raw=true" height="400" >
<img src="https://user-images.githubusercontent.com/91277363/182010833-00f3074f-0e49-4933-9038-4014af3e4f4d.gif?raw=true" height="200" >
<img src="https://user-images.githubusercontent.com/91277363/182010798-42714d62-ddec-4bc6-ba59-a5b6f06e12d5.gif?raw=true" height="300" >

## Setup
To run this project, clone from this repository to your local machine. In terminal, run `npm install` from the root directory. Make a copy of database.json.example in the API directory and name it database.json. Run `json-server database.json -p 8088 -w` from the API directory. Run `npm start` from the root directory. 

## Project status
Complete. 

## Acknowledgements
Main image courtesy [OpenClipart-Vectors](https://pixabay.com/users/openclipart-vectors-30363/), and images of workers courtesy [Peggy_Marco](https://pixabay.com/users/peggy_marco-1553824/), both via [Pixabay.com](https://pixabay.com/). 
