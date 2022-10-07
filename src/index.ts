import type { CallSite } from 'source-map-support';
import { install, wrapCallSite } from 'source-map-support';

install();

const INTERNAL_CALLSITES_SHIFT = 2;
const NATIVE_PREPARE_STACK_TRACE = Error.prepareStackTrace;
const OVERRIDED_PREPARE_STACK_TRACE = (
  err: Error,
  callsites: NodeJS.CallSite[],
): NodeJS.CallSite[] => callsites;

export class Callsite {
  static DEFAULT_CALLSITES_COUNT = 1;

  readonly source?: string;
  readonly line?: number;
  readonly column?: number;

  readonly typeName?: string;
  readonly functionName?: string;

  protected constructor(nodeCallsite: NodeJS.CallSite) {
    this.source = nodeCallsite.getFileName() ?? undefined;
    this.line = nodeCallsite.getLineNumber() ?? undefined;
    this.column = nodeCallsite.getColumnNumber() ?? undefined;

    this.typeName = nodeCallsite.getTypeName() ?? undefined;
    this.functionName = nodeCallsite.getMethodName() ?? nodeCallsite.getFunctionName() ?? undefined;
  }

  /**
   * Get callsites
   */
  static get(depth: number = 0, count: number = this.DEFAULT_CALLSITES_COUNT): Callsite[] {
    const nodeCallsites = this._getNodeCallsites(depth + count);
    const callsites = nodeCallsites.slice(depth).map((cs) => new Callsite(cs));

    return callsites;
  }

  protected static _getNodeCallsites(limit: number): NodeJS.CallSite[] {
    const prevStackTraceLimit = Error.stackTraceLimit;

    Error.stackTraceLimit = INTERNAL_CALLSITES_SHIFT + limit;
    Error.prepareStackTrace = OVERRIDED_PREPARE_STACK_TRACE;

    const nodeCallsites = new Error().stack as unknown as NodeJS.CallSite[];

    Error.prepareStackTrace = NATIVE_PREPARE_STACK_TRACE;
    Error.stackTraceLimit = prevStackTraceLimit;

    return nodeCallsites.slice(INTERNAL_CALLSITES_SHIFT).map((cs) => wrapCallSite(cs as CallSite));
  }
}
