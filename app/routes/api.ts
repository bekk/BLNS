import {ActionFunctionArgs, json} from "@remix-run/node";

const users = [{username: "test", password: "test"}];

export async function action({request}: ActionFunctionArgs) {
  const body = (await request.json()) as {
    username: string;
    password: string;
  };

  const {username, password} = body;

  const userExists = users.find(
    (user) => user.username === username && user.password === password
  );

  if (userExists) {
    return json({user: {username}}, {status: 200});
  } else {
    // Returnerer input så vi kan rendre det i frontend (obs: det er en dårlig idé, men brukes her som eksempel)
    return json({user: {username}}, {status: 403});
  }
}
