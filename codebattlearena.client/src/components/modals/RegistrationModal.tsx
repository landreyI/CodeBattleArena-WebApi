import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { handleGoogleLogin } from "@/services/google";



interface Props {
    open: boolean;
    onClose: () => void;
}

export function RegistrationModal({ open, onClose }: Props) {
    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white border border-zinc-700">
                <DialogHeader>
                    <DialogTitle className="text-white text-center">Join Us</DialogTitle>
                </DialogHeader>

                <div className="mt-4 text-center">
                    <Button
                        variant="outline"
                        onClick={handleGoogleLogin}
                        className="bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-500 hover:border-zinc-400"
                    >
                        <img
                            src="https://developers.google.com/identity/images/g-logo.png"
                            alt="Google"
                            className="w-6 h-6 rounded-full bg-white p-1"
                        />
                        <span>Sign in with Google</span>
                    </Button>

                </div>

                <DialogFooter className="mt-4 text-center">
                    <p className="text-sm text-zinc-400">
                        By signing in, you agree to our <span className="underline cursor-pointer">Terms</span>.
                    </p>
                    <DialogDescription className="text-zinc-400 font-mono"></DialogDescription>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default RegistrationModal;
