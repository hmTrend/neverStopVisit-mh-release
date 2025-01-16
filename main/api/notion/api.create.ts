import { Client } from "@notionhq/client";

export const notion = new Client({
  auth:
    process.env.NOTION_TOKEN ??
    "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",
});

const DATABASE_ID = "17dc7cf713ef80daad90fbbd729b4477";

export async function addItemToDatabase({ data }) {
  try {
    const { totalCount, notLoginCount, nPw, nId, groupFid } = data;
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        name: {
          title: [
            {
              text: {
                content: "로그인 풀림 이슈 발생",
              },
            },
          ],
        },
        "신규 이슈 아이디": {
          rich_text: [
            {
              text: {
                content: nId,
              },
            },
          ],
        },
        비밀번호: {
          rich_text: [
            {
              text: {
                content: nPw,
              },
            },
          ],
        },
        "작업된 그룹 아이디": {
          rich_text: [
            {
              text: {
                content: groupFid,
              },
            },
          ],
        },
        "정상 로그인": {
          number: totalCount, // 숫자 값 직접 입력
        },
        "로그인 풀림": {
          number: notLoginCount, // 숫자 값 직접 입력
        },
        작성날짜: {
          date: {
            start: new Date().toISOString(), // 현재 시간을 ISO 문자열로 변환
          },
        },
      },
    });

    console.log("Successfully added/");
    console.log("Generated pages ID:", response.id);
    return response;
  } catch (error) {
    console.error("에러 발생:", error.body);
    throw error;
  }
}

// (async () => {
//   try {
//     const result = await addItemToDatabase();
//     if (result) {
//       console.log("전체 응답:", result);
//     }
//   } catch (error) {
//     console.error("실행 중 오류 발생:", error);
//   }
// })();
