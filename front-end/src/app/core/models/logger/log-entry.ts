import { LogLevel } from "./log-level.enum";

export interface LogEntry {
    date: Date;
    class: string;
    method: string;
    logLevel: LogLevel;
    message: string;
    data: any;
    stack: number;
}
