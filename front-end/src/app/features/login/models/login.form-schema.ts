import { FormSchema } from "src/app/shared/modules/dynamic-form/components/form/form.schema";

export const LOGIN_FORM_SCHEMA: FormSchema = {
    controls: {
        "username": { type: 'text', label: "Nom d'utilisateur", required: true },
        "password": { type: 'password', label: "Mot de passe", required: true },
        "login": { type: "submit", label: "Se connecter" }
    },
    type: 'login',
    grid: [
        ["username"],
        ["password"],
        ["login"]
    ]
};

