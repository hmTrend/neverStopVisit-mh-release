import { Client } from "@notionhq/client";

export const notion = new Client({
  auth:
    process.env.NOTION_TOKEN ??
    "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",
});
const DATABASE_ID = "192c7cf713ef80caa6ceca5612c912be";
export async function api_notion_shopping_errorLog({
  data = {
    name: "로그인 문제",
    type: "쇼핑",
    errorLog: "this is ERROR",
    userAgent: "userAgent",
    logicType: "로직6(N_SHOPPING_TAB)",
  },
} = {}) {
  try {
    const { name, type, errorLog, userAgent, logicType } = data;
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        type: {
          select: { name: type },
        },
        logicType: {
          select: { name: logicType },
        },
        userAgent: {
          rich_text: [
            {
              text: {
                content: userAgent,
              },
            },
          ],
        },
        errorLog: {
          rich_text: [
            {
              text: {
                content: errorLog,
              },
            },
          ],
        },
        date: {
          date: {
            start: new Date().toISOString(), // 현재 시간을 ISO 문자열로 변환
          },
        },
      },
    });

    console.log("Successfully added ");
    console.log("Generated pages ID:", response.id);
    return response;
  } catch (error) {
    console.error("에러 발생:", error.body);
    throw error;
  }
}

// (async () => {
//   try {
//     const result = await api_notion_shopping_errorLog();
//     if (result) {
//       console.log("전체 응답:", result);
//     }
//   } catch (error) {
//     console.error("실행 중 오류 발생:", error);
//   }
// })();
