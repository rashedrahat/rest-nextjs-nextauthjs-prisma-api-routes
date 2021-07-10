# rest-nextjs-nextauthjs-prisma-api-routes
Simple `Next.js` app with some REST APIs using `NextAuth.js` & `Prisma`.
<ul>
    <li>Sign up a new user</li>
    <li>Create a new user by a resgistered user</li>
    <li>Update user balance</li>
</ul>

## Getting Started

First, install the packages:

```bash
npm install
# or
npm i
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Then as optional, run in another terminal:

```bash
npx prisma studio
```

Open [http://localhost:5555](http://localhost:5555) with your browser to see the Prisma Studio.

You can start testing the APIs by importing `rest-nextjs-nextauthjs-prisma-api-routes.postman_collection.json` file into an API Tester tool such as `Postman`, `Talend API Tester` (recommended), etc.

## Issues with Postman but not with Talend API Tester

You may find an issue (`401 Unauthorized`) although user is authenticated with the following API endpoints:
  <ul>
    <li><code>http://localhost:3000/api/users/create</code></li>
    <li><code>http://localhost:3000/api/money/update</code></li>
  </ul>

If you face this issue then in your case switch to [Talend API Tester](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm?hl=en) instead of using `Postman`. There are no issues in [Talend API Tester](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm?hl=en) (it behaves correctly the way it should be).
