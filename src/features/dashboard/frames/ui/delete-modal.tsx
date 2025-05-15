"use client"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { LoadingButton } from "@/components/loading-button";
import { useFrameDelete } from "@/hooks/use-frame";
import { useDeleteFrame } from "../api/use-delete-frame";

export const DeleteFrameModal = () => {
    const { isOpen, frameId, onClose } = useFrameDelete();

    const { mutate, isPending } = useDeleteFrame({ onClose })

    const handleDelete = () => {
        mutate({ param: { id: frameId } });
    }

    return (
        <AlertDialog open={isOpen && !!frameId} onOpenChange={isPending ? () => { } : onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your frame
                        and remove your data from servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <LoadingButton
                        isLoading={isPending}
                        title="Delete"
                        loadingTitle="Deleting..."
                        onClick={handleDelete}
                        variant="destructive"
                        type="button"
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}