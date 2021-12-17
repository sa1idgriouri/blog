import { Observable } from "rxjs";
import { LogEntry } from "./log-entry";

export interface LogPublisher {
    location: string;
    log(logEntry: LogEntry): Observable<boolean>;
    clear(): Observable<boolean>;
}
