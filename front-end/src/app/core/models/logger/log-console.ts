import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from 'rxjs';

import { LogEntry } from "./log-entry";
import { LogLevel } from "./log-level.enum";
import { LogPublisher } from "./log-publisher";

export class LogConsole implements LogPublisher {
	public location: string = "";

	constructor() {
	}

	public log(logEntry: LogEntry): Observable<boolean> {
		let message: Array<[string, string]> = [];
		const defaultCss = "color: #000";

		const formattedDate: string = logEntry.date.toLocaleDateString() + ' ' + logEntry.date.toLocaleTimeString() + ':' + zeroPad(logEntry.date.getMilliseconds(), 3);

		message.push([formattedDate + '\t', "color: #00A"]);

		const treeNode: string = logEntry.logLevel == LogLevel.TraceStart ? "┏━━" : logEntry.logLevel == LogLevel.TraceEnd ? "┗━━" : "┣━━";

		let nodeString: string = (logEntry.stack > 0 ? "┃\t".repeat(logEntry.stack - 1) + treeNode : "") + " ";

		message.push([nodeString, defaultCss]);

		switch (logEntry.logLevel) {
			case LogLevel.Verbose:
				message.push([" VERBOSE ", "color: #FFF; background: #666; border-radius: 3px"]);
				break;
			case LogLevel.TraceStart:
			case LogLevel.TraceEnd:
				message.push([" TRACE ", "color: #FFF; background: #0DD; border-radius: 3px"]);
				break;
			case LogLevel.Debug:
				message.push([" DEBUG ", "color: #FFF; background: #33D; border-radius: 3px"]);
				break;

			case LogLevel.Info:
				message.push([" INFO ", "color: #FFF; background: #0D0; border-radius: 3px"]);
				break;

			case LogLevel.Warn:
				message.push([" WARN ", "color: #FFF; background: #DD0; border-radius: 3px"]);
				break;

			case LogLevel.Error:
				message.push([" ERROR ", "color: #FFF; background: #D00; border-radius: 3px"]);
				break;
		}

		if (logEntry.class != undefined)
			message.push(["\t" + logEntry.class, "color: purple; font-weight: bolder;"]);

		if (logEntry.method != undefined) {
			if (logEntry.logLevel == LogLevel.TraceStart)
				message.push([" " + logEntry.method + "\t", "color: #0C0;"]);
			else if (logEntry.logLevel == LogLevel.TraceEnd)
				message.push([" " + logEntry.method + "\t", "color: #C00"]);
			else
				message.push([" " + logEntry.method + "\t", defaultCss]);
		}

		message.push([logEntry.message + "\t", defaultCss]);

		// if (logEntry.data != undefined) {
		// 	const data: string = stringify(logEntry.data);
		// 	//message.push([data?.length > 1 ? data.substring(0, 1) + "..." : data, "color:#22A"]);
		// 	message.push([data, "color:#22A"]);
		// }

		let formattedMessage: string = "";
		let css: Array<string> = [];

		for (let messagePart of message) {
			formattedMessage += "%c" + messagePart[0] + "%c";
			css.push(messagePart[1]);
			css.push(defaultCss);
		}

		if (logEntry.data != undefined)
			switch (logEntry.logLevel) {
				case LogLevel.Verbose:
				case LogLevel.TraceStart:
				case LogLevel.TraceEnd:
				case LogLevel.Debug: console.debug(formattedMessage, ...css, logEntry.data); break;

				case LogLevel.Info: console.info(formattedMessage, ...css, logEntry.data); break;
				case LogLevel.Warn: console.warn(formattedMessage, ...css, logEntry.data); break;
				case LogLevel.Error: console.error(formattedMessage, ...css, logEntry.data); break;
				default: console.log(formattedMessage, ...css, logEntry.data);
			}

		else
			switch (logEntry.logLevel) {
				case LogLevel.Verbose:
				case LogLevel.TraceStart:
				case LogLevel.TraceEnd:
				case LogLevel.Debug: console.debug(formattedMessage, ...css); break;

				case LogLevel.Info: console.info(formattedMessage, ...css); break;
				case LogLevel.Warn: console.warn(formattedMessage, ...css); break;
				case LogLevel.Error: console.error(formattedMessage, ...css); break;
				default: console.log(formattedMessage, ...css);
			}

		return of(true);
	}

	public clear(): Observable<boolean> {
		console.clear();
		return of(true);
	}
}

function zeroPad(num: number, length: number) {
	return String(num).padStart(length, '0');
}

function stringify(object: any, beautify: boolean = false): string {
	const getCircularReplacer = () => {
		const seen = new WeakSet();
		return (key: any, value: any) => {
			if (typeof value === "object" && value !== null) {
				if (seen.has(value)) {
					return;
				}
				seen.add(value);
			}
			return value;
		};
	};

	if (beautify == false)
		return JSON.stringify(object, getCircularReplacer());
	else
		return JSON.stringify(object, getCircularReplacer(), "\t");
}

