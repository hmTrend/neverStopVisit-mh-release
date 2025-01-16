import { Client } from "@notionhq/client";

export const notion = new Client({
  auth:
    process.env.NOTION_TOKEN ??
    "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",
});

const getUsers = async () => {
  try {
    const listUsersResponse = await notion.users.list({});
    return listUsersResponse; // 결과 반환 추가
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// (async () => {
//   const result = await getUsers();
//   console.log(result);
// })();

/**
 *   {
 *       object: 'user',
 *       id: 'dea330e8-43ab-4be2-ba77-81f22b4f29e2',
 *       name: 'log.neverStopVisit',
 *       avatar_url: null,
 *       type: 'bot',
 *       bot: [Object]
 *     }
 * **/
