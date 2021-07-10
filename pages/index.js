import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
  const [session] = useSession()

  return <>
    <p>From the root of this project directory, please import the collection file: <code>rest-nextjs-nextauthjs-prisma-api-routes.postman_collection.json</code> into an API Tester tool such as Postman, Talend API Tester, etc.</p>
    <pre>
      <p>After importing you might test the following REST APIs:</p>
      <ul>
        <li>Sign up a new user</li>
        <li>Create a new user by a resgistered user</li>
        <li>Update user balance</li>
      </ul>
    </pre>
    <pre><small><b>Note:</b> Some API endpoints need authentication! To perform any operation on the targeted resource using an API Tester tool, you have to sign in from here.</small></pre>
    <hr />
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as <b>{session.user.email}</b><br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>}
    
  </>
}