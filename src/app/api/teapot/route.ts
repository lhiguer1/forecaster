export async function GET(request: Request) {
  return new Response("418 I'm a teapot", {
    status: 418,
  });
}
