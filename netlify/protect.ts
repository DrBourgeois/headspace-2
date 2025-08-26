import arcjet, { shield } from "https://esm.sh/@arcjet/deno@1.0.0-alpha.34";

const aj = arcjet({
  key: Deno.env.get("ARCJET_KEY")!, // Arcjet key is auto-provided by Netlify
  characteristics: ["ip"],
  rules: [
    shield({ mode: "LIVE" }), // change to DRY_RUN first if you want to test
  ],
});

export default async (req: Request) => {
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    return new Response("Forbidden", { status: 403 });
  }

  return fetch(req); // let good requests through to your static files
};

export const config = { path: "/*" };
