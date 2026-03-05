# CRM API Test Automation Framework

## Overview

This project is an **API Automation Testing Framework** built using **Playwright with JavaScript**.
It is designed to automate testing for CRM APIs and is integrated with a **Jenkins CI/CD pipeline** to enable continuous automated test execution.

The project demonstrates how to build a **maintainable API testing structure**, separate API logic using service classes, and execute tests automatically through CI/CD.

---

# Tech Stack

* JavaScript (Node.js)
* Playwright
* REST API Testing
* Jenkins CI/CD
* Git & GitHub
* dotenv (Environment configuration)

---

# Project Structure

```
CRM_Project
│
├── tests/                # Test cases
│
├── services/             # API request handling (Service layer)
│   └── auth.service.js
│   └── user.service.js
├── utils/                # Utility functions
│
├── .env                  # Environment configuration
│
├── playwright.config.js  # Playwright configuration
│
├── Jenkinsfile           # Jenkins CI/CD pipeline
│
├── package.json          # Project dependencies
│
└── README.md
```

---

# Features

* Automated **API testing using Playwright**
* **Reusable service classes** for API request handling
* **Bearer Token authentication**
* Environment variable management using `.env`
* Automated test execution through **Jenkins CI/CD**
* Test report generation with **Playwright HTML Report**
* Version control using **GitHub**

---

# Installation

Clone the repository:

```
git clone https://github.com/Long075/CRM_Project.git
```

Move into the project folder:

```
cd CRM_Project
```

Install dependencies:

```
npm install
```

---

# Environment Configuration

Create a `.env` file in the project root:

```
BASE_URL=your_api_url
API_USERNAME=your_username
API_PASSWORD=your_password
```

This allows the framework to run tests against different environments.

---

# Running Tests

Run all tests:

```
npx playwright test
```

Run tests with report:

```
npx playwright test --reporter=html
```

Open the test report:

```
npx playwright show-report
```

---

# Jenkins CI/CD Integration

This project is integrated with **Jenkins Pipeline**.

The pipeline performs the following steps:

1. Checkout source code from GitHub
2. Install Node.js dependencies
3. Execute Playwright tests
4. Generate Playwright test report

Example Jenkins pipeline flow:

```
Checkout Code
     ↓
Install Dependencies
     ↓
Run Playwright Tests
     ↓
Generate Test Report
```

---

# Example API Service

Example reusable API request service:

```javascript
async createUser(dataUser, token) {
    return await this.request.post('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
        data: dataUser
    });
}
```

This structure helps separate **test logic** from **API request handling**, making the framework easier to maintain.

---

# Test Report

After test execution, Playwright generates an HTML report showing:

* Test results
* Execution time
* Passed / Failed tests
* Error logs

---

# Author

Long Hoang

GitHub:
https://github.com/Long075

---

# Purpose of This Project

This project was built to practice and demonstrate:

* API automation testing
* Playwright automation framework design
* CI/CD pipeline integration with Jenkins
* GitHub project management

It can be used as a **sample automation framework for QA Automation Engineers**.