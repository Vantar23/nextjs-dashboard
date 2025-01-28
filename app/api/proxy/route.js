export async function GET(req) {
    const response = await fetch("http://37.27.133.117/backend/api/Catalogos");
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }