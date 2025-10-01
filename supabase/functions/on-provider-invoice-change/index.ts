import "jsr:@supabase/functions-js/edge-runtime.d.ts";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  const { record: updatedRecord, old_record: oldRecord } = await req.json();

  if (updatedRecord?.validation_status !== oldRecord?.validation_status) {
    console.info("Validation status changed:", {
      from: oldRecord?.validation_status,
      to: updatedRecord?.validation_status,
    });
    return new Response("Validation status changed", { status: 200 });
  }

  return new Response(
    JSON.stringify(null),
    { headers: { "Content-Type": "application/json" } },
  );
});