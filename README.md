## Scaling Note (Frontend–Backend Integration for Production)
To scale this project for production, I would:
- Keep the frontend and backend separate so they can be deployed and updated independently.
- Use environment variables to switch between development and production API URLs.
- Add proper error handling on both sides so the app doesn’t break if an API fails.
- Use JWT tokens securely and add basic checks like validation and authorization middleware.
- Organize the backend into clean folders (routes, controllers, models) so it is easier to add more features later.
- Use React Query/Axios on the frontend to manage API calls more efficiently.
- Add simple optimizations like loading states, pagination, and input validation so the app performs well with more users.
