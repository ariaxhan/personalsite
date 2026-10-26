import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".open-next/**",
      ".next/**",
      ".wrangler/**",
      "_meta/**",
      "cloudflare-env.d.ts",
      "next-env.d.ts",
      "functions/**",
      "workers/**",
    ],
  },
  ...nextVitals,
  ...nextTs,
  {
    // New in eslint-config-next 16 (react-hooks 7). Existing mount-time
    // effects predate it; surface them without blocking the build.
    rules: { "react-hooks/set-state-in-effect": "warn" },
  },
];

export default eslintConfig;
