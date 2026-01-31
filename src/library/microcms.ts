import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

const client = createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: import.meta.env.MICROCMS_API_KEY,
});

export type Work = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    thumbnail: {
        url: string;
        height: number;
        width: number;
    };
    description: string;
    tags?: string;
    url?: string;
    github?: string;
};

export type WorksResponse = {
    totalCount: number;
    offset: number;
    limit: number;
    contents: Work[];
};

export const getWorks = async (queries?: MicroCMSQueries) => {
    return await client.get<WorksResponse>({ endpoint: "works", queries });
};

export const getWorkDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    return await client.getListDetail<Work>({
        endpoint: "works",
        contentId,
        queries,
    });
};
