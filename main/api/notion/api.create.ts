import { Client } from "@notionhq/client";

export const notion = new Client({
  auth:
    process.env.NOTION_TOKEN ??
    "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",
});

const DATABASE_ID = "17dc7cf713ef80daad90fbbd729b4477";

async function addItemToDatabase() {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        name: {
          title: [
            {
              text: {
                content: "테스트 이름",
              },
            },
          ],
        },
        oksk: {
          rich_text: [
            {
              text: {
                content: "테스트 제목",
              },
            },
          ],
        },
      },
    });

    console.log("성공적으로 추가되었습니다.");
    console.log("생성된 페이지 ID:", response.id);
    return response;
  } catch (error) {
    console.error("에러 발생:", error.body);
    throw error;
  }
}

(async () => {
  try {
    const result = await addItemToDatabase();
    if (result) {
      console.log("전체 응답:", result);
    }
  } catch (error) {
    console.error("실행 중 오류 발생:", error);
  }
})();
