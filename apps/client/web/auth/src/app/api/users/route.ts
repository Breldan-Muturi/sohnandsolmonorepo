export async function GET() {
  const url = `http://localhost:3003/api/v1/auth/dc3ae6fe-697c-4d19-a3e8-5546901bc781`;

  const res = await fetch(url);
  const data = await res.json();

  return Response.json(data);
}
