
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.eventId || !body.status) {
      return Response.json(
        { error: "Missing eventId or status" },
        { status: 400 }
      );
    }

    const callerSuffix = String(body.from || "")
      .replace(/\D/g, "")
      .slice(-4);

    console.log({
      eventId: body.eventId,
      status: body.status,
      callerSuffix: callerSuffix ? `****${callerSuffix}` : null
    });

    return Response.json({
      success: true,
      message: "Simulator event received",
      eventId: body.eventId
    });
  } catch {
    return Response.json(
      { error: "Invalid simulator request" },
      { status: 400 }
    );
  }
}
