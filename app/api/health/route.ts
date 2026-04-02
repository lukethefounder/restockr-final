export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    ok: true,
    timestamp: new Date().toISOString(),
    databaseConfigured: Boolean(process.env.DATABASE_URL),
    openAIConfigured: Boolean(process.env.OPENAI_API_KEY),
    mintsyConfigured: Boolean(process.env.MINTSY_API_URL),
    founderStripeConfigured: Boolean(process.env.FOUNDER_STRIPE_ACCOUNT_ID),
  });
}