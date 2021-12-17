import { FormSchema } from "src/app/shared/modules/dynamic-form/components/form/form.schema";

export const GROUP_FORM_SCHEMA: FormSchema = {
	controls: {
		"name": { type: "text", label: "Nom du groupe", required: true },
		"acronym": { type: "text", label: "Acronyme", required: true }
	},
	grid: [
		["name"],
		["acronym"]
	],
	type: "registration"
}