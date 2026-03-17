Implementation Plan: Ensuring Correct User Data Flow (No Ghost Users)
Overview
Refactor the frontend and backend to guarantee that all user data displayed in the application is fetched directly from MongoDB via the backend API. Eliminate any ghost/mock users, prevent localStorage from polluting the user list, and ensure the selected user is always validated against the database. This will make the app robust, recruiter-friendly, and compliant with fullstack best practices.

Requirements
User list must be fetched from the backend API (MongoDB only).
No mock/hardcoded users in frontend or backend for production.
LocalStorage is used only for the currently selected user, not for the user list.
On refresh, the frontend must not display users from localStorage unless they exist in the database.
Profile pictures must be handled gracefully (base64 or URL).
Logging (Winston or console) must be enabled for backend debugging.
Implementation Steps
Backend Refactoring

Ensure /api/users returns only MongoDB users.
Remove any merging of mock/hardcoded users in backend logic.
Add logging for user fetch operations (Winston or console).
Frontend Refactoring

On Users page load, fetch user list from API and display only those users.
Remove any code that merges localStorage or mock users with API data.
On user selection, store only the selected user in localStorage.
On app load, validate the currentUser in localStorage against the API user list; if not found, clear currentUser.
Profile Picture Handling

Ensure profile picture display logic supports both base64 and URL.
Add fallback for broken image URLs.
Logging

Re-enable Winston logging in backend, configured for console output if file logging causes issues on Vercel.

5. **LocalStorage Cleanup**
   - Add a cleanup function in userStore to remove any orphaned/stale localStorage keys on app init.
   - Only keep "currentUser" key; remove any other user-related localStorage entries from old code.

Testing
Test that the Users page displays only users from MongoDB (no ghost/mock users).
Test that selecting a user stores them in localStorage and persists across pages.
Test that refreshing the page does not reintroduce deleted or ghost users.
Test that profile pictures display correctly, with fallback for broken URLs.
Test backend logs for user fetch operations.
Test error handling for missing or invalid users in localStorage.
Test on both local and deployed (Vercel) environments.

Todo:

- Add gentle warning or prompt in the UI when no user is selected, encouraging the user to choose or register a user.
  This plan will ensure your app’s user data flow is robust, clean, and recruiter-ready.

note: if you at later point need to check problems/errors that could be because of latest changes to libraries/frameworks. You must first look at the context first, then check the library documentation for any breaking changes or updates that could affect your implementation. Always refer to the official docs for the most accurate and up-to-date information.:

https://mcp.context7.com/mcp
mcp_context7_resolve-library-id
mcp_context7_get-library-docs

CONTEXT7_API_KEY
${{ secrets.COPILOT_MCP_CONTEXT7 }}

tools: get-library-docs
resolve-library-id
