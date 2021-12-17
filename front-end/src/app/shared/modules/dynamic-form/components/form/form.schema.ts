import { FormBehaviorSchema } from "../../models/form-behavior-schema";
import { FormControlSchema } from "../../models/form-control.schema";

export interface FormSchema {
	controls: { [name: string]: FormControlSchema };
	grid: Array<Array<{ name: string | null, ratio: number } | string | null>>;
	type: "login" | "registration"
	framework?: "material" | "syncfusion"
	behaviors?: FormBehaviorSchema[]
}
