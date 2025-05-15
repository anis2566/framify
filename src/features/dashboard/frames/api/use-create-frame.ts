import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.frames.$post>;
type RequestType = InferRequestType<typeof client.api.frames.$post>["json"];

export const useCreateFrame = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const res = await client.api.frames.$post({ json });
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