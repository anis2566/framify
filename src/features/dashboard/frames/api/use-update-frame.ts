import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<
    (typeof client.api.frames)[":id"]["$put"]
>;
type ResponseType = InferResponseType<
    (typeof client.api.frames)[":id"]["$put"]
>;

export const useUpdateFrame = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json, param }) => {
            const res = await client.api.frames[":id"]["$put"]({
                json,
                param: { id: param.id },
            });
            return await res.json();
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message, {
                    duration: 5000,
                });
                queryClient.invalidateQueries({ queryKey: ["frames"] });
                router.push("/dashboard/frames");
            }

            if (!data.success) {
                toast.error(data.message, {
                    duration: 5000,
                });
            }
        },
        onError: (error) => {
            toast.error(error.message, {
                duration: 5000,
            });
        },
    });

    return mutation;
};