import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Flashcards from "@/components/study/Flashcards";
import QuizTab from "@/components/study/QuizTab";
import Notice from "@/components/common/Notice";

export default function StudyCenter() {
  return (
    <Page>
      <PageHeader
        kicker="Study Center"
        title="Flashcards & Practice Quizzes"
        desc="Active recall beats rereading. Cards you miss come back sooner, and adaptive quizzes lean toward questions you struggle with."
      />
      <Notice className="mb-6" title="Practice material, not official tests">
        Questions are written by YM360 from the supplied Advanced Guidebook and Awards Manual, with the source page shown. Only Advanced Guidebook and Awards content is available until the other guidebooks are added. A practice score does not guarantee success on any official test.
      </Notice>
      <Tabs defaultValue="cards">
        <TabsList className="mb-5">
          <TabsTrigger value="cards">Flashcards</TabsTrigger>
          <TabsTrigger value="quiz">Quizzes</TabsTrigger>
        </TabsList>
        <TabsContent value="cards"><Flashcards /></TabsContent>
        <TabsContent value="quiz"><QuizTab /></TabsContent>
      </Tabs>
    </Page>
  );
}