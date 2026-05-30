# GitHub Profile Analyzer

## Objective

Analyze GitHub user profiles using GitHub Public API and store useful insights in MySQL.

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub Public API

## Features

- Analyze GitHub profile by username
- Store profile insights in MySQL
- Get all analyzed profiles
- Get single analyzed profile

## Setup Instructions

### Install Dependencies

```bash
npm install
```

### Create Database

```sql
CREATE DATABASE github_analyzer;
```

### Run Project

```bash
node server.js
```

Server runs on:

```text
http://localhost:5000
```

## API Endpoints

### Analyze Profile

GET

```text
/api/github/analyze/:username
```

Example:

```text
/api/github/analyze/octocat
```

### Get All Profiles

GET

```text
/api/github/profiles
```

### Get Single Profile

GET

```text
/api/github/profiles/:username
```

## Database

Database Name:

```text
github_analyzer
```

Table:

```text
github_profiles
```
