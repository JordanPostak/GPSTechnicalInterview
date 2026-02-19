# GPS Technical Interview — Work Log

## Candidate: Jordan Postak
## Position: Junior Web Developer Technical Interview
## Repository: GPSTechnicalInterview

---

# Day 1 — Initial Project Setup

## Objective

Set up the technical interview project locally and review initial structure.

## Actions Taken

- Forked the GPSTechnicalInterview repository to my personal GitHub account.
- Cloned the forked repository to my local machine using VS Code.
- Opened the project in VS Code and reviewed the folder structure.
- Identified the Angular frontend project (GPS.TechnicalInterview.Web).
- Reviewed the provided design document and Figma prototype.
- Created a WORK_LOG.md file to document progress and decisions.

---

# Day 1 — Backend Build & Environment Fixes

## Objective

Resolve build errors and configure the local development environment.

## Actions Taken

- Attempted to run the backend using dotnet run and encountered build errors due to missing model classes (LoanTerms and PersonalInformation).
- Created LoanTerms.cs and PersonalInformation.cs models to match the structure referenced by LoanApplication.
- Discovered the controller expected PersonalInformation.Name.First and Name.Last rather than separate FirstName/LastName fields.
- Created a Name model and updated PersonalInformation to match the expected API contract.
- Attempted to run the application again and encountered a .NET version mismatch (project targets .NET 6).
- Installed the .NET 6 SDK to match the project’s target framework (net6.0).
- Verified installation with dotnet --list-sdks (confirmed 6.0.428).
- Generated and trusted a local HTTPS development certificate using dotnet dev-certs https --trust.
- Successfully launched the application locally at https://localhost:5001.

## Observations

The project includes an ASP.NET Core backend with an embedded Angular frontend. The exercise involves implementing dashboard functionality based on the provided Figma prototype and completing missing CRUD operations.

## What I Learned

- How backend models must match controller expectations and API contracts.
- The importance of debugging build errors systematically.
- How to resolve .NET runtime version mismatches.
- How HTTPS development certificates work in ASP.NET Core.
- The importance of running Git commands from the repository root.

# Day 1 — Backend Implementation

## Objective

Implement and verify CRUD functionality for loan applications.

## Actions Taken

- Reviewed ApplicationManagerController and identified that only the Create (POST) endpoint was implemented.
- Noticed a TODO comment indicating that CRUD operations needed to be added.
- Implemented a GetApplications endpoint to return stored loan applications from loanApplication.json.
- Restarted the application to confirm the endpoint builds and runs successfully.
- Used Invoke-RestMethod in PowerShell to test POST /ApplicationManager/CreateApplication and successfully created a sample application (A-1001).
- Verified GET /ApplicationManager/GetApplications returns the created record in JSON format.
- Confirmed that data is persisted to loanApplication.json.

## Result

The backend now supports creating and retrieving loan applications, completing the "Create" and "Read" portions of CRUD functionality.

# Day 1 — Frontend Integration

## Objective

Connect Angular frontend to backend API and render application data in the dashboard.

## Actions Taken

- Created TypeScript interfaces to match backend LoanApplication model.
- Implemented ApiService methods to call backend CRUD endpoints.
- Injected ApiService into ApplicationsComponent.
- Loaded applications on ngOnInit().
- Bound Angular Material table dataSource to the returned applications array.
- Added mat-cell templates for each column.
- Resolved a TypeScript module error related to model imports by resetting Angular build dependencies.
- Verified that created application (A-1001) successfully renders in the dashboard UI.

## Result

Confirmed full-stack functionality: backend data is retrieved and displayed correctly in the Angular dashboard.

# Day 1 — Create Application Integration

## Objective

Implement full Create functionality from Angular form to backend API.

## Actions Taken

- Implemented form validation in Angular to align with backend validation rules.
- Added numeric parsing and input sanitation for amount, monthly payment, and terms.
- Handled ASP.NET Core model binding errors (400 validation responses).
- Used browser developer tools to inspect network responses and identify JSON conversion issues.
- Successfully posted new loan applications from the UI to the backend.
- Verified persistence in loanApplication.json and immediate display in dashboard after redirect.

## Result

The application now supports full end-to-end creation of loan applications through the Angular UI, with proper validation and error handling.

# Day 1 — Delete Functionality & Data Integrity Improvements

## Objective

Implement and verify delete functionality from the Angular UI, and enforce data integrity on the backend.

## Actions Taken

- Added an actions column to the Angular Material table.
- Implemented a contextual menu (three-dot icon) using Angular Material mat-menu.
- Added Delete action with confirmation dialog.
- Connected Delete action to backend DELETE /ApplicationManager/DeleteApplication/{applicationNumber} endpoint.
- Refactored backend Delete logic to remove a single matching record instead of using RemoveAll, preventing unintended multi-record deletion.
- Identified duplicate application numbers issue during testing.
- Enforced unique ApplicationNumber constraint in the Create endpoint.
- Added backend 409 Conflict response when attempting to create duplicate application numbers.

## Result

- Applications can now be deleted directly from the dashboard.
- Delete operations remove only a single matching record.
-  application numbers are prevented at the API layer.
- Full Create, Read, and Delete functionality is now working end-to-end.The application now supports full end-to-end creation of loan applications through the Angular UI, with proper validation and error handling.

# Day 1 — UI Polish (Status + Date Formatting)

## Objective
Improve dashboard readability and better match the Figma design.

## Actions Taken
- Converted numeric status values (0/1/2) into user-friendly labels (New/Approved/Funded) in the Angular UI.
- Updated the Date Applied column to display date-only formatting to match the Figma mockup.

## Result
Dashboard table now matches the intended design more closely and is easier to read.

# Day 2 — Edit / Update Functionality

## Objective
Implement full update functionality from dashboard UI to backend API.

## Actions Taken
- Added edit navigation from Applications table via query parameter.
- Implemented edit mode detection in CreateApplicationComponent.
- Prefilled reactive form using existing application data.
- Disabled ApplicationNumber field during edit to preserve identifier integrity.
- Implemented PUT call to UpdateApplication endpoint.
- Preserved original DateApplied value on backend update.
- Verified updates persist to loanApplication.json and reflect immediately in dashboard.

## Result
The application now supports full CRUD (Create, Read, Update, Delete) functionality end-to-end with Angular frontend and ASP.NET Core backend.