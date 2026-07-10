/**
 * JsonLd: renders one <script type="application/ld+json"> from a plain object
 * (or array of objects). Server component, so the script is baked into the
 * static HTML at build time. The < escape prevents any </script> breakout.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
