# Next.js Assignment

## Introduction

This repository serves as a starting point for you to clone. We have prepared two endpoints in [src/pages/api](src/pages/api) and a sample vehicle dataset in [src/vehicles.json](src/vehicles.json) which should be used to populate the vehicle input.

## Assignment

Fixico's customers need a way to submit their damages. You are going to create the first version of a Damage Report submission app.

In this app, you should be able to do a couple of things; 

1. Submit a Damage Report
2. View the status of a single previously created Damage Report
3. View an overview of all previously created Damage Reports in a list.

## Functional requirements

### 1. Submit Damage Report

Our customers would like to submit their Damage Report using our app. They'd like to enter their vehicle details, and upload photo's of the damage, add a description and enter their contact details. 

To avoid showing a very long single page, the input must be split up in the following steps: 

1. Vehicle information
2. Photo upload + description
3. Customer details

To ensure the customers have entered the correct information, they'd like to see a confirmation step before actually submitting their Damage Report. When there is a mistake, they'd like to be able to go back and adjust their error.

### 2. View status

Once a customer has submitted their Damage Report, it will be processed by Fixico. While the customers wait, they'd like to have another look at their Damage Report on a separate page.

The customers would like to see all the details they've previously entered.

### 3. View overview

Our partners often upload more than 1 Damage Report. To provide them with an overview, we'll show them a list of all previously created Damage Reports.

## Technical requirements

- Next.js
- Tailwind or Material UI
- Either unit or feature (or both) tests.

You are free to decide on which additional libraries you'd like to use. Please provide a short explanation on why you decided to use certain library.

## API

### `POST /api/upload`

Use this endpoint to upload a photo.

Returns: UUID of the photo.

### `POST /api/submit`

Use this endpoint to store the Damage Report.

Note: You can post whatever you want. It'll save everything as you'd like.

## Progress and sharing results

Create a new branch and give it a sensible name.

Once you are done, please make a pull request and send us an email that you've done so.

Don't worry about having many commits — we'd like to see your progress.