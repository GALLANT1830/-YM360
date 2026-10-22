import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import QuestionBank from "@/components/board/QuestionBank";
import MockBoard from "@/components/board/MockBoard";
import Notice from "@/components/common/Notice";
import { originalQuestions, supplementalQuestions, LEVELS } from "@/data/boardQuestions";

export default function BoardPrep() {
  return (
    <Page>
      <PageHeader
        kicker="YMOY & Board Preparation"
        title="The Board Coach"
        desc="Write your own answer first, then study question-specific coaching. YM360 teaches you how to build authentic answers — it never writes a script or invents experiences for you."
      />
      <Tabs defaultValue="bank">
        <TabsList className="mb-5 h-auto flex-wrap">
          <TabsTrigger value="bank">Question bank</TabsTrigger>
          <TabsTrigger value="mock">Mock board</TabsTrigger>
          <TabsTrigger value="about">How this works</TabsTrigger>
        </TabsList>
        <TabsContent value="bank"><QuestionBank /></TabsContent>
        <TabsContent value="mock"><MockBoard /></TabsContent>
        <TabsContent value="about">
          <div className="max-w-3xl space-y-4 text-sm">
            <p><strong>{originalQuestions.length}</strong> user-recalled questions and <strong>{supplementalQuestions.length}</strong> supplemental YM360 practice questions are in the bank. Supplemental questions are clearly labeled and are not real board questions.</p>
            <p>Board levels available as tags: {LEVELS.map((l) => l.label).join(", ")}. Boards do not all follow the same procedure.</p>
            <Notice title="Status of features">
              <strong>Working now:</strong> question bank, filters, coaching, saved answers and status, mock board with optional timer. Answers and progress are stored only in this browser. <strong>Not connected:</strong> AI feedback on your answers; adding or editing questions through an admin screen (needs a database and secure sign-in).
            </Notice>
          </div>
        </TabsContent>
      </Tabs>
    </Page>
  );
}