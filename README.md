Server-Rendered E-commerce Product Management Dashboard

## Summary

This project is a server-side-rendered (SSR) admin dashboard for managing the core product data of an e-commerce system, including secure creation, viewing, updating and deleting of product data; managing images, providing validation capabilities, and offering real-time visualisation of product data.

This application was developed with consideration for its performance, reliability and real-world usability, with emphasis on clean SSR, structured workflow for the admin.

## Goal

The purpose of this project is to provide a server-side-rendered admin dashboard that:

- Provides fast page loads via SSR
- Provides a secure interface for the admin user
- Provides complete product management using validation
- Demonstrates how to integrate the backend and front-end in the real world

## Benefits

- Utilises SSR by using Next.js for greater performance and better SEO
- Provides complete Product Management; includes Create, Read, Update and Delete operations
- Provides a multi-step product creation form that has strong input validation
- Provides Cloudinary for secure image upload and storage
- Allows for real-time interactive visualisation of product-related data via charts
- Has authentication and authorisation to allow only admins to access
- Provides the ability for admins to log out and protects routes
- Admins can only access the dashboard (onboard to the dashboard) if they meet certain criteria

## Tech Stack

Next are Frontend and Backend.js (SSR, App Router)
ORM: Prisma; Database: PostgreSQL
Zod for Form Validation; Cloudinary for Image Storage
Charts: Chart.js or Recharts
- Authentication: Admin authentication based on cookies

## Workflow for Applications

1. The administrator logs in with legitimate credentials
2. The server renders dashboard pages and confirms authentication.
3. Product information is retrieved straight from the server's database.
4. The administrator creates, edits, and deletes products.
5. Pictures are safely uploaded and kept in the cloud.
6. Refreshing the user interface by retrieving the most recent server data

## Dummy Administrator Credentials

To access the dashboard, enter the following login information:

Admin is the username.  
Admin123 is the password.

These credentials are solely intended for demonstration.

## Managing the Project Locally

1. Use npm install to install dependencies.

2. Execute database migrations: npx prisma migrate dev

3. Use npm run dev to launch the development server.

4. Launch the program in your web browser:
   http://localhost:3000

##Dummy admin credentials
   username - admin
   password - admin123

## Deliverables

The entire GitHub repository, including all source code
SSR admin dashboard that is fully operational; product CRUD with image handling and validation
Protected routes and interactive charts
Clear setup guidelines and documentation

## Remarks

Environment variables (.env) are purposefully left out of the repository.
For image uploads to function, Cloudinary credentials must be added locally.
- The project's goals are demonstration and education.

Note on Logout Behaviour

When running the application locally (`http://localhost:3000`), the logout
functionality works normally without any browser warnings.
On the live Vercel deployment, some browsers (such as Chrome or Safari) may show 
a confirmation or cache-related message during logout due to browser-level handling 
of POST requests and server-side redirects in production. This is expected behaviour 
and does not affect the security or correctness of the application.

## Live Deployment (Vercel)

Live Application URL:

https://ecommerce-admin-dashboard-wine.vercel.app/

This is the primary production deployment hosted on Vercel.
All core features including authentication, product management,
image uploads, and data visualisation are fully functional.

## Deployment Notes

The application is deployed using Vercel and is connected to a
PostgreSQL database hosted on Neon, with Prisma as the ORM layer.

Key deployment considerations:
- Server Components are used for data fetching and authentication.
- Client Components are used for chart rendering to avoid SSR conflicts.
- Environment variables are configured securely on Vercel.
- Cloudinary is used for image uploads via server-side API routes.

## Writer

Rounak Tiwari
