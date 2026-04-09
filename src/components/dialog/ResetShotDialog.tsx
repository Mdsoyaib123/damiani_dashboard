import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { User } from "@/types/user";

interface ResetShotDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User | null;
    onConfirm: (userId: string | number) => void;
    isLoading: boolean;
}

export function ResetShotDialog({
    open,
    onOpenChange,
    user,
    onConfirm,
    isLoading,
}: ResetShotDialogProps) {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-red-600">
                        Reset Assigned Products/Shot
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to reset all admin-assigned products/shots for user <strong>{user.userId}</strong>?
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-md border border-red-100">
                        <p>
                            <strong>Phone:</strong> {user.phoneNumber}
                        </p>
                        <p>
                            <strong>Assigned Products:</strong>{" "}
                            {user.adminAssaignProductsOrRewards?.length || 0}
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => onConfirm(user.userId)}
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Reset Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
