import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Project rules and conventions
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Style
      quotes: ["error", "single", { avoidEscape: true }],
      semi: ["error", "never"],
      "no-extra-semi": "error",
      indent: ["error", 2, { SwitchCase: 1 }],

      // Best practices
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": ["error", { destructuring: "all" }]
    }
  },
  // Unused vars per-language
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ]
    }
  },
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      "no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ]
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
