/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateFinancialGoal(\n    $createFinancialGoalInput: CreateFinancialGoalInput!\n  ) {\n    createFinancialGoal(createFinancialGoalInput: $createFinancialGoalInput) {\n      id\n      name\n      emoji\n      amount\n      months_to_reach_goal\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateFinancialGoalDocument,
    "\n  mutation UpdateFinancialGoal(\n    $updateFinancialGoalInput: UpdateFinancialGoalInput!\n  ) {\n    updateFinancialGoal(updateFinancialGoalInput: $updateFinancialGoalInput) {\n      id\n      name\n      emoji\n      amount\n      months_to_reach_goal\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateFinancialGoalDocument,
    "\n  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {\n    createTransaction(createTransactionInput: $createTransactionInput) {\n      id\n      amount\n      wallet_id\n      financial_goal_id\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateTransactionDocument,
    "\n  query User($userId: String!) {\n    user(id: $userId) {\n      id\n      email\n      username\n      phone\n      birth_year\n      experience\n      createdAt\n      updatedAt\n      wallet {\n        id\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal {\n            name\n          }\n        }\n      }\n      wallet_id\n      financial_goal {\n        id\n        userId\n        emoji\n        name\n        amount\n        months_to_reach_goal\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.UserDocument,
    "\n  query FinancialGoalsData($userId: String!) {\n    user(id: $userId) {\n      id\n      email\n      username\n      phone\n      birth_year\n      experience\n      createdAt\n      updatedAt\n      wallet {\n        id\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal_id\n          createdAt\n          updatedAt\n        }\n      }\n      wallet_id\n      financial_goal {\n        id\n        userId\n        emoji\n        name\n        amount\n        months_to_reach_goal\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal_id\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  }\n": types.FinancialGoalsDataDocument,
    "\n  mutation RemoveFinancialGoal($removeFinancialGoalId: String!) {\n    removeFinancialGoal(id: $removeFinancialGoalId) {\n      id\n      name\n    }\n  }\n": types.RemoveFinancialGoalDocument,
    "\n  mutation SigninUser($signinUserInput: SigninUserInput!) {\n    signinUser(signinUserInput: $signinUserInput) {\n      access_token\n    }\n  }\n": types.SigninUserDocument,
    "\n  mutation CreateOrUpdateUserInfo(\n    $createOrUpdateUserInfoInput: CreateOrUpdateUserInfoInput!\n  ) {\n    createOrUpdateUserInfo(\n      createOrUpdateUserInfoInput: $createOrUpdateUserInfoInput\n    ) {\n      userId\n      updatedAt\n    }\n  }\n": types.CreateOrUpdateUserInfoDocument,
    "\n  mutation SignupUser($signupUserInput: SignupUserInput!) {\n    signupUser(signupUserInput: $signupUserInput) {\n      access_token\n    }\n  }\n": types.SignupUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFinancialGoal(\n    $createFinancialGoalInput: CreateFinancialGoalInput!\n  ) {\n    createFinancialGoal(createFinancialGoalInput: $createFinancialGoalInput) {\n      id\n      name\n      emoji\n      amount\n      months_to_reach_goal\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFinancialGoal(\n    $createFinancialGoalInput: CreateFinancialGoalInput!\n  ) {\n    createFinancialGoal(createFinancialGoalInput: $createFinancialGoalInput) {\n      id\n      name\n      emoji\n      amount\n      months_to_reach_goal\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateFinancialGoal(\n    $updateFinancialGoalInput: UpdateFinancialGoalInput!\n  ) {\n    updateFinancialGoal(updateFinancialGoalInput: $updateFinancialGoalInput) {\n      id\n      name\n      emoji\n      amount\n      months_to_reach_goal\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateFinancialGoal(\n    $updateFinancialGoalInput: UpdateFinancialGoalInput!\n  ) {\n    updateFinancialGoal(updateFinancialGoalInput: $updateFinancialGoalInput) {\n      id\n      name\n      emoji\n      amount\n      months_to_reach_goal\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {\n    createTransaction(createTransactionInput: $createTransactionInput) {\n      id\n      amount\n      wallet_id\n      financial_goal_id\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {\n    createTransaction(createTransactionInput: $createTransactionInput) {\n      id\n      amount\n      wallet_id\n      financial_goal_id\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query User($userId: String!) {\n    user(id: $userId) {\n      id\n      email\n      username\n      phone\n      birth_year\n      experience\n      createdAt\n      updatedAt\n      wallet {\n        id\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal {\n            name\n          }\n        }\n      }\n      wallet_id\n      financial_goal {\n        id\n        userId\n        emoji\n        name\n        amount\n        months_to_reach_goal\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query User($userId: String!) {\n    user(id: $userId) {\n      id\n      email\n      username\n      phone\n      birth_year\n      experience\n      createdAt\n      updatedAt\n      wallet {\n        id\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal {\n            name\n          }\n        }\n      }\n      wallet_id\n      financial_goal {\n        id\n        userId\n        emoji\n        name\n        amount\n        months_to_reach_goal\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FinancialGoalsData($userId: String!) {\n    user(id: $userId) {\n      id\n      email\n      username\n      phone\n      birth_year\n      experience\n      createdAt\n      updatedAt\n      wallet {\n        id\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal_id\n          createdAt\n          updatedAt\n        }\n      }\n      wallet_id\n      financial_goal {\n        id\n        userId\n        emoji\n        name\n        amount\n        months_to_reach_goal\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal_id\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FinancialGoalsData($userId: String!) {\n    user(id: $userId) {\n      id\n      email\n      username\n      phone\n      birth_year\n      experience\n      createdAt\n      updatedAt\n      wallet {\n        id\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal_id\n          createdAt\n          updatedAt\n        }\n      }\n      wallet_id\n      financial_goal {\n        id\n        userId\n        emoji\n        name\n        amount\n        months_to_reach_goal\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal_id\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFinancialGoal($removeFinancialGoalId: String!) {\n    removeFinancialGoal(id: $removeFinancialGoalId) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveFinancialGoal($removeFinancialGoalId: String!) {\n    removeFinancialGoal(id: $removeFinancialGoalId) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SigninUser($signinUserInput: SigninUserInput!) {\n    signinUser(signinUserInput: $signinUserInput) {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation SigninUser($signinUserInput: SigninUserInput!) {\n    signinUser(signinUserInput: $signinUserInput) {\n      access_token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrUpdateUserInfo(\n    $createOrUpdateUserInfoInput: CreateOrUpdateUserInfoInput!\n  ) {\n    createOrUpdateUserInfo(\n      createOrUpdateUserInfoInput: $createOrUpdateUserInfoInput\n    ) {\n      userId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrUpdateUserInfo(\n    $createOrUpdateUserInfoInput: CreateOrUpdateUserInfoInput!\n  ) {\n    createOrUpdateUserInfo(\n      createOrUpdateUserInfoInput: $createOrUpdateUserInfoInput\n    ) {\n      userId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignupUser($signupUserInput: SignupUserInput!) {\n    signupUser(signupUserInput: $signupUserInput) {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation SignupUser($signupUserInput: SignupUserInput!) {\n    signupUser(signupUserInput: $signupUserInput) {\n      access_token\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;