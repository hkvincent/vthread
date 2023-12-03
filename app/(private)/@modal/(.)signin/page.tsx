import Form from "@/app/(public)/signin/form";
import Modal from "@/app/components/modal/Modal";


export default async function SignIn() {
    return (
        <Modal>
            <Form />
        </Modal>
    );
}