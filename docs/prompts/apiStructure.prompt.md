# Api Structure - Database 

Goal: Create a drizzel ORM structure for the database in the Express application.
Context: The database needs to be structured with Drizzle ORM. We should create seperate folders for models, migrations. Then use the ORM in Data Access Object layer to interact with the database. You can read `dbdiagram.md` for more details on the database structure and relationships.


# API Structure - Routing

Goal: Create a clear and maintainable structure for the API routes in the Express application.

Context: The API will be organized into different route files based on functionality. Each route file will handle a specific set of related endpoints, making it easier to manage and scale the application as it grows. A request follows these flow 
1. Router (sometimes with middlewares)
2. Controller
3. Service
4. Data Access Object (DAO)
This structure promotes separation of concerns and allows for better organization of code, making it easier to maintain and extend in the future.

Using this structure, create a auth controller/service for handling user authentication, including login and registration endpoints. The controller will receive requests, the service will contain the business logic for authentication, and the DAO will interact with the database to manage user data. Use access tokens for authentication and ensure that sensitive information is handled securely.