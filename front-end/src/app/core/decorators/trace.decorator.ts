import { LogLevel } from "../models/logger/log-level.enum";
import { Logger } from "../singletons/logger";

export function Trace() {

    return (target: any, name?: string, descriptor?: any) => {

        const logger: Logger = Logger.getInstance();

        if (descriptor) {

            let original = descriptor.value;

            descriptor.value = function (...args: any[]) {
                if (logger.logLevel <= LogLevel.TraceStart)
                    logger.traceStart('', args.length > 0 ? args : undefined, target.name, name || '???');

                const startedAt = performance.now();
                let ret = original.apply(this, args);
                const endedAt = performance.now()

                if (logger.logLevel <= LogLevel.TraceEnd)
                    logger.traceEnd('+' + (endedAt - startedAt).toFixed(0) + 'ms', ret, target.name, name || '???');

                return ret;
            }

            return descriptor;

        } else {

            // decorating a class

            // add tracing capability to all own methods
            // TO-DO doesn't work for constructor...

            Object.getOwnPropertyNames(target.prototype).forEach((methodName: string) => {

                let original = target.prototype[methodName];

                if (typeof original !== "function" || methodName === "constructor") {
                    return;
                }

                // an arrow function can't be used while we have to preserve right 'this'
                target.prototype[methodName] = function (...args: any[]) {
                    if (logger.logLevel <= LogLevel.TraceStart)
                        logger.traceStart('', args.length > 0 ? args : undefined, target.name, methodName);

                    const startedAt = performance.now();
                    let ret = original.apply(this, args);
                    const endedAt = performance.now()

                    if (logger.logLevel <= LogLevel.TraceEnd)
                        logger.traceEnd('+' + (endedAt - startedAt).toFixed(0) + 'ms', ret, target.name, methodName);

                    return ret;
                };
            });

            return target;
        }
    };
}