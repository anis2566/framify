import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<
    (typeof client.api.frames)[":id"]["$delete"]
>;
type ResponseType = InferResponseType<
    (typeof client.api.frames)[":id"]["$delete"]
>;

interface Props {
    onClose: () => void;
}

export const useDeleteFrame = ({ onClose }: Props) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const res = await client.api.frames[":id"]["$delete"]({
                param: { id: param.id },
            });
            return await res.json();
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message, { duration: 5000 });
                queryClient.invalidateQueries({ queryKey: ["frames"] });
                onClose();
            }

            if (!data.success) {
                toast.error(data.message, { duration: 5000 });
            }
        },
        onError: (error) => {
            toast.error(error.message, { duration: 5000 });
        },
    });

    return mutation;
};