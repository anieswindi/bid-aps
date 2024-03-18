# Bids App

This is a really simple project that shows the usage of Next.js with TypeScript.

## Tech Stack

Includes:

- Next.js as the React framework
- Next.js API Routes for server-side API routes as the backend
- Prisma as the ORM for migrations and database access
- Vercel Postgres as the database
- TypeScript as the programming language

## How to use it?

1. Install package example:

```bash
npm install
```

or

```bash
yarn install
```

2. Environment file (.env.example):
   Please copy and paste .env from .env.example file
   ![Env](https://github.com/anieswindi/bid-aps/blob/master/public/env.png)

3. Run project example:

```bash
yarn dev
```

4. Run prisma studio:

```bash
npx prisma studio
```

5. Simple Authorization using validation on Frontend.
   Please login with this account only:

```bash
user: Hershel_Romaguera@hotmail.com
password: 12345678
```

6. Answer the following question:
  - How would you monitor the application to ensure it is running smoothly?
  # I monitor the application using vercel deployment ![bid-aps-link](https://bid-aps-v2.vercel.app/login) 


  - How would you address scalability and performance?
  # For perfomance in frontend, I'm just render some data that should I use, not all the data rendered. 


  - Trade-offs you had to choose when doing this challenge (the things you would do different with more time and resources)
  # Actually I never using Prisma, but I dedicated my full weekend day to learn about Prisma model, how the queries work, and how create relation on database (I think this mine is totally not perfect and not suitable with the requirements but I do the best).

  




## Notes

![Login Page](https://github.com/anieswindi/bid-aps/blob/master/public/login_page.png)
![Home Page](https://github.com/anieswindi/bid-aps/blob/master/public/home.png)

![Add Collection](https://github.com/anieswindi/bid-aps/blob/master/public/add_collection.png)
![Delete Collection](https://github.com/anieswindi/bid-aps/blob/master/public/delete_collection.png)
![Update Collection](https://github.com/anieswindi/bid-aps/blob/master/public/update_collection.png)

![Add Bid/Place Bid](https://github.com/anieswindi/bid-aps/blob/master/public/add_bid.png)

![Success Update Data Popup (Add,Update,Delete)](https://github.com/anieswindi/bid-aps/blob/master/public/success_update.png)
