// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
me: IUser | null;
}

interface IUser {
__typename: "User";
id: string;
email: string;
}

interface IMutation {
__typename: "Mutation";
sendForgotPasswordEmail: boolean | null;
forgotPasswordChange: Array<IError>;
login: ILoginResponse;
logout: boolean | null;
register: Array<IError>;
}

interface ISendForgotPasswordEmailOnMutationArguments {
email: string;
}

interface IForgotPasswordChangeOnMutationArguments {
newPassword: string;
key: string;
}

interface ILoginOnMutationArguments {
email: string;
password: string;
}

interface IRegisterOnMutationArguments {
email: string;
password: string;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}

interface ILoginResponse {
__typename: "LoginResponse";
errors: Array<IError>;
sessionId: string | null;
}
}

// tslint:enable
