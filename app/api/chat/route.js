export async function POST(req) {
  try {
    const body = await req.json();
    const msg = (body.message || "").trim();
    const api
