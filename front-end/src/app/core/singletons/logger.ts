import { Inject, Injectable } from '@angular/core';

import { LogConsole } from '../models/logger/log-console';
import { LogEntry } from '../models/logger/log-entry';
import { LogLevel } from '../models/logger/log-level.enum';
import { LogPublisher } from '../models/logger/log-publisher';

import * as logPublisherConfig from "src/assets/config/log-publisher.json";
import { LogPublisherConfig } from '../models/logger/log-publisher-config';

export class Logger {
	private _logLevel: LogLevel = LogLevel.All;
	private logPublishers: LogPublisher[] = [];
	private currentStack: number = 0;
	private static _instance: Logger;

	public get logLevel() {
		return this._logLevel;
	}

	public static getInstance(): Logger {
		if (Logger._instance == undefined) {
			Logger._instance = new Logger();
		}

		return Logger._instance;
	}

	private constructor() {
		this.logPublishers = this.buildLogPublishers();
	}

	public verbose(message: string, data: any = undefined): void {
		const logEntry: LogEntry = this.generateLogEntry(LogLevel.Verbose, message, data);
		this.writeLog(logEntry);
	}

	public debug(message: string, data: any = undefined): void {
		const logEntry: LogEntry = this.generateLogEntry(LogLevel.Debug, message, data);
		this.writeLog(logEntry);
	}

	public info(message: string, data: any = undefined): void {
		const logEntry: LogEntry = this.generateLogEntry(LogLevel.Info, message, data);
		this.writeLog(logEntry);
	}

	public warn(message: string, data: any = undefined): void {
		const logEntry: LogEntry = this.generateLogEntry(LogLevel.Warn, message, data);
		this.writeLog(logEntry);
	}

	public error(message: string, data: any = undefined): void {
		const logEntry: LogEntry = this.generateLogEntry(LogLevel.Error, message, data);
		this.writeLog(logEntry);
	}

	public traceStart(message: string, data: any = undefined, className: string, methodName: string): void {
		const logEntry: LogEntry = this.generateLogEntry(LogLevel.TraceStart, message, data);
		logEntry.class = className;
		logEntry.method = methodName;
		this.writeLog(logEntry);
	}

	public traceEnd(message: string, data: any = undefined, className: string, methodName: string): void {
		const logEntry: LogEntry = this.generateLogEntry(LogLevel.TraceEnd, message, data);
		logEntry.class = className;
		logEntry.method = methodName;
		this.writeLog(logEntry);
	}

	public clear() {
		this.logPublishers.forEach(logPublisher => {
			logPublisher.clear().subscribe();
		});
	}

	private buildLogPublishers(): LogPublisher[] {
		let logPublishers: LogPublisher[] = [];
		let logPublisher: LogPublisher;

		((logPublisherConfig as any).default as LogPublisherConfig[]).filter(config => config.isActive).forEach(config => {
			switch (config.loggerName.toLowerCase()) {
				case "console":
					logPublisher = new LogConsole();
					break;
			}

			logPublisher.location = config.loggerLocation;
			logPublishers.push(logPublisher);
		});

		return logPublishers;
	}

	private writeLog(logEntry: LogEntry): void {
		if (this.shouldLog(logEntry) == false)
			return;

		this.logPublishers.forEach(logPublisher => {
			logPublisher.log(logEntry).subscribe();
		});
	}

	private shouldLog(logEntry: LogEntry): boolean {
		return this.logLevel <= logEntry.logLevel && this.logLevel != LogLevel.Off;
	}

	private generateLogEntry(logLevel: LogLevel, message: string, data: any) {
		if (logLevel != LogLevel.TraceStart && logLevel != LogLevel.TraceEnd) {
			let error: Error = new Error();
			let className: string = "";
			let methodName: string = "";

			if (error.stack != undefined && error.stack.split("at ").length > 1) {
				let stack: string[] = (error.stack?.split('at ')[3].split(' ')[0] || ".").split(".");
				className = stack[0];
				methodName = stack[1];
			}

			const logEntry: LogEntry = { date: new Date(), class: className, method: methodName, logLevel: logLevel, message: message, data: data, stack: this.currentStack };
			return logEntry
		} else {
			if (logLevel == LogLevel.TraceStart)
				return { date: new Date(), class: '', method: '', logLevel: logLevel, message: message, data: data, stack: ++this.currentStack };
			else
				return { date: new Date(), class: '', method: '', logLevel: logLevel, message: message, data: data, stack: this.currentStack-- };
		}
	}

}
