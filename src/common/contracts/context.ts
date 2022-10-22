export type ContextHandlers<ServiceResult> = {
  onSuccess?: (serviceResult: ServiceResult) => void;
  onError?: (error: { validations?: Record<string, string> }) => void;
};
