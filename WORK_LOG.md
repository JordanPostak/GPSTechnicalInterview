# GPS Technical Interview — Work Log

## Candidate: Jordan Postak
## Position: Junior Web Developer Technical Interview
## Repository: GPSTechnicalInterview

---

# Day 1 — Project Setup

## Objective

Set up the technical interview project locally and review initial structure.

## Actions Taken

- Forked the GPSTechnicalInterview repository to my personal GitHub account.
- Cloned the forked repository to my local machine using VS Code.
- Opened the project in VS Code and reviewed the folder structure.
- Identified the Angular frontend project (GPS.TechnicalInterview.Web).
- Reviewed the provided design document and Figma prototype.
- Created a WORK_LOG.md file to document progress and decisions.
- Attempted to run the backend using dotnet run and encountered build errors due to missing model classes (LoanTerms and PersonalInformation).
- Created LoanTerms.cs and PersonalInformation.cs models to match the structure referenced by LoanApplication.
- Discovered the controller expected PersonalInformation.Name.First and Name.Last rather than separate FirstName/LastName fields.
- Created a Name model and updated PersonalInformation to match the expected API contract.
- Attempted to run the application again and encountered a .NET version mismatch (project targets .NET 6).
- Installed the .NET 6 SDK to match the project’s target framework (net6.0).
- Verified installation with dotnet --list-sdks (confirmed 6.0.428).

## Milestone: Application Running Successfully

After resolving model structure issues and installing the required .NET 6 SDK, I was able to successfully launch the application locally.

The Angular frontend loads correctly at https://localhost:5001/applications and renders the Application Manager dashboard layout.

# GPS Technical Interview — Work Log

## Candidate: Jordan Postak
## Position: Junior Web Developer Technical Interview
## Repository: GPSTechnicalInterview

---

# Day 1 — Project Setup

## Objective

Set up the technical interview project locally and review initial structure.

## Actions Taken

- Forked the GPSTechnicalInterview repository to my personal GitHub account.
- Cloned the forked repository to my local machine using VS Code.
- Opened the project in VS Code and reviewed the folder structure.
- Identified the Angular frontend project (GPS.TechnicalInterview.Web).
- Reviewed the provided design document and Figma prototype.
- Created a WORK_LOG.md file to document progress and decisions.
- Attempted to run the backend using dotnet run and encountered build errors due to missing model classes (LoanTerms and PersonalInformation).
- Created LoanTerms.cs and PersonalInformation.cs models to match the structure referenced by LoanApplication.
- Discovered the controller expected PersonalInformation.Name.First and Name.Last rather than separate FirstName/LastName fields.
- Created a Name model and updated PersonalInformation to match the expected API contract.
- Attempted to run the application again and encountered a .NET version mismatch (project targets .NET 6).
- Installed the .NET 6 SDK to match the project’s target framework (net6.0).
- Verified installation with dotnet --list-sdks (confirmed 6.0.428).

## Milestone: Application Running Successfully

After resolving model structure issues and installing the required .NET 6 SDK, I was able to successfully launch the application locally.

The Angular frontend loads correctly at https://localhost:5001/applications and renders the Application Manager dashboard layout.

This confirmed that both the backend and frontend are correctly configured and communicating.

## Observations

The project includes an Angular frontend and appears to be designed to connect to a .NET backend. The exercise involves implementing dashboard functionality based on the provided Figma prototype.

## What I Learned

Learned how the project is structured and how the interview exercise is organized, including the relationship between the design prototype and the frontend codebase.

## Observations

The project includes an Angular frontend and appears to be designed to connect to a .NET backend. The exercise involves implementing dashboard functionality based on the provided Figma prototype.

## What I Learned

Learned how the project is structured and how the interview exercise is organized, including the relationship between the design prototype and the frontend codebase.