import { Client } from "@notionhq/client";

export const notion = new Client({
  auth:
    process.env.NOTION_TOKEN ??
    "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",
});

const DATABASE_ID = "183c7cf713ef80c8b58ccb428069afeb";

export async function apiPatchDayNowCount({
  data = {
    groupFid: "67909dda7e8fd003562bb4e4",
    keyword: "서울비뇨기과의원 구리",
    delayTime: 30,
    placeName: "서울비뇨기과의원 구리",
    placeNumber: "377282421",
    dayCount: 1000,
    dayNowCount: 11,
    subKeywordList: "서브키워드1, 서브키워드2, 서브키워드3",
  },
} = {}) {
  try {
    const {
      keyword,
      delayTime,
      placeName,
      placeNumber,
      groupFid,
      dayCount,
      dayNowCount,
      subKeywordList,
    } = data;

    const inputData = {
      keyword: {
        title: [
          {
            text: {
              content: keyword,
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
      placeName: {
        rich_text: [
          {
            text: {
              content: placeName,
            },
          },
        ],
      },
      placeNumber: {
        rich_text: [
          {
            text: {
              content: placeNumber,
            },
          },
        ],
      },
      dayNowCount: {
        number: dayNowCount, // 숫자 값 직접 입력
      },
      dayCount: {
        number: dayCount, // 숫자 값 직접 입력
      },
      subKeywordList: {
        rich_text: [
          {
            text: {
              content: subKeywordList,
            },
          },
        ],
      },
      작업날짜: {
        date: {
          start: new Date().toISOString().split("T")[0],
        },
      },
    };
    {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          and: [
            {
              property: "작업날짜",
              date: { equals: inputData["작업날짜"].date.start },
            },
            { property: "groupFid", rich_text: { equals: data.groupFid } },
            {
              property: "placeNumber",
              rich_text: { equals: data.placeNumber },
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

(async () => {
  try {
    const result = await apiPatchDayNowCount();
    if (result) {
      console.log("전체 응답:", result);
    }
  } catch (error) {
    console.error("실행 중 오류 발생:", error);
  }
})();
