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

export enum AccountType {
  Admin = 'ADMIN',
  User = 'USER'
}

export type AdminData = {
  __typename?: 'AdminData';
  newUsers: Array<DateData>;
  totalActiveUsers: Array<DateData>;
  totalUsers: Array<DateData>;
  totalUsersSavings: Array<DateData>;
  userAnnualIncomeStats: Array<NameData>;
  userLiabilitiesStats: Array<NameData>;
  userMonthlyExpenseStats: Array<NameData>;
};

export enum AnnualIncome {
  From10KTo25K = 'From10KTo25K',
  From25KTo50K = 'From25KTo50K',
  From50KTo100K = 'From50KTo100K',
  From100KTo200K = 'From100KTo200K',
  LessThan10K = 'LessThan10K',
  MoreThan200K = 'MoreThan200K'
}

export type ClaimedVoucher = {
  __typename?: 'ClaimedVoucher';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  voucherId: Scalars['String']['output'];
};

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

export type DateData = {
  __typename?: 'DateData';
  month: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
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
  claimReward: SuccessResult;
  claimVoucher: SuccessResult;
  createFinancialGoal: FinancialGoal;
  createOrUpdateUserInfo: UserInfo;
  createTransaction: Transaction;
  removeFinancialGoal: FinancialGoal;
  removeTransaction: Transaction;
  reportAction: SuccessResult;
  signinUser: Jwt;
  signupUser: Jwt;
  updateFinancialGoal: FinancialGoal;
  updateTransaction: Transaction;
  updateUser: User;
};


export type MutationClaimRewardArgs = {
  taskId: Scalars['String']['input'];
};


export type MutationClaimVoucherArgs = {
  voucherId: Scalars['String']['input'];
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


export type MutationReportActionArgs = {
  reportActionInput: ReportActionInput;
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

export type NameData = {
  __typename?: 'NameData';
  name: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type News = {
  __typename?: 'News';
  author?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  description: Scalars['String']['output'];
  publishedAt: Scalars['String']['output'];
  source: NewsSource;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  urlToImage?: Maybe<Scalars['String']['output']>;
};

export type NewsSource = {
  __typename?: 'NewsSource';
  id?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export enum NewsTopic {
  Company = 'COMPANY',
  FinanceLiteracy = 'FINANCE_LITERACY',
  Financial = 'FINANCIAL',
  Investment = 'INVESTMENT'
}

export type Query = {
  __typename?: 'Query';
  AdminData: AdminData;
  ClaimedVoucher: Array<ClaimedVoucher>;
  News: Array<News>;
  Task: Array<Task>;
  Transaction: Transaction;
  UserInfo: UserInfo;
  Voucher: Array<Voucher>;
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

export type ReportActionInput = {
  taskType: TaskType;
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

export type SuccessResult = {
  __typename?: 'SuccessResult';
  success: Scalars['Boolean']['output'];
};

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  points: Scalars['Int']['output'];
  requiredAmount: Scalars['Int']['output'];
  timing: TaskTiming;
  title: Scalars['String']['output'];
  type: TaskType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum TaskTiming {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Once = 'ONCE',
  Weekly = 'WEEKLY'
}

export enum TaskType {
  AchievingFinancialGoals = 'ACHIEVING_FINANCIAL_GOALS',
  ReadingArticles = 'READING_ARTICLES',
  SavingMoney = 'SAVING_MONEY'
}

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
  news_topics_followed: Array<NewsTopic>;
  /** Unhashed password of the user */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Phone number of the user */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Username of the user */
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  account_type: AccountType;
  birth_year: Scalars['Float']['output'];
  claimedVoucher: Array<ClaimedVoucher>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  experience: Scalars['Int']['output'];
  financial_goal: Array<FinancialGoal>;
  id: Scalars['String']['output'];
  level: Scalars['Int']['output'];
  news_topics_followed: Array<NewsTopic>;
  phone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user_completed_task: Array<UserCompletedTask>;
  user_info?: Maybe<UserInfo>;
  username: Scalars['String']['output'];
  wallet: Wallet;
  wallet_id: Scalars['String']['output'];
};

export type UserCompletedTask = {
  __typename?: 'UserCompletedTask';
  achieved: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  lastClaimed?: Maybe<Scalars['DateTime']['output']>;
  task: Task;
  taskId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
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

export type Voucher = {
  __typename?: 'Voucher';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  levelRequired: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  terms: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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

export type UpdateFinancialGoalMutationVariables = Exact<{
  updateFinancialGoalInput: UpdateFinancialGoalInput;
}>;


export type UpdateFinancialGoalMutation = { __typename?: 'Mutation', updateFinancialGoal: { __typename?: 'FinancialGoal', id: string, name: string, emoji: string, amount: number, months_to_reach_goal: number, createdAt: any, updatedAt: any } };

export type CreateTransactionMutationVariables = Exact<{
  createTransactionInput: CreateTransactionInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction: { __typename?: 'Transaction', id: string, amount: number, wallet_id: string, financial_goal_id: string, createdAt: any, updatedAt: any } };

export type RemoveTransactionMutationVariables = Exact<{
  removeTransactionId: Scalars['String']['input'];
}>;


export type RemoveTransactionMutation = { __typename?: 'Mutation', removeTransaction: { __typename?: 'Transaction', id: string } };

export type AdminUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type AdminUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, username: string, phone: string, birth_year: number, experience: number, createdAt: any, updatedAt: any, wallet_id: string, wallet: { __typename?: 'Wallet', id: string, createdAt: any, updatedAt: any, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, wallet_id: string, financial_goal: { __typename?: 'FinancialGoal', name: string } }> }, financial_goal: Array<{ __typename?: 'FinancialGoal', id: string, userId: string, emoji: string, name: string, amount: number, months_to_reach_goal: number, createdAt: any, updatedAt: any }> } };

export type FinancialGoalsDataQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type FinancialGoalsDataQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, username: string, phone: string, birth_year: number, experience: number, createdAt: any, updatedAt: any, wallet_id: string, wallet: { __typename?: 'Wallet', id: string, createdAt: any, updatedAt: any, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, wallet_id: string, financial_goal_id: string, createdAt: any, updatedAt: any }> }, financial_goal: Array<{ __typename?: 'FinancialGoal', id: string, userId: string, emoji: string, name: string, amount: number, months_to_reach_goal: number, createdAt: any, updatedAt: any, transactions?: Array<{ __typename?: 'Transaction', id: string, amount: number, wallet_id: string, financial_goal_id: string, createdAt: any, updatedAt: any }> | null }> } };

export type RemoveFinancialGoalMutationVariables = Exact<{
  removeFinancialGoalId: Scalars['String']['input'];
}>;


export type RemoveFinancialGoalMutation = { __typename?: 'Mutation', removeFinancialGoal: { __typename?: 'FinancialGoal', id: string, name: string } };

export type ReportTransactionAddedMutationVariables = Exact<{
  reportActionInput: ReportActionInput;
}>;


export type ReportTransactionAddedMutation = { __typename?: 'Mutation', reportAction: { __typename?: 'SuccessResult', success: boolean } };

export type UserGamificationInfoQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserGamificationInfoQuery = { __typename?: 'Query', user: { __typename?: 'User', level: number, experience: number, user_completed_task: Array<{ __typename?: 'UserCompletedTask', taskId: string, achieved: number, lastClaimed?: any | null }>, claimedVoucher: Array<{ __typename?: 'ClaimedVoucher', userId: string, voucherId: string, createdAt: any, updatedAt: any, code: string }> }, Task: Array<{ __typename?: 'Task', id: string, title: string, description: string, points: number, requiredAmount: number, createdAt: any, updatedAt: any, type: TaskType, timing: TaskTiming }> };

export type ClaimRewardMutationVariables = Exact<{
  taskId: Scalars['String']['input'];
}>;


export type ClaimRewardMutation = { __typename?: 'Mutation', claimReward: { __typename?: 'SuccessResult', success: boolean } };

export type VoucherQueryVariables = Exact<{ [key: string]: never; }>;


export type VoucherQuery = { __typename?: 'Query', Voucher: Array<{ __typename?: 'Voucher', id: string, imageUrl: string, name: string, levelRequired: number, terms: string, createdAt: any, updatedAt: any }> };

export type ClaimVoucherMutationVariables = Exact<{
  voucherId: Scalars['String']['input'];
}>;


export type ClaimVoucherMutation = { __typename?: 'Mutation', claimVoucher: { __typename?: 'SuccessResult', success: boolean } };

export type UserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, username: string, phone: string, birth_year: number, experience: number, createdAt: any, updatedAt: any, wallet_id: string, wallet: { __typename?: 'Wallet', id: string, createdAt: any, updatedAt: any, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, wallet_id: string, financial_goal: { __typename?: 'FinancialGoal', name: string } }> }, financial_goal: Array<{ __typename?: 'FinancialGoal', id: string, userId: string, emoji: string, name: string, amount: number, months_to_reach_goal: number, createdAt: any, updatedAt: any }>, user_info?: { __typename?: 'UserInfo', createdAt: any } | null } };

export type SigninUserMutationVariables = Exact<{
  signinUserInput: SigninUserInput;
}>;


export type SigninUserMutation = { __typename?: 'Mutation', signinUser: { __typename?: 'Jwt', access_token: string } };

export type UserNewsTopicFollowedQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserNewsTopicFollowedQuery = { __typename?: 'Query', user: { __typename?: 'User', news_topics_followed: Array<NewsTopic> } };

export type UpdateUserNewsTopicFollowedMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserNewsTopicFollowedMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', news_topics_followed: Array<NewsTopic> } };

export type UserNewsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserNewsQuery = { __typename?: 'Query', News: Array<{ __typename?: 'News', author?: string | null, title: string, description: string, url: string, urlToImage?: string | null, publishedAt: string, content: string, source: { __typename?: 'NewsSource', id?: string | null, name: string } }> };

export type ReportNewsClickedMutationVariables = Exact<{
  reportActionInput: ReportActionInput;
}>;


export type ReportNewsClickedMutation = { __typename?: 'Mutation', reportAction: { __typename?: 'SuccessResult', success: boolean } };

export type CreateOrUpdateUserInfoMutationVariables = Exact<{
  createOrUpdateUserInfoInput: CreateOrUpdateUserInfoInput;
}>;


export type CreateOrUpdateUserInfoMutation = { __typename?: 'Mutation', createOrUpdateUserInfo: { __typename?: 'UserInfo', userId: string, updatedAt: any } };

export type SignupUserMutationVariables = Exact<{
  signupUserInput: SignupUserInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'Jwt', access_token: string } };


export const CreateFinancialGoalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFinancialGoal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createFinancialGoalInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFinancialGoalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFinancialGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createFinancialGoalInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createFinancialGoalInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"months_to_reach_goal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateFinancialGoalMutation, CreateFinancialGoalMutationVariables>;
export const UpdateFinancialGoalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFinancialGoal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateFinancialGoalInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFinancialGoalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFinancialGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateFinancialGoalInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateFinancialGoalInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"months_to_reach_goal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateFinancialGoalMutation, UpdateFinancialGoalMutationVariables>;
export const CreateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTransactionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTransactionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTransactionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const RemoveTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeTransactionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeTransactionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveTransactionMutation, RemoveTransactionMutationVariables>;
export const AdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"birth_year"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"months_to_reach_goal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<AdminUserQuery, AdminUserQueryVariables>;
export const FinancialGoalsDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FinancialGoalsData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"birth_year"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"months_to_reach_goal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FinancialGoalsDataQuery, FinancialGoalsDataQueryVariables>;
export const RemoveFinancialGoalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFinancialGoal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeFinancialGoalId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFinancialGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeFinancialGoalId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveFinancialGoalMutation, RemoveFinancialGoalMutationVariables>;
export const ReportTransactionAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReportTransactionAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reportActionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReportActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reportAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reportActionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reportActionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ReportTransactionAddedMutation, ReportTransactionAddedMutationVariables>;
export const UserGamificationInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserGamificationInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"user_completed_task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"achieved"}},{"kind":"Field","name":{"kind":"Name","value":"lastClaimed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"claimedVoucher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"voucherId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"Task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"requiredAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timing"}}]}}]}}]} as unknown as DocumentNode<UserGamificationInfoQuery, UserGamificationInfoQueryVariables>;
export const ClaimRewardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClaimReward"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claimReward"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ClaimRewardMutation, ClaimRewardMutationVariables>;
export const VoucherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Voucher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Voucher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"levelRequired"}},{"kind":"Field","name":{"kind":"Name","value":"terms"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<VoucherQuery, VoucherQueryVariables>;
export const ClaimVoucherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClaimVoucher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"voucherId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claimVoucher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"voucherId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"voucherId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ClaimVoucherMutation, ClaimVoucherMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"birth_year"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"financial_goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"months_to_reach_goal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user_info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const SigninUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SigninUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signinUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SigninUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signinUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signinUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signinUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<SigninUserMutation, SigninUserMutationVariables>;
export const UserNewsTopicFollowedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserNewsTopicFollowed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"news_topics_followed"}}]}}]}}]} as unknown as DocumentNode<UserNewsTopicFollowedQuery, UserNewsTopicFollowedQueryVariables>;
export const UpdateUserNewsTopicFollowedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserNewsTopicFollowed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"news_topics_followed"}}]}}]}}]} as unknown as DocumentNode<UpdateUserNewsTopicFollowedMutation, UpdateUserNewsTopicFollowedMutationVariables>;
export const UserNewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserNews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"News"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"urlToImage"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<UserNewsQuery, UserNewsQueryVariables>;
export const ReportNewsClickedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReportNewsClicked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reportActionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReportActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reportAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reportActionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reportActionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ReportNewsClickedMutation, ReportNewsClickedMutationVariables>;
export const CreateOrUpdateUserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrUpdateUserInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOrUpdateUserInfoInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrUpdateUserInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrUpdateUserInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrUpdateUserInfoInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOrUpdateUserInfoInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateOrUpdateUserInfoMutation, CreateOrUpdateUserInfoMutationVariables>;
export const SignupUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signupUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signupUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<SignupUserMutation, SignupUserMutationVariables>;