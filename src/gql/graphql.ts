/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export enum AnnualIncome {
  From10KTo25K = 'From10KTo25K',
  From25KTo50K = 'From25KTo50K',
  From50KTo100K = 'From50KTo100K',
  From100KTo200K = 'From100KTo200K',
  LessThan10K = 'LessThan10K',
  MoreThan200K = 'MoreThan200K'
}

export type CreateFinancialGoalInput = {
  /** Amount of the financial goal */
  amount: Scalars['Int']['input'];
  /** Emoji of the financial goal */
  emoji: Scalars['String']['input'];
  /** Targeted months to reach the financial goal */
  months_to_reach_goal: Scalars['Int']['input'];
  /** Name of the financial goal */
  name: Scalars['String']['input'];
};

export type CreateOrUpdateUserInfoInput = {
  /** Annual income of the user */
  annual_income: AnnualIncome;
  /** Estimated liabilities of the user */
  estimated_liabilities: EstimatedLiabilities;
  /** Estimated monthly expenses of the user */
  estimated_monthly_expenses: EstimatedMonthlyExpenses;
  /** Expected annual return of the user */
  expected_annual_return: ExpectedAnnualReturn;
  /** Whether the user has invested before */
  invested_before: Scalars['Boolean']['input'];
  /** Investment horizon of the user */
  investment_horizon: InvestmentHorizon;
  /** Risk tolerance of the user */
  risk_tolerance: RiskTolerance;
  /** User ID of the user info to be created or updated */
  user_id: Scalars['String']['input'];
};

export type CreateTransactionInput = {
  amount: Scalars['Int']['input'];
  financial_goal_id: Scalars['String']['input'];
  wallet_id: Scalars['String']['input'];
};

export enum EstimatedLiabilities {
  From10KTo25K = 'From10KTo25K',
  From25KTo50K = 'From25KTo50K',
  From50KTo100K = 'From50KTo100K',
  From100KTo200K = 'From100KTo200K',
  LessThan10K = 'LessThan10K',
  MoreThan200K = 'MoreThan200K'
}

export enum EstimatedMonthlyExpenses {
  From1KTo2K = 'From1KTo2K',
  From2KTo3K = 'From2KTo3K',
  From3KTo4K = 'From3KTo4K',
  From4KTo5K = 'From4KTo5K',
  LessThan1K = 'LessThan1K',
  MoreThan5K = 'MoreThan5K'
}

export enum ExpectedAnnualReturn {
  From5To10Percent = 'From5To10Percent',
  From10To15Percent = 'From10To15Percent',
  LessThan5Percent = 'LessThan5Percent',
  MoreThan15Percent = 'MoreThan15Percent'
}

export type FinancialGoal = {
  __typename?: 'FinancialGoal';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  emoji: Scalars['String']['output'];
  id: Scalars['String']['output'];
  months_to_reach_goal: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  transactions?: Maybe<Array<Transaction>>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export enum InvestmentHorizon {
  From1To3Years = 'From1To3Years',
  From3To5Years = 'From3To5Years',
  LessThan1Year = 'LessThan1Year',
  MoreThan5Years = 'MoreThan5Years'
}

export type Jwt = {
  __typename?: 'Jwt';
  access_token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFinancialGoal: FinancialGoal;
  createOrUpdateUserInfo: UserInfo;
  createTransaction: Transaction;
  removeFinancialGoal: FinancialGoal;
  removeTransaction: Transaction;
  signinUser: Jwt;
  signupUser: Jwt;
  updateFinancialGoal: FinancialGoal;
  updateTransaction: Transaction;
  updateUser: User;
};


export type MutationCreateFinancialGoalArgs = {
  createFinancialGoalInput: CreateFinancialGoalInput;
};


export type MutationCreateOrUpdateUserInfoArgs = {
  createOrUpdateUserInfoInput: CreateOrUpdateUserInfoInput;
};


export type MutationCreateTransactionArgs = {
  createTransactionInput: CreateTransactionInput;
};


export type MutationRemoveFinancialGoalArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveTransactionArgs = {
  id: Scalars['String']['input'];
};


export type MutationSigninUserArgs = {
  signinUserInput: SigninUserInput;
};


export type MutationSignupUserArgs = {
  signupUserInput: SignupUserInput;
};


export type MutationUpdateFinancialGoalArgs = {
  updateFinancialGoalInput: UpdateFinancialGoalInput;
};


export type MutationUpdateTransactionArgs = {
  updateTransactionInput: UpdateTransactionInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  Transaction: Transaction;
  UserInfo: UserInfo;
  Wallet: Wallet;
  financialGoal: FinancialGoal;
  user: User;
};


export type QueryTransactionArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserInfoArgs = {
  userId: Scalars['String']['input'];
};


export type QueryWalletArgs = {
  id: Scalars['String']['input'];
};


export type QueryFinancialGoalArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export enum RiskTolerance {
  High = 'High',
  Low = 'Low',
  Medium = 'Medium'
}

export type SigninUserInput = {
  /** Email of the user */
  email: Scalars['String']['input'];
  /** Unhashed password of the user */
  password: Scalars['String']['input'];
};

export type SignupUserInput = {
  /** Birth year of the user */
  birth_year: Scalars['Int']['input'];
  /** Email of the user */
  email: Scalars['String']['input'];
  /** Unhashed password of the user */
  password: Scalars['String']['input'];
  /** Phone number of the user */
  phone: Scalars['String']['input'];
  /** Username of the user */
  username: Scalars['String']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  financial_goal: FinancialGoal;
  financial_goal_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wallet: Wallet;
  wallet_id: Scalars['String']['output'];
};

export type UpdateFinancialGoalInput = {
  /** Amount of the financial goal */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** Emoji of the financial goal */
  emoji?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  /** Targeted months to reach the financial goal */
  months_to_reach_goal?: InputMaybe<Scalars['Int']['input']>;
  /** Name of the financial goal */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTransactionInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  financial_goal_id?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  wallet_id?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  /** Birth year of the user */
  birth_year?: InputMaybe<Scalars['Int']['input']>;
  /** Email of the user */
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  /** Unhashed password of the user */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Phone number of the user */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Username of the user */
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  birth_year: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  experience: Scalars['Int']['output'];
  financial_goal: Array<FinancialGoal>;
  id: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  wallet: Wallet;
  wallet_id: Scalars['String']['output'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  annual_income: AnnualIncome;
  createdAt: Scalars['DateTime']['output'];
  estimated_liabilities: EstimatedLiabilities;
  estimated_monthly_expenses: EstimatedMonthlyExpenses;
  expected_annual_return: ExpectedAnnualReturn;
  invested_before: Scalars['Boolean']['output'];
  investment_horizon: InvestmentHorizon;
  risk_tolerance: RiskTolerance;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type Wallet = {
  __typename?: 'Wallet';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  transactions: Array<Transaction>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateFinancialGoalMutationVariables = Exact<{
  createFinancialGoalInput: CreateFinancialGoalInput;
}>;


export type CreateFinancialGoalMutation = { __typename?: 'Mutation', createFinancialGoal: { __typename?: 'FinancialGoal', id: string, name: string, emoji: string, amount: number, months_to_reach_goal: number, createdAt: any, updatedAt: any } };

export type CreateTransactionMutationVariables = Exact<{
  createTransactionInput: CreateTransactionInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction: { __typename?: 'Transaction', id: string, amount: number, wallet_id: string, financial_goal_id: string, createdAt: any, updatedAt: any } };

export type UserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, username: string, phone: string, birth_year: number, experience: number, createdAt: any, updatedAt: any, wallet_id: string, wallet: { __typename?: 'Wallet', id: string, createdAt: any, updatedAt: any, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, wallet_id: string, financial_goal: { __typename?: 'FinancialGoal', name: string } }> }, financial_goal: Array<{ __typename?: 'FinancialGoal', id: string, userId: string, emoji: string, name: string, amount: number, months_to_reach_goal: number, createdAt: any, updatedAt: any }> } };

export type FinancialGoalsDataQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type FinancialGoalsDataQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, username: string, phone: string, birth_year: number, experience: number, createdAt: any, updatedAt: any, wallet_id: string, wallet: { __typename?: 'Wallet', id: string, createdAt: any, updatedAt: any, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, wallet_id: string, financial_goal_id: string, createdAt: any, updatedAt: any }> }, financial_goal: Array<{ __typename?: 'FinancialGoal', id: string, userId: string, emoji: string, name: string, amount: number, months_to_reach_goal: number, createdAt: any, updatedAt: any, transactions?: Array<{ __typename?: 'Transaction', id: string, amount: number, wallet_id: string, financial_goal_id: string, createdAt: any, updatedAt: any }> | null }> } };

export type SigninUserMutationVariables = Exact<{
  signinUserInput: SigninUserInput;
}>;


export type SigninUserMutation = { __typename?: 'Mutation', signinUser: { __typename?: 'Jwt', access_token: string } };

export type CreateOrUpdateUserInfoMutationVariables = Exact<{
  createOrUpdateUserInfoInput: CreateOrUpdateUserInfoInput;
}>;


export type CreateOrUpdateUserInfoMutation = { __typename?: 'Mutation', createOrUpdateUserInfo: { __typename?: 'UserInfo', userId: string, updatedAt: any } };

export type SignupUserMutationVariables = Exact<{
  signupUserInput: SignupUserInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'Jwt', access_token: string } };


export const CreateFinancialGoalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFinancialGoal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createFinancialGoalInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFinancialGoalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFinancialGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createFinancialGoalInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createFinancialGoalInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"months_to_reach_goal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateFinancialGoalMutation, CreateFinancialGoalMutationVariables>;
export const CreateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTransactionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTransactionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTransactionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"birth_year"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"months_to_reach_goal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const FinancialGoalsDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FinancialGoalsData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"birth_year"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"months_to_reach_goal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FinancialGoalsDataQuery, FinancialGoalsDataQueryVariables>;
export const SigninUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SigninUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signinUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SigninUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signinUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signinUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signinUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<SigninUserMutation, SigninUserMutationVariables>;
export const CreateOrUpdateUserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrUpdateUserInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOrUpdateUserInfoInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrUpdateUserInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrUpdateUserInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrUpdateUserInfoInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOrUpdateUserInfoInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateOrUpdateUserInfoMutation, CreateOrUpdateUserInfoMutationVariables>;
export const SignupUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signupUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signupUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<SignupUserMutation, SignupUserMutationVariables>;