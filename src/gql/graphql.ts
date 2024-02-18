/* eslint-disable */
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

export type CreateFinancialGoalInput = {
  /** Amount of the financial goal */
  amount: Scalars['Int']['input'];
  /** Emoji of the financial goal */
  emoji: Scalars['String']['input'];
  /** Target monthly contribution of the financial goal */
  monthly_contribution_goal: Scalars['Int']['input'];
  /** Name of the financial goal */
  name: Scalars['String']['input'];
};

export type FinancialGoal = {
  __typename?: 'FinancialGoal';
  amount: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  emoji: Scalars['String']['output'];
  id: Scalars['String']['output'];
  monthly_contribution_goal: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFinancialGoal: FinancialGoal;
  removeFinancialGoal: FinancialGoal;
  removeUser: User;
  signupUser: User;
  updateFinancialGoal: FinancialGoal;
  updateUser: User;
};


export type MutationCreateFinancialGoalArgs = {
  createFinancialGoalInput: CreateFinancialGoalInput;
};


export type MutationRemoveFinancialGoalArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignupUserArgs = {
  signupUserInput: SignupUserInput;
};


export type MutationUpdateFinancialGoalArgs = {
  updateFinancialGoalInput: UpdateFinancialGoalInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  financialGoal: FinancialGoal;
  user: User;
};


export type QueryFinancialGoalArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
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

export type UpdateFinancialGoalInput = {
  /** Amount of the financial goal */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** Emoji of the financial goal */
  emoji?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  /** Target monthly contribution of the financial goal */
  monthly_contribution_goal?: InputMaybe<Scalars['Int']['input']>;
  /** Name of the financial goal */
  name?: InputMaybe<Scalars['String']['input']>;
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
  email: Scalars['String']['output'];
  experience: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  username: Scalars['String']['output'];
};
