import { FormSchema } from "src/app/shared/modules/dynamic-form/components/form/form.schema";


export const USER_FORM_SCHEMA: FormSchema = {
    controls: {
        "firstName": { type: "text", label: "First Name", required: true },
        "lastName": { type: "text", label: "Last Name", required: true },
        "email": { type: "email", label: "Email", required: true },
        "password": { type: "password", label: "Password", required: true },
        "role": { type: "select", label: "Role", required: true },


    },
    grid: [
        ["firstName", "lastName"],
        ["email"],
        ["password"],
        ["role"],

    ],
    type: "registration"
}