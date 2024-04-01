import type {ActionFunctionArgs, MetaFunction} from "@remix-run/node";
import {Form, useLoaderData, useNavigation} from "@remix-run/react";
import {useEffect, useRef} from "react";
import {CommentData} from "../domain/Comment";

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const body = JSON.stringify({
    username: formData.get("username"),
    comment: formData.get("comment"),
  });

  const response = await fetch("http://localhost:5173/api", {
    method: "POST",
    body,
  });

  return (await response.json()) as CommentData[];
}

export async function loader() {
  const response = await fetch("http://localhost:5173/api");
  return (await response.json()) as CommentData[];
}

export const meta: MetaFunction = () => {
  return [
    {title: "Input-validering"},
    {name: "description", content: "Input-validering for faggruppemøte"},
  ];
};

export default function Index() {
  const comments = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isAdding = navigation.state === "submitting";
  const formRef = useRef<HTMLFormElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
      usernameRef.current?.focus();
    }
  }, [isAdding]);

  return (
    <main className="m-10">
      <h1>Forum</h1>
      <div className="grid grid-cols-2">
        <div className="grid grid-cols-2">
          <Form
            ref={formRef}
            method="POST"
            className="w-52 flex flex-col gap-4"
          >
            <VStack>
              <label htmlFor="username">Brukernavn</label>
              <input ref={usernameRef} type="text" name="username" />
            </VStack>
            <VStack>
              <label htmlFor="comment">Kommentar</label>
              <textarea name="comment" />
            </VStack>
            <button
              type="submit"
              className="border border-blue-300 hover:cursor-pointer hover:shadow-xl disabled:bg-gray-500"
            >
              Registrer
            </button>
          </Form>
        </div>
        <div className="prose">
          <h2>Kommentarer</h2>
          <ul>
            {comments?.map((comment) => {
              return <ViewComment comment={comment} key={comment.id} />;
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}

function VStack({children}: {children: React.ReactNode}) {
  return <pre className="flex flex-col">{children}</pre>;
}

function ViewComment({comment}: {comment: CommentData}) {
  return (
    <li>
      <h4>{comment.username}</h4>
      <DangerouslyRenderValue value={comment.comment} />
    </li>
  );
}

// Render ukritisk value som HTML - OBS: Det er en dårlig idé, men gjøres her for å vise et poeng
function DangerouslyRenderValue({value}: {value: string}) {
  return <div dangerouslySetInnerHTML={{__html: value}} />;
}
