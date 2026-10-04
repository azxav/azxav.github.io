import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**", "public/**", "uploads/**"],
  },
  tseslint.configs.recommended,
  eslintPluginAstro.configs["flat/recommended"],
);
