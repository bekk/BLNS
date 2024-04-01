import {ActionFunctionArgs, json} from "@remix-run/node";
import crypto from "crypto";
import {CommentData} from "../domain/Comment";

const comments: CommentData[] = [];

export async function action({request}: ActionFunctionArgs) {
  const body = (await request.json()) as {
    username: string;
    comment: string;
  };

  const {username, comment} = body;

  comments.unshift({username, comment, id: crypto.randomUUID()});

  // Returnerer input så vi kan rendre det i frontend (obs: det er en dårlig idé, men brukes her som eksempel)
  return json(comments);
}

export async function loader() {
  return json(comments);
}
