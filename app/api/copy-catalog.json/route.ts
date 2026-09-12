import { editableContentCatalog } from "../../utils/editableContent";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(
    { entries: editableContentCatalog() },
    {
      headers: {
        "cache-control": "public, max-age=3600",
      },
    },
  );
}
