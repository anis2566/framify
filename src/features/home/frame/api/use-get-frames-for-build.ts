import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.frames.build.$get>;

export const useGetFrames = () => {

    const query = useQuery<ResponseType>({
        queryKey: ["frames"],
        queryFn: async () => {
            const res = await client.api.frames.build.$get();
            const parseData = await res.json();
            return {
                frames: parseData.frames,
            };
        },
    });

    return query;
};