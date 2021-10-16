export type Statement = {
  Action: string;
  Effect: string;
  Resource: string;
};
type AuthPolicy = {
  principalId: string;
  policyDocument: {
    Version: Date;
    Statement: Statement[];
  };
  context: {
    platformRoles: string;
    userId: string;
  };
};
export default AuthPolicy;
