import { Client } from "@notionhq/client";

export const notion = new Client({
  auth:
    process.env.NOTION_TOKEN ??
    "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",
});
const DATABASE_ID = "188c7cf713ef80b2a19feb476b124e0b";

export async function apiPatchDayNowCountForShopping({
  data = {
    _id: "67933d15a0a8031aa9aef9a0",
    __v: 0,
    createdAt: { $date: "2025-01-24T07:11:17.077Z" },
    dayCount: 1000,
    delayTime: 1,
    groupFid: "67933572a0a8031aa9aef935",
    nowCount: 1001,
    nvMid: "86898673372",
    nvMidList: "",
    targetKeyword: "스센",
    updatedAt: { $date: "2025-01-27T05:04:13.452Z" },
    workKeywordList: [
      {
        workKeyword: "신일 전기히터 가정용",
        targetBlog: "",
      },
      {
        workKeyword: "신일 전기히터",
        targetBlog: "",
      },
      {
        workKeyword: "2in1 사무실 온열기",
        targetBlog: "",
      },
      {
        workKeyword: "가정용 전기난로 난방기 스토브",
        targetBlog: "",
      },
    ],
  },
} = {}) {
  try {
    const {
      targetKeyword,
      delayTime,
      nvMid,
      nvMidList,
      groupFid,
      dayCount,
      nowCount,
      workKeywordList,
    } = data;
    const keywordString = workKeywordList
      .map((item) => item.workKeyword)
      .join(", ");

    const inputData = {
      targetKeyword: {
        title: [
          {
            text: {
              content: targetKeyword,
            },
          },
        ],
      },
      groupFid: {
        rich_text: [
          {
            text: {
              content: groupFid,
            },
          },
        ],
      },
      delayTime: {
        number: delayTime, // 숫자 값 직접 입력
      },
      nvMid: {
        rich_text: [
          {
            text: {
              content: nvMid,
            },
          },
        ],
      },
      nvMidList: {
        rich_text: [
          {
            text: {
              content: nvMidList,
            },
          },
        ],
      },
      nowCount: {
        number: nowCount, // 숫자 값 직접 입력
      },
      dayCount: {
        number: dayCount, // 숫자 값 직접 입력
      },
      workKeywordList: {
        rich_text: [
          {
            text: {
              content: keywordString,
            },
          },
        ],
      },
      작업날짜: {
        date: {
          start: new Date().toISOString(),
        },
      },
    };
    {
      const inputDate = inputData["작업날짜"].date.start.split("T")[0];
      // 한국 시간 기준으로 시작과 끝 시간 설정
      const startTime = `${inputDate}T00:00:00+09:00`;
      const endTime = `${inputDate}T23:59:59+09:00`;

      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          and: [
            {
              property: "작업날짜",
              date: {
                on_or_after: startTime,
                on_or_before: endTime,
              },
            },
            { property: "groupFid", rich_text: { equals: data.groupFid } },
            {
              property: "nvMid",
              rich_text: { equals: data.nvMid },
            },
          ],
        },
      });

      if (response.results.length > 0) {
        // 기존 페이지 업데이트
        return await notion.pages.update({
          page_id: response.results[0].id,
          properties: inputData,
        });
      }
    }
    {
      const response = await notion.pages.create({
        parent: {
          database_id: DATABASE_ID,
        },
        properties: inputData,
      });
      console.log("Successfully added/");
      console.log("Generated pages ID:", response.id);
      return response;
    }
  } catch (error) {
    console.error("에러 발생:", error.body);
    throw error;
  }
}

// (async () => {
//   try {
//     const result = await apiPatchDayNowCountForShopping();
//     if (result) {
//       console.log("전체 응답:", result);
//     }
//   } catch (error) {
//     console.error("실행 중 오류 발생:", error);
//   }
// })();
