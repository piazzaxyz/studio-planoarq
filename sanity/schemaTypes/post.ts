import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post do Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL do post)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      description: "Texto curto exibido nos cards e na listagem.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Design", value: "Design" },
          { title: "Tendências", value: "Tendências" },
          { title: "Processo", value: "Processo" },
          { title: "Projetos", value: "Projetos" },
          { title: "Sustentabilidade", value: "Sustentabilidade" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      initialValue: "Plano Arq",
    }),
    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de Capa",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Título H2", value: "h2" },
            { title: "Título H3", value: "h3" },
            { title: "Citação", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Legenda",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", author: "author", media: "coverImage" },
    prepare({ title, author, media }) {
      return { title, subtitle: author, media };
    },
  },
});
