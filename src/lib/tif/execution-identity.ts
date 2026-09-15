import {
  TIF_EXECUTION_ENVIRONMENTS,
  TIF_EXECUTION_SOURCES,
  TIF_EXECUTION_WORKLOADS,
  type TifExecutionEnvironment,
  type TifExecutionIdentity,
  type TifExecutionSource,
  type TifExecutionWorkload,
} from "./contract";

export const TIF_EXECUTION_IDENTITY_HEADERS = {
  workload: "x-ai-workload",
  environment: "x-ai-environment",
  executionSource: "x-ai-execution-source",
} as const;

type HeaderReader = Pick<Headers, "get">;

function controlledValue<T extends string>(
  value: string | null,
  allowed: readonly T[],
  label: string,
): T {
  if (!value || !allowed.includes(value as T)) {
    throw new Error(`Invalid TIF execution identity: ${label}`);
  }

  return value as T;
}

/**
 * Parses the bounded, operational identity declared by the authenticated caller.
 * Content, prompts, credentials, and arbitrary labels are deliberately not accepted.
 */
export function parseTifExecutionIdentity(headers: HeaderReader): TifExecutionIdentity {
  const workload = controlledValue(
    headers.get(TIF_EXECUTION_IDENTITY_HEADERS.workload),
    TIF_EXECUTION_WORKLOADS,
    "workload",
  ) as TifExecutionWorkload;
  const environment = controlledValue(
    headers.get(TIF_EXECUTION_IDENTITY_HEADERS.environment),
    TIF_EXECUTION_ENVIRONMENTS,
    "environment",
  ) as TifExecutionEnvironment;
  const executionSource = controlledValue(
    headers.get(TIF_EXECUTION_IDENTITY_HEADERS.executionSource),
    TIF_EXECUTION_SOURCES,
    "execution source",
  ) as TifExecutionSource;

  // The frozen value is the one echoed by the response and passed into execution;
  // subsequent code cannot mutate the accepted attribution mid-run.
  return Object.freeze({ workload, environment, executionSource });
}
