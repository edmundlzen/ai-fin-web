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
    "\n  mutation RemoveTransaction($removeTransactionId: String!) {\n    removeTransaction(id: $removeTransactionId) {\n      id\n    }\n  }\n": types.RemoveTransactionDocument,
    "\n  query AdminData {\n    adminData {\n      totalUsersSavings {\n        month\n        year\n        value\n      }\n      totalActiveUsers {\n        month\n        year\n        value\n      }\n      totalUsers {\n        month\n        year\n        value\n      }\n      newUsers {\n        month\n        year\n        value\n      }\n      userAnnualIncomeStats {\n        name\n        value\n      }\n      userLiabilitiesStats {\n        name\n        value\n      }\n      userMonthlyExpenseStats {\n        name\n        value\n      }\n    }\n  }\n": types.AdminDataDocument,
    "\n  query AiStrategy {\n    aiStrategy {\n      expensesRatio\n      turnoverRatio\n      unitTrustFundRecommendations {\n        fundName\n        imageUrl\n        expenseRatio\n        turnoverRatio\n        riskLevel\n        phsUrl\n      }\n    }\n  }\n": types.AiStrategyDocument,
    "\n  query FinancialGoalsData($userId: String!) {\n    user(id: $userId) {\n      id\n      email\n      username\n      phone\n      birth_year\n      experience\n      createdAt\n      updatedAt\n      wallet {\n        id\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal_id\n          createdAt\n          updatedAt\n        }\n      }\n      wallet_id\n      financial_goal {\n        id\n        userId\n        emoji\n        name\n        amount\n        months_to_reach_goal\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal_id\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  }\n": types.FinancialGoalsDataDocument,
    "\n  mutation RemoveFinancialGoal($removeFinancialGoalId: String!) {\n    removeFinancialGoal(id: $removeFinancialGoalId) {\n      id\n      name\n    }\n  }\n": types.RemoveFinancialGoalDocument,
    "\n  mutation ReportTransactionAdded($reportActionInput: ReportActionInput!) {\n    reportAction(reportActionInput: $reportActionInput) {\n      success\n    }\n  }\n": types.ReportTransactionAddedDocument,
    "\n  query UserGamificationInfo($userId: String!) {\n    user(id: $userId) {\n      level\n      experience\n      user_completed_task {\n        taskId\n        achieved\n        lastClaimed\n      }\n\n      claimedVoucher {\n        userId\n        voucherId\n        createdAt\n        updatedAt\n        code\n      }\n    }\n\n    Task {\n      id\n      title\n      description\n      points\n      requiredAmount\n      createdAt\n      updatedAt\n      type\n      timing\n    }\n  }\n": types.UserGamificationInfoDocument,
    "\n  mutation ClaimReward($taskId: String!) {\n    claimReward(taskId: $taskId) {\n      success\n    }\n  }\n": types.ClaimRewardDocument,
    "\n  query Voucher {\n    voucher {\n      id\n      imageUrl\n      name\n      levelRequired\n      terms\n      createdAt\n      updatedAt\n    }\n  }\n": types.VoucherDocument,
    "\n  mutation ClaimVoucher($voucherId: String!) {\n    claimVoucher(voucherId: $voucherId) {\n      success\n    }\n  }\n": types.ClaimVoucherDocument,
    "\n  query User($userId: String!) {\n    user(id: $userId) {\n      id\n      email\n      username\n      phone\n      birth_year\n      experience\n      createdAt\n      updatedAt\n      wallet {\n        id\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal {\n            name\n          }\n        }\n      }\n      wallet_id\n      financial_goal {\n        id\n        userId\n        emoji\n        name\n        amount\n        months_to_reach_goal\n        createdAt\n        updatedAt\n      }\n      user_info {\n        createdAt\n      }\n      news_topics_followed\n    }\n  }\n": types.UserDocument,
    "\n  mutation SigninUser($signinUserInput: SigninUserInput!) {\n    signinUser(signinUserInput: $signinUserInput) {\n      access_token\n    }\n  }\n": types.SigninUserDocument,
    "\n  query UserNewsTopicFollowed($userId: String!) {\n    user(id: $userId) {\n      news_topics_followed\n    }\n  }\n": types.UserNewsTopicFollowedDocument,
    "\n  mutation UpdateUserNewsTopicFollowed($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      news_topics_followed\n    }\n  }\n": types.UpdateUserNewsTopicFollowedDocument,
    "\n  query UserNews {\n    News {\n      source {\n        id\n        name\n      }\n      author\n      title\n      description\n      url\n      urlToImage\n      publishedAt\n      content\n    }\n  }\n": types.UserNewsDocument,
    "\n  mutation ReportNewsClicked($reportActionInput: ReportActionInput!) {\n    reportAction(reportActionInput: $reportActionInput) {\n      success\n    }\n  }\n": types.ReportNewsClickedDocument,
    "\n  mutation CreateOrUpdateUserInfo(\n    $createOrUpdateUserInfoInput: CreateOrUpdateUserInfoInput!\n  ) {\n    createOrUpdateUserInfo(\n      createOrUpdateUserInfoInput: $createOrUpdateUserInfoInput\n    ) {\n      userId\n      updatedAt\n    }\n  }\n": types.CreateOrUpdateUserInfoDocument,
    "\n  query UserInfo($userId: String!) {\n    user(id: $userId) {\n      username\n      user_info {\n        userId\n        annual_income\n        estimated_liabilities\n        estimated_monthly_expenses\n        invested_before\n        risk_tolerance\n        expected_annual_return\n        investment_horizon\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.UserInfoDocument,
    "\n  mutation SignupUser($signupUserInput: SignupUserInput!) {\n    signupUser(signupUserInput: $signupUserInput) {\n      access_token\n    }\n  }\n": types.SignupUserDocument,
    "\n  query GetAllVouchers {\n    voucher {\n      id\n      imageUrl\n      name\n      levelRequired\n      terms\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetAllVouchersDocument,
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
export function graphql(source: "\n  mutation RemoveTransaction($removeTransactionId: String!) {\n    removeTransaction(id: $removeTransactionId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveTransaction($removeTransactionId: String!) {\n    removeTransaction(id: $removeTransactionId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminData {\n    adminData {\n      totalUsersSavings {\n        month\n        year\n        value\n      }\n      totalActiveUsers {\n        month\n        year\n        value\n      }\n      totalUsers {\n        month\n        year\n        value\n      }\n      newUsers {\n        month\n        year\n        value\n      }\n      userAnnualIncomeStats {\n        name\n        value\n      }\n      userLiabilitiesStats {\n        name\n        value\n      }\n      userMonthlyExpenseStats {\n        name\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query AdminData {\n    adminData {\n      totalUsersSavings {\n        month\n        year\n        value\n      }\n      totalActiveUsers {\n        month\n        year\n        value\n      }\n      totalUsers {\n        month\n        year\n        value\n      }\n      newUsers {\n        month\n        year\n        value\n      }\n      userAnnualIncomeStats {\n        name\n        value\n      }\n      userLiabilitiesStats {\n        name\n        value\n      }\n      userMonthlyExpenseStats {\n        name\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AiStrategy {\n    aiStrategy {\n      expensesRatio\n      turnoverRatio\n      unitTrustFundRecommendations {\n        fundName\n        imageUrl\n        expenseRatio\n        turnoverRatio\n        riskLevel\n        phsUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query AiStrategy {\n    aiStrategy {\n      expensesRatio\n      turnoverRatio\n      unitTrustFundRecommendations {\n        fundName\n        imageUrl\n        expenseRatio\n        turnoverRatio\n        riskLevel\n        phsUrl\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation ReportTransactionAdded($reportActionInput: ReportActionInput!) {\n    reportAction(reportActionInput: $reportActionInput) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ReportTransactionAdded($reportActionInput: ReportActionInput!) {\n    reportAction(reportActionInput: $reportActionInput) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserGamificationInfo($userId: String!) {\n    user(id: $userId) {\n      level\n      experience\n      user_completed_task {\n        taskId\n        achieved\n        lastClaimed\n      }\n\n      claimedVoucher {\n        userId\n        voucherId\n        createdAt\n        updatedAt\n        code\n      }\n    }\n\n    Task {\n      id\n      title\n      description\n      points\n      requiredAmount\n      createdAt\n      updatedAt\n      type\n      timing\n    }\n  }\n"): (typeof documents)["\n  query UserGamificationInfo($userId: String!) {\n    user(id: $userId) {\n      level\n      experience\n      user_completed_task {\n        taskId\n        achieved\n        lastClaimed\n      }\n\n      claimedVoucher {\n        userId\n        voucherId\n        createdAt\n        updatedAt\n        code\n      }\n    }\n\n    Task {\n      id\n      title\n      description\n      points\n      requiredAmount\n      createdAt\n      updatedAt\n      type\n      timing\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClaimReward($taskId: String!) {\n    claimReward(taskId: $taskId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ClaimReward($taskId: String!) {\n    claimReward(taskId: $taskId) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Voucher {\n    voucher {\n      id\n      imageUrl\n      name\n      levelRequired\n      terms\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Voucher {\n    voucher {\n      id\n      imageUrl\n      name\n      levelRequired\n      terms\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClaimVoucher($voucherId: String!) {\n    claimVoucher(voucherId: $voucherId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ClaimVoucher($voucherId: String!) {\n    claimVoucher(voucherId: $voucherId) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query User($userId: String!) {\n    user(id: $userId) {\n      id\n      email\n      username\n      phone\n      birth_year\n      experience\n      createdAt\n      updatedAt\n      wallet {\n        id\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal {\n            name\n          }\n        }\n      }\n      wallet_id\n      financial_goal {\n        id\n        userId\n        emoji\n        name\n        amount\n        months_to_reach_goal\n        createdAt\n        updatedAt\n      }\n      user_info {\n        createdAt\n      }\n      news_topics_followed\n    }\n  }\n"): (typeof documents)["\n  query User($userId: String!) {\n    user(id: $userId) {\n      id\n      email\n      username\n      phone\n      birth_year\n      experience\n      createdAt\n      updatedAt\n      wallet {\n        id\n        createdAt\n        updatedAt\n        transactions {\n          id\n          amount\n          wallet_id\n          financial_goal {\n            name\n          }\n        }\n      }\n      wallet_id\n      financial_goal {\n        id\n        userId\n        emoji\n        name\n        amount\n        months_to_reach_goal\n        createdAt\n        updatedAt\n      }\n      user_info {\n        createdAt\n      }\n      news_topics_followed\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SigninUser($signinUserInput: SigninUserInput!) {\n    signinUser(signinUserInput: $signinUserInput) {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation SigninUser($signinUserInput: SigninUserInput!) {\n    signinUser(signinUserInput: $signinUserInput) {\n      access_token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserNewsTopicFollowed($userId: String!) {\n    user(id: $userId) {\n      news_topics_followed\n    }\n  }\n"): (typeof documents)["\n  query UserNewsTopicFollowed($userId: String!) {\n    user(id: $userId) {\n      news_topics_followed\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserNewsTopicFollowed($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      news_topics_followed\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserNewsTopicFollowed($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      news_topics_followed\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserNews {\n    News {\n      source {\n        id\n        name\n      }\n      author\n      title\n      description\n      url\n      urlToImage\n      publishedAt\n      content\n    }\n  }\n"): (typeof documents)["\n  query UserNews {\n    News {\n      source {\n        id\n        name\n      }\n      author\n      title\n      description\n      url\n      urlToImage\n      publishedAt\n      content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ReportNewsClicked($reportActionInput: ReportActionInput!) {\n    reportAction(reportActionInput: $reportActionInput) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ReportNewsClicked($reportActionInput: ReportActionInput!) {\n    reportAction(reportActionInput: $reportActionInput) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrUpdateUserInfo(\n    $createOrUpdateUserInfoInput: CreateOrUpdateUserInfoInput!\n  ) {\n    createOrUpdateUserInfo(\n      createOrUpdateUserInfoInput: $createOrUpdateUserInfoInput\n    ) {\n      userId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrUpdateUserInfo(\n    $createOrUpdateUserInfoInput: CreateOrUpdateUserInfoInput!\n  ) {\n    createOrUpdateUserInfo(\n      createOrUpdateUserInfoInput: $createOrUpdateUserInfoInput\n    ) {\n      userId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserInfo($userId: String!) {\n    user(id: $userId) {\n      username\n      user_info {\n        userId\n        annual_income\n        estimated_liabilities\n        estimated_monthly_expenses\n        invested_before\n        risk_tolerance\n        expected_annual_return\n        investment_horizon\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserInfo($userId: String!) {\n    user(id: $userId) {\n      username\n      user_info {\n        userId\n        annual_income\n        estimated_liabilities\n        estimated_monthly_expenses\n        invested_before\n        risk_tolerance\n        expected_annual_return\n        investment_horizon\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignupUser($signupUserInput: SignupUserInput!) {\n    signupUser(signupUserInput: $signupUserInput) {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation SignupUser($signupUserInput: SignupUserInput!) {\n    signupUser(signupUserInput: $signupUserInput) {\n      access_token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllVouchers {\n    voucher {\n      id\n      imageUrl\n      name\n      levelRequired\n      terms\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetAllVouchers {\n    voucher {\n      id\n      imageUrl\n      name\n      levelRequired\n      terms\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;