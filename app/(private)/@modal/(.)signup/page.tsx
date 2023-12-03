import Form from "@/app/(public)/signup/form";
import Modal from "@/app/components/modal/Modal";


export default async function SignUp() {
    return (
        <Modal>
            <Form />
        </Modal>
    );
}