import type {ActionFunctionArgs, MetaFunction} from "@remix-run/node";
import {Form, useActionData} from "@remix-run/react";

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const body = JSON.stringify({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  const response = await fetch("http://localhost:5173/api", {
    method: "POST",
    body,
  });
  return await response.json();
}

export const meta: MetaFunction = () => {
  return [
    {title: "Input-validering"},
    {name: "description", content: "Input-validering for faggruppemøte"},
  ];
};

export default function Index() {
  const data = useActionData<typeof action>();

  return (
    <main className="m-10">
      <h1>Input-validering</h1>
      <div className="grid grid-cols-2">
        <Form method="POST" className="w-52 flex flex-col gap-4">
          <VStack>
            <label htmlFor="username">Brukernavn</label>
            <input type="text" name="username" />
          </VStack>
          <VStack>
            <label htmlFor="password">Passord</label>
            <input type="password" name="password" />
          </VStack>
          <button
            type="submit"
            className="border border-blue-300 hover:cursor-pointer hover:shadow-xl disabled:bg-gray-500"
          >
            Registrer
          </button>
        </Form>
      </div>
      <div>
        {data?.user && <DangerouslyRenderValue value={data.user.username} />}
      </div>
    </main>
  );
}

function VStack({children}: {children: React.ReactNode}) {
  return <pre className="flex flex-col">{children}</pre>;
}

// Render ukritisk value som HTML - OBS: Det er en dårlig idé, men gjøres her for å vise et poeng
function DangerouslyRenderValue({value}: {value: string}) {
  return <div dangerouslySetInnerHTML={{__html: value}} />;
}
