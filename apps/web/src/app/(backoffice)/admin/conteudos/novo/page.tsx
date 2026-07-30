import { ArticleEditorForm } from "@/components/admin/article-editor-form";
import { PageHeader } from "@/components/admin/page-header";
import { createArticleAction } from "../../actions";
import { getEditorialFormOptions } from "@/modules/editorial";

export default async function NewArticlePage() {
  const options = await getEditorialFormOptions();

  return (
    <>
      <PageHeader description="A matéria começa como working copy e só cria uma revisão imutável ao ser enviada." eyebrow="Novo conteúdo" title="Criar matéria" />
      <ArticleEditorForm action={createArticleAction} authors={options.authors} categories={options.categories} />
    </>
  );
}
