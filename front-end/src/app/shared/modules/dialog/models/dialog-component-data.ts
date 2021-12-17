import { ComponentType } from "@angular/cdk/portal";
import { ThemeColor } from "src/app/shared/shared-directives/theme-color.directive";

export interface DialogComponentData {
	componentType: ComponentType<any>;
	componentData: any;
	title: string | undefined;
	color: ThemeColor | undefined;
}