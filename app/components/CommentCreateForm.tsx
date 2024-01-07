'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Textarea, Button } from '@nextui-org/react';

interface CommentCreateFormProps {
    postId: string;
    parentId?: string;
    startOpen?: boolean;
}

export default function CommentCreateForm({
    postId,
    parentId,
    startOpen,
}: CommentCreateFormProps) {
    const [open, setOpen] = useState(startOpen);
    const ref = useRef<HTMLFormElement | null>(null);
    //   const [formState, action] = useFormState(
    //     actions.createComment.bind(null, { postId, parentId }),
    //     { errors: {} }
    //   );

    //   useEffect(() => {
    //     if (formState.success) {
    //       ref.current?.reset();

    //       if (!startOpen) {
    //         setOpen(false);
    //       }
    //     }
    //   }, [formState, startOpen]);

    const form = (
        <form ref={ref}>
            <div className="space-y-2 px-1">
                <Textarea
                    name="content"
                    label="Reply"
                    labelPlacement="inside"
                    placeholder="Enter your comment"

                />


                <FormButton>Create Comment</FormButton>
            </div>
        </form>
    );

    return (
        <div>
            <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
                Reply
            </Button>
            {open && form}
        </div>
    );
}
interface FormButtonProps {
    children: React.ReactNode;
}

function FormButton({ children }: FormButtonProps) {
    // const { pending } = useFormStatus();

    return (
        <Button type="submit" >
            {children}
        </Button>
    );
}
