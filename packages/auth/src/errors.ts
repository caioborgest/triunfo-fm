export class AuthenticationRequiredError extends Error {
  readonly code = "AUTHENTICATION_REQUIRED";
  readonly status = 401;

  constructor() {
    super("Autenticação necessária.");
    this.name = "AuthenticationRequiredError";
  }
}

export class PermissionDeniedError extends Error {
  readonly code = "PERMISSION_DENIED";
  readonly status = 403;

  constructor(readonly permission: string) {
    super("Você não tem permissão para executar esta ação.");
    this.name = "PermissionDeniedError";
  }
}

export class InvalidPermissionError extends Error {
  readonly code = "INVALID_PERMISSION";

  constructor(readonly permission: string) {
    super(
      "Permissão inválida. Use resource.action ou resource.action:SCOPE.",
    );
    this.name = "InvalidPermissionError";
  }
}
