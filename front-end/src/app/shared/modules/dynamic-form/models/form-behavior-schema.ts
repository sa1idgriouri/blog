export interface FormBehaviorSchema {
    type: "instruction" | "visibility" | "enability" | "validation";
    triggers: string[];

    // instruction
    instruction?: string;

    // Visiblity
    controls?: string[];
    condition?: string;
    errorMessage?: string;

}