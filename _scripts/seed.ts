import { mock } from "@/shared/mock";
import { PrismaClient } from "@prisma/client";
import { random } from "lodash-es";
import { createLogUpdate } from "log-update";
import os from "node:os";

const internalTagNames = ["react", "vue", "next.js", "javascript"];
const ANSWER_COUNT = 10000;
const USER_COUNT = 100;
const QUESTION_COUNT = 100;
const TAG_COUNT = 100 + internalTagNames.length;

const prisma = new PrismaClient({
  transactionOptions: {
    timeout: 20 * 1000,
  },
});
async function main() {
  console.log("deleting old data...");
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  console.log("Creating users...");
  const users = await prisma.user.createManyAndReturn({
    data: mock.create(mock.user, USER_COUNT),
  });

  console.log("Creating tags...");
  const tags = await prisma.tag.createManyAndReturn({
    data: internalTagNames
      .map((name) => ({ name, description: `${name} tag` }))
      .concat(mock.create(mock.tag, TAG_COUNT - internalTagNames.length)),
  });

  console.log("Creating questions...");
  const questions = await prisma.question.createManyAndReturn({
    data: mock.create(mock.question, QUESTION_COUNT).map((q) => ({
      ...q,
      authorId: users[random(0, USER_COUNT - 1)].id,
    })),
  });

  console.log("Creating answers...");
  const answers = await prisma.answer.createManyAndReturn({
    data: mock.create(mock.answer, ANSWER_COUNT).map((a) => ({
      ...a,
      authorId: users[random(0, USER_COUNT - 1)].id,
      questionId: questions[random(0, 99)].id,
    })),
  });

  console.log("Updating users...");
  const updateUserLog = createLogUpdate(process.stdout, {
    showCursor: true,
  });
  const randomRange = (count: number) => [
    random(0, Math.floor(count / 4) - 1),
    random(Math.floor(count / 4), Math.floor(count / 2)),
    random(Math.floor(count / 2), Math.floor((count * 3) / 4) - 1),
    random(Math.floor((count * 3) / 4), count),
  ];
  const updateUserTasks = users.map((user, index) => async () => {
    updateUserLog(`Updating user ${index + 1} of ${users.length}...`);
    const [
      upVoteQuestionStart,
      upVoteQuestionEnd,
      downVotesQuestionStart,
      downVotesQuestionEnd,
    ] = randomRange(QUESTION_COUNT);
    const [
      upVoteAnswerStart,
      upVoteAnswerEnd,
      downVoteAnswerStart,
      downVoteAnswerEnd,
    ] = randomRange(ANSWER_COUNT);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        collections: {
          connect: questions
            .slice(upVoteQuestionStart, upVoteQuestionEnd)
            .map(({ id }) => ({ id })),
        },
        upvoteQuestions: {
          connect: questions
            .slice(upVoteQuestionStart, upVoteQuestionEnd)
            .map(({ id }) => ({ id })),
        },
        downvoteQuestions: {
          connect: questions
            .slice(downVotesQuestionStart, downVotesQuestionEnd)
            .map(({ id }) => ({ id })),
        },
        upvoteAnswers: {
          connect: answers
            .slice(
              upVoteAnswerStart,
              Math.min(upVoteAnswerStart + 50, upVoteAnswerEnd)
            )
            .map(({ id }) => ({ id })),
        },
        downVoteAnswers: {
          connect: answers
            .slice(
              downVoteAnswerStart,
              Math.min(upVoteAnswerStart + 50, downVoteAnswerEnd)
            )
            .map(({ id }) => ({ id })),
        },
      },
    });
  });

  await runTasks(updateUserTasks);

  console.log("Updating questions...");
  const updateQuestionLog = createLogUpdate(process.stdout, {
    showCursor: true,
  });
  const updateQuestionTasks = questions.map((question, index) => async () => {
    updateQuestionLog(
      `Updating question ${index + 1} of ${questions.length}...`
    );
    const tagStart = random(0, 96);
    await prisma.question.update({
      where: {
        id: question.id,
      },
      data: {
        tags: {
          connect: tags
            .slice(tagStart, tagStart + 3)
            .map((tag) => ({ id: tag.id })),
        },
      },
    });
  });

  await runTasks(updateQuestionTasks);
}

async function runTasks(
  tasks: Array<() => Promise<void>>,
  parallelCount = os.cpus().length
) {
  let start = 0;
  while (start < tasks.length) {
    const tasksToRun = tasks.slice(start, start + parallelCount);
    await Promise.all(tasksToRun.map((task) => task().catch(task)));
    start += parallelCount;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
