import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "plano-arq",
  title: "Plano Arq — Admin",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem()
              .title("Posts do Blog")
              .id("post")
              .child(S.documentTypeList("post").title("Posts do Blog")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  studio: {
    components: {},
  },
});
