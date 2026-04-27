/* eslint-disable */
// @ts-nocheck
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
  Amount: { input: any; output: any; }
  Amount_Crypto: { input: any; output: any; }
  Amount_Currency: { input: any; output: any; }
  Amount_Fiat: { input: any; output: any; }
  Amount_Money: { input: any; output: any; }
  Amount_Percentage: { input: any; output: any; }
  Amount_Tokens: { input: any; output: any; }
  Currency: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  EthereumAddress: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  OID: { input: any; output: any; }
  OLabel: { input: any; output: any; }
  PHID: { input: any; output: any; }
  URL: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Action = {
  __typename?: 'Action';
  attachments?: Maybe<Array<Attachment>>;
  context?: Maybe<ActionContext>;
  id: Scalars['String']['output'];
  input: Scalars['JSONObject']['output'];
  scope: Scalars['String']['output'];
  timestampUtcMs: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ActionContext = {
  __typename?: 'ActionContext';
  signer?: Maybe<ReactorSigner>;
};

export type ActionContextInput = {
  signer?: InputMaybe<ReactorSignerInput>;
};

export type ActionInput = {
  attachments?: InputMaybe<Array<AttachmentInput>>;
  context?: InputMaybe<ActionContextInput>;
  id: Scalars['String']['input'];
  input: Scalars['JSONObject']['input'];
  scope: Scalars['String']['input'];
  timestampUtcMs: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type AnalyticsFilter = {
  currency?: InputMaybe<Scalars['String']['input']>;
  /** List of dimensions to filter by, such as 'budget' or 'project' */
  dimensions?: InputMaybe<Array<InputMaybe<AnalyticsFilterDimension>>>;
  end?: InputMaybe<Scalars['String']['input']>;
  /** Period to group by */
  granularity?: InputMaybe<AnalyticsGranularity>;
  /** List of metrics to filter by, such as 'budget' or 'actuals' */
  metrics?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type AnalyticsFilterDimension = {
  lod: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  select: Scalars['String']['input'];
};

export type AnalyticsGranularity =
  | 'annual'
  | 'daily'
  | 'hourly'
  | 'monthly'
  | 'quarterly'
  | 'semiAnnual'
  | 'total'
  | 'weekly';

export type AnalyticsPeriod = {
  __typename?: 'AnalyticsPeriod';
  end?: Maybe<Scalars['DateTime']['output']>;
  period?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Array<Maybe<AnalyticsSeries>>>;
  start?: Maybe<Scalars['DateTime']['output']>;
};

export type AnalyticsQuery = {
  __typename?: 'AnalyticsQuery';
  currencies?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  dimensions?: Maybe<Array<Maybe<Dimension>>>;
  metrics?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  multiCurrencySeries?: Maybe<Array<Maybe<AnalyticsPeriod>>>;
  series?: Maybe<Array<Maybe<AnalyticsPeriod>>>;
};


export type AnalyticsQueryMultiCurrencySeriesArgs = {
  filter?: InputMaybe<MultiCurrencyConversions>;
};


export type AnalyticsQuerySeriesArgs = {
  filter?: InputMaybe<AnalyticsFilter>;
};

export type AnalyticsSeries = {
  __typename?: 'AnalyticsSeries';
  dimensions?: Maybe<Array<Maybe<AnalyticsSeriesDimension>>>;
  metric?: Maybe<Scalars['String']['output']>;
  sum?: Maybe<Scalars['Float']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type AnalyticsSeriesDimension = {
  __typename?: 'AnalyticsSeriesDimension';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type AppModule = IDocument & {
  __typename?: 'AppModule';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: AppModule_AppModuleState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: AppModule_AppModuleState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type AppModuleOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for AppModule operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type AppModuleMutationResult = {
  __typename?: 'AppModuleMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: AppModule_FullState;
};

/** Mutations: AppModule */
export type AppModuleMutations = {
  __typename?: 'AppModuleMutations';
  addDocumentType: AppModuleMutationResult;
  addDocumentTypeAsync: Scalars['String']['output'];
  createDocument: AppModuleMutationResult;
  createEmptyDocument: AppModuleMutationResult;
  removeDocumentType: AppModuleMutationResult;
  removeDocumentTypeAsync: Scalars['String']['output'];
  setAppName: AppModuleMutationResult;
  setAppNameAsync: Scalars['String']['output'];
  setAppStatus: AppModuleMutationResult;
  setAppStatusAsync: Scalars['String']['output'];
  setDocumentTypes: AppModuleMutationResult;
  setDocumentTypesAsync: Scalars['String']['output'];
  setDragAndDropEnabled: AppModuleMutationResult;
  setDragAndDropEnabledAsync: Scalars['String']['output'];
};


/** Mutations: AppModule */
export type AppModuleMutationsAddDocumentTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_AddDocumentTypeInput;
};


/** Mutations: AppModule */
export type AppModuleMutationsAddDocumentTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_AddDocumentTypeInput;
};


/** Mutations: AppModule */
export type AppModuleMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<AppModule_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: AppModule */
export type AppModuleMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: AppModule */
export type AppModuleMutationsRemoveDocumentTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_RemoveDocumentTypeInput;
};


/** Mutations: AppModule */
export type AppModuleMutationsRemoveDocumentTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_RemoveDocumentTypeInput;
};


/** Mutations: AppModule */
export type AppModuleMutationsSetAppNameArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_SetAppNameInput;
};


/** Mutations: AppModule */
export type AppModuleMutationsSetAppNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_SetAppNameInput;
};


/** Mutations: AppModule */
export type AppModuleMutationsSetAppStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_SetAppStatusInput;
};


/** Mutations: AppModule */
export type AppModuleMutationsSetAppStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_SetAppStatusInput;
};


/** Mutations: AppModule */
export type AppModuleMutationsSetDocumentTypesArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_SetDocumentTypesInput;
};


/** Mutations: AppModule */
export type AppModuleMutationsSetDocumentTypesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_SetDocumentTypesInput;
};


/** Mutations: AppModule */
export type AppModuleMutationsSetDragAndDropEnabledArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_SetDragAndDropEnabledInput;
};


/** Mutations: AppModule */
export type AppModuleMutationsSetDragAndDropEnabledAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AppModule_SetDragAndDropEnabledInput;
};

/** Queries: AppModule Document */
export type AppModuleQueries = {
  __typename?: 'AppModuleQueries';
  /** Get a specific AppModule document by identifier */
  document?: Maybe<AppModule_DocumentWithChildren>;
  /** Get children of a AppModule document */
  documentChildren: AppModule_DocumentResultPage;
  /** Get parents of a AppModule document */
  documentParents: AppModule_DocumentResultPage;
  /** Get all AppModule documents (paged) */
  documents: AppModule_DocumentResultPage;
  /** Find AppModule documents by search criteria */
  findDocuments: AppModule_DocumentResultPage;
};


/** Queries: AppModule Document */
export type AppModuleQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<AppModule_ViewFilterInput>;
};


/** Queries: AppModule Document */
export type AppModuleQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<AppModule_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<AppModule_ViewFilterInput>;
};


/** Queries: AppModule Document */
export type AppModuleQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<AppModule_PagingInput>;
  view?: InputMaybe<AppModule_ViewFilterInput>;
};


/** Queries: AppModule Document */
export type AppModuleQueriesDocumentsArgs = {
  paging?: InputMaybe<AppModule_PagingInput>;
};


/** Queries: AppModule Document */
export type AppModuleQueriesFindDocumentsArgs = {
  paging?: InputMaybe<AppModule_PagingInput>;
  search?: InputMaybe<AppModule_SearchFilterInput>;
  view?: InputMaybe<AppModule_ViewFilterInput>;
};

export type AppModule_AddDocumentTypeInput = {
  documentType: Scalars['String']['input'];
};

export type AppModule_AppModuleState = {
  __typename?: 'AppModule_AppModuleState';
  allowedDocumentTypes?: Maybe<Array<Scalars['String']['output']>>;
  isDragAndDropEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  status: AppModule_StatusType;
};

/** Input Types for Initial State */
export type AppModule_AppModuleStateInput = {
  allowedDocumentTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isDragAndDropEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AppModule_StatusType>;
};

/** Paginated result type for AppModule documents */
export type AppModule_DocumentResultPage = {
  __typename?: 'AppModule_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<AppModuleMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for AppModule */
export type AppModule_DocumentWithChildren = {
  __typename?: 'AppModule_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: AppModuleMutationResult;
};

/** Full state with all scopes for AppModule */
export type AppModule_FullState = {
  __typename?: 'AppModule_FullState';
  auth: Scalars['JSONObject']['output'];
  document: AppModule_PhDocumentScopeState;
  global: AppModule_AppModuleState;
  local: Scalars['JSONObject']['output'];
};

export type AppModule_InitialStateInput = {
  global?: InputMaybe<AppModule_AppModuleStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type AppModule_PhDocumentScopeState = {
  __typename?: 'AppModule_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: AppModule_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type AppModule_PhHashConfig = {
  __typename?: 'AppModule_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type AppModule_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AppModule_RemoveDocumentTypeInput = {
  documentType: Scalars['String']['input'];
};

export type AppModule_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

/** Module: BaseOperations */
export type AppModule_SetAppNameInput = {
  name: Scalars['String']['input'];
};

export type AppModule_SetAppStatusInput = {
  status: AppModule_StatusType;
};

export type AppModule_SetDocumentTypesInput = {
  documentTypes: Array<Scalars['String']['input']>;
};

/** Module: DndOperations */
export type AppModule_SetDragAndDropEnabledInput = {
  enabled: Scalars['Boolean']['input'];
};

export type AppModule_StatusType =
  | 'CONFIRMED'
  | 'DRAFT';

export type AppModule_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Attachment = {
  __typename?: 'Attachment';
  data: Scalars['String']['output'];
  extension?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  hash: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
};

export type AttachmentInput = {
  data: Scalars['String']['input'];
  extension?: InputMaybe<Scalars['String']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  hash: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
};

export type ChannelMeta = {
  __typename?: 'ChannelMeta';
  id: Scalars['String']['output'];
};

export type ChannelMetaInput = {
  id: Scalars['String']['input'];
};

export type ContributorProfile = IDocument & {
  __typename?: 'ContributorProfile';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ContributorProfile_ContributorProfileState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: ContributorProfile_ContributorProfileState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type ContributorProfileOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for ContributorProfile operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type ContributorProfileMutationResult = {
  __typename?: 'ContributorProfileMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: ContributorProfile_FullState;
};

/** Mutations: ContributorProfile */
export type ContributorProfileMutations = {
  __typename?: 'ContributorProfileMutations';
  addGovernanceEndpoint: ContributorProfileMutationResult;
  addGovernanceEndpointAsync: Scalars['String']['output'];
  addWallet: ContributorProfileMutationResult;
  addWalletAsync: Scalars['String']['output'];
  createDocument: ContributorProfileMutationResult;
  createEmptyDocument: ContributorProfileMutationResult;
  removeGovernanceEndpoint: ContributorProfileMutationResult;
  removeGovernanceEndpointAsync: Scalars['String']['output'];
  removeWallet: ContributorProfileMutationResult;
  removeWalletAsync: Scalars['String']['output'];
  setProfileDetails: ContributorProfileMutationResult;
  setProfileDetailsAsync: Scalars['String']['output'];
  setTrustLevel: ContributorProfileMutationResult;
  setTrustLevelAsync: Scalars['String']['output'];
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsAddGovernanceEndpointArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_AddGovernanceEndpointInput;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsAddGovernanceEndpointAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_AddGovernanceEndpointInput;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsAddWalletArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_AddWalletInput;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsAddWalletAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_AddWalletInput;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<ContributorProfile_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsRemoveGovernanceEndpointArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_RemoveGovernanceEndpointInput;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsRemoveGovernanceEndpointAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_RemoveGovernanceEndpointInput;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsRemoveWalletArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_RemoveWalletInput;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsRemoveWalletAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_RemoveWalletInput;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsSetProfileDetailsArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_SetProfileDetailsInput;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsSetProfileDetailsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_SetProfileDetailsInput;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsSetTrustLevelArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_SetTrustLevelInput;
};


/** Mutations: ContributorProfile */
export type ContributorProfileMutationsSetTrustLevelAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ContributorProfile_SetTrustLevelInput;
};

/** Queries: ContributorProfile Document */
export type ContributorProfileQueries = {
  __typename?: 'ContributorProfileQueries';
  /** Get a specific ContributorProfile document by identifier */
  document?: Maybe<ContributorProfile_DocumentWithChildren>;
  /** Get children of a ContributorProfile document */
  documentChildren: ContributorProfile_DocumentResultPage;
  /** Get parents of a ContributorProfile document */
  documentParents: ContributorProfile_DocumentResultPage;
  /** Get all ContributorProfile documents (paged) */
  documents: ContributorProfile_DocumentResultPage;
  /** Find ContributorProfile documents by search criteria */
  findDocuments: ContributorProfile_DocumentResultPage;
};


/** Queries: ContributorProfile Document */
export type ContributorProfileQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<ContributorProfile_ViewFilterInput>;
};


/** Queries: ContributorProfile Document */
export type ContributorProfileQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<ContributorProfile_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ContributorProfile_ViewFilterInput>;
};


/** Queries: ContributorProfile Document */
export type ContributorProfileQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<ContributorProfile_PagingInput>;
  view?: InputMaybe<ContributorProfile_ViewFilterInput>;
};


/** Queries: ContributorProfile Document */
export type ContributorProfileQueriesDocumentsArgs = {
  paging?: InputMaybe<ContributorProfile_PagingInput>;
};


/** Queries: ContributorProfile Document */
export type ContributorProfileQueriesFindDocumentsArgs = {
  paging?: InputMaybe<ContributorProfile_PagingInput>;
  search?: InputMaybe<ContributorProfile_SearchFilterInput>;
  view?: InputMaybe<ContributorProfile_ViewFilterInput>;
};

export type ContributorProfile_AddGovernanceEndpointInput = {
  id: Scalars['OID']['input'];
  platform: ContributorProfile_GovernancePlatform;
  url: Scalars['URL']['input'];
};

export type ContributorProfile_AddWalletInput = {
  address: Scalars['EthereumAddress']['input'];
  chainId: Scalars['Int']['input'];
  id: Scalars['OID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
};

export type ContributorProfile_ContributorKind =
  | 'COMPANY'
  | 'DAO'
  | 'FOUNDATION'
  | 'INDIVIDUAL';

export type ContributorProfile_ContributorProfileState = {
  __typename?: 'ContributorProfile_ContributorProfileState';
  displayName: Scalars['String']['output'];
  farcasterHandle?: Maybe<Scalars['String']['output']>;
  governanceEndpoints: Array<ContributorProfile_GovernanceEndpoint>;
  kind: ContributorProfile_ContributorKind;
  legalName?: Maybe<Scalars['String']['output']>;
  trustLevel: ContributorProfile_TrustLevel;
  twitterHandle?: Maybe<Scalars['String']['output']>;
  walletAddresses: Array<ContributorProfile_ContributorWallet>;
  websiteUrl?: Maybe<Scalars['URL']['output']>;
};

/** Input Types for Initial State */
export type ContributorProfile_ContributorProfileStateInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  farcasterHandle?: InputMaybe<Scalars['String']['input']>;
  governanceEndpoints?: InputMaybe<Array<InputMaybe<ContributorProfile_GovernanceEndpointInput>>>;
  kind?: InputMaybe<ContributorProfile_ContributorKind>;
  legalName?: InputMaybe<Scalars['String']['input']>;
  trustLevel?: InputMaybe<ContributorProfile_TrustLevel>;
  twitterHandle?: InputMaybe<Scalars['String']['input']>;
  walletAddresses?: InputMaybe<Array<InputMaybe<ContributorProfile_ContributorWalletInput>>>;
  websiteUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type ContributorProfile_ContributorWallet = {
  __typename?: 'ContributorProfile_ContributorWallet';
  address: Scalars['EthereumAddress']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type ContributorProfile_ContributorWalletInput = {
  address?: InputMaybe<Scalars['EthereumAddress']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated result type for ContributorProfile documents */
export type ContributorProfile_DocumentResultPage = {
  __typename?: 'ContributorProfile_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<ContributorProfileMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for ContributorProfile */
export type ContributorProfile_DocumentWithChildren = {
  __typename?: 'ContributorProfile_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: ContributorProfileMutationResult;
};

/** Full state with all scopes for ContributorProfile */
export type ContributorProfile_FullState = {
  __typename?: 'ContributorProfile_FullState';
  auth: Scalars['JSONObject']['output'];
  document: ContributorProfile_PhDocumentScopeState;
  global: ContributorProfile_ContributorProfileState;
  local: Scalars['JSONObject']['output'];
};

export type ContributorProfile_GovernanceEndpoint = {
  __typename?: 'ContributorProfile_GovernanceEndpoint';
  id: Scalars['OID']['output'];
  platform: ContributorProfile_GovernancePlatform;
  url: Scalars['URL']['output'];
};

export type ContributorProfile_GovernanceEndpointInput = {
  id?: InputMaybe<Scalars['OID']['input']>;
  platform?: InputMaybe<ContributorProfile_GovernancePlatform>;
  url?: InputMaybe<Scalars['URL']['input']>;
};

export type ContributorProfile_GovernancePlatform =
  | 'AGORA'
  | 'FORUM'
  | 'OTHER'
  | 'SNAPSHOT'
  | 'TALLY';

export type ContributorProfile_InitialStateInput = {
  global?: InputMaybe<ContributorProfile_ContributorProfileStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type ContributorProfile_PhDocumentScopeState = {
  __typename?: 'ContributorProfile_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: ContributorProfile_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type ContributorProfile_PhHashConfig = {
  __typename?: 'ContributorProfile_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type ContributorProfile_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ContributorProfile_RemoveGovernanceEndpointInput = {
  id: Scalars['OID']['input'];
};

export type ContributorProfile_RemoveWalletInput = {
  id: Scalars['OID']['input'];
};

export type ContributorProfile_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

/** Module: Profile */
export type ContributorProfile_SetProfileDetailsInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  farcasterHandle?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<ContributorProfile_ContributorKind>;
  legalName?: InputMaybe<Scalars['String']['input']>;
  twitterHandle?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type ContributorProfile_SetTrustLevelInput = {
  trustLevel: ContributorProfile_TrustLevel;
};

export type ContributorProfile_TrustLevel =
  | 'ANNOUNCED'
  | 'ANONYMOUS'
  | 'VERIFIED';

export type ContributorProfile_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CurrencyConversion = {
  metric: Scalars['String']['input'];
  sourceCurrency: Scalars['String']['input'];
};

export type DeadLetterInfo = {
  __typename?: 'DeadLetterInfo';
  branch: Scalars['String']['output'];
  documentId: Scalars['String']['output'];
  error: Scalars['String']['output'];
  jobId: Scalars['String']['output'];
  operationCount: Scalars['Int']['output'];
  scopes: Array<Scalars['String']['output']>;
};

export type DefiUnited_CampaignParticipation = {
  __typename?: 'DefiUnited_CampaignParticipation';
  assetSymbol: Scalars['String']['output'];
  campaignName: Scalars['String']['output'];
  campaignSlug: Scalars['String']['output'];
  pledgeStatus: Scalars['String']['output'];
  pledgedAmount: Scalars['String']['output'];
  receivedAmount?: Maybe<Scalars['String']['output']>;
};

export type DefiUnited_CampaignStatus =
  | 'ACTIVE'
  | 'ARCHIVED'
  | 'DRAFT'
  | 'EXECUTING'
  | 'FAILED'
  | 'RESOLVED';

export type DefiUnited_DependencyKind =
  | 'COUNCIL_ACTION'
  | 'GOVERNANCE_VOTE'
  | 'ONCHAIN_TX'
  | 'OPERATIONAL'
  | 'OTHER';

export type DefiUnited_DependencyStatus =
  | 'ABANDONED'
  | 'BLOCKED'
  | 'IN_PROGRESS'
  | 'OPEN'
  | 'RESOLVED';

export type DefiUnited_OperationResult = {
  __typename?: 'DefiUnited_OperationResult';
  error?: Maybe<Scalars['String']['output']>;
  operatorAddress?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DefiUnited_PledgeStatus =
  | 'CANCELLED'
  | 'CONFIRMED'
  | 'FAILED'
  | 'GOVERNANCE_PENDING'
  | 'PROPOSED'
  | 'RECEIVED';

export type DefiUnited_PublicAffectedAsset = {
  __typename?: 'DefiUnited_PublicAffectedAsset';
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  symbol: Scalars['String']['output'];
};

export type DefiUnited_PublicCampaign = {
  __typename?: 'DefiUnited_PublicCampaign';
  affectedAsset?: Maybe<DefiUnited_PublicAffectedAsset>;
  contributionAddresses: Array<DefiUnited_PublicContributionAddress>;
  contributorsPublic: Array<DefiUnited_PublicPledge>;
  dependenciesBlocking: Scalars['Int']['output'];
  dependenciesPublic: Array<DefiUnited_PublicDependency>;
  dependenciesResolved: Scalars['Int']['output'];
  externalLinks: Array<DefiUnited_PublicExternalLink>;
  incidentDate?: Maybe<Scalars['String']['output']>;
  lastUpdateAt?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  percentReceived: Scalars['Float']['output'];
  pledgeCount: Scalars['Int']['output'];
  recentUpdates: Array<DefiUnited_PublicStatusUpdate>;
  riskDisclaimer?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  status: DefiUnited_CampaignStatus;
  summary?: Maybe<Scalars['String']['output']>;
  targetAmount?: Maybe<Scalars['String']['output']>;
  totalPledged: Scalars['String']['output'];
  totalReceived: Scalars['String']['output'];
};

export type DefiUnited_PublicContributionAddress = {
  __typename?: 'DefiUnited_PublicContributionAddress';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type DefiUnited_PublicContributorProfile = {
  __typename?: 'DefiUnited_PublicContributorProfile';
  campaignParticipation: Array<DefiUnited_CampaignParticipation>;
  displayName: Scalars['String']['output'];
  farcasterHandle?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  kind: Scalars['String']['output'];
  trustLevel: Scalars['String']['output'];
  twitterHandle?: Maybe<Scalars['String']['output']>;
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

export type DefiUnited_PublicDependency = {
  __typename?: 'DefiUnited_PublicDependency';
  description?: Maybe<Scalars['String']['output']>;
  expectedResolution?: Maybe<Scalars['String']['output']>;
  externalRefProposalId?: Maybe<Scalars['String']['output']>;
  externalRefUrl?: Maybe<Scalars['String']['output']>;
  kind: DefiUnited_DependencyKind;
  status: DefiUnited_DependencyStatus;
  title: Scalars['String']['output'];
};

export type DefiUnited_PublicExternalAnnouncement = {
  __typename?: 'DefiUnited_PublicExternalAnnouncement';
  platform: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type DefiUnited_PublicExternalLink = {
  __typename?: 'DefiUnited_PublicExternalLink';
  label: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type DefiUnited_PublicPledge = {
  __typename?: 'DefiUnited_PublicPledge';
  assetSymbol: Scalars['String']['output'];
  contributorDisplayName: Scalars['String']['output'];
  contributorTrustLevel: Scalars['String']['output'];
  contributorTwitter?: Maybe<Scalars['String']['output']>;
  contributorWebsiteUrl?: Maybe<Scalars['String']['output']>;
  governancePlatform?: Maybe<Scalars['String']['output']>;
  governanceProposalUrl?: Maybe<Scalars['String']['output']>;
  pledgedAmount: Scalars['String']['output'];
  publicNotes?: Maybe<Scalars['String']['output']>;
  receivedAmount?: Maybe<Scalars['String']['output']>;
  status: DefiUnited_PledgeStatus;
};

export type DefiUnited_PublicStatusUpdate = {
  __typename?: 'DefiUnited_PublicStatusUpdate';
  body: Scalars['String']['output'];
  externalAnnouncements: Array<DefiUnited_PublicExternalAnnouncement>;
  id: Scalars['String']['output'];
  metricsTotalPledged?: Maybe<Scalars['String']['output']>;
  metricsTotalReceived?: Maybe<Scalars['String']['output']>;
  publishedAt: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Dimension = {
  __typename?: 'Dimension';
  name?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<Value>>>;
};

export type DistributionPlan = IDocument & {
  __typename?: 'DistributionPlan';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: DistributionPlan_DistributionPlanState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: DistributionPlan_DistributionPlanState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type DistributionPlanOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for DistributionPlan operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type DistributionPlanMutationResult = {
  __typename?: 'DistributionPlanMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: DistributionPlan_FullState;
};

/** Mutations: DistributionPlan */
export type DistributionPlanMutations = {
  __typename?: 'DistributionPlanMutations';
  addApprovalRef: DistributionPlanMutationResult;
  addApprovalRefAsync: Scalars['String']['output'];
  addRecipient: DistributionPlanMutationResult;
  addRecipientAsync: Scalars['String']['output'];
  approvePlan: DistributionPlanMutationResult;
  approvePlanAsync: Scalars['String']['output'];
  cancelPlan: DistributionPlanMutationResult;
  cancelPlanAsync: Scalars['String']['output'];
  completeDistribution: DistributionPlanMutationResult;
  completeDistributionAsync: Scalars['String']['output'];
  createDocument: DistributionPlanMutationResult;
  createEmptyDocument: DistributionPlanMutationResult;
  markRecipientFailed: DistributionPlanMutationResult;
  markRecipientFailedAsync: Scalars['String']['output'];
  markRecipientRefunded: DistributionPlanMutationResult;
  markRecipientRefundedAsync: Scalars['String']['output'];
  markRecipientSent: DistributionPlanMutationResult;
  markRecipientSentAsync: Scalars['String']['output'];
  removeRecipient: DistributionPlanMutationResult;
  removeRecipientAsync: Scalars['String']['output'];
  setMethodology: DistributionPlanMutationResult;
  setMethodologyAsync: Scalars['String']['output'];
  updateRecipient: DistributionPlanMutationResult;
  updateRecipientAsync: Scalars['String']['output'];
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsAddApprovalRefArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_AddApprovalRefInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsAddApprovalRefAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_AddApprovalRefInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsAddRecipientArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_AddRecipientInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsAddRecipientAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_AddRecipientInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsApprovePlanArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_ApprovePlanInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsApprovePlanAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_ApprovePlanInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsCancelPlanArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_CancelPlanInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsCancelPlanAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_CancelPlanInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsCompleteDistributionArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_CompleteDistributionInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsCompleteDistributionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_CompleteDistributionInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<DistributionPlan_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsMarkRecipientFailedArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_MarkRecipientFailedInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsMarkRecipientFailedAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_MarkRecipientFailedInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsMarkRecipientRefundedArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_MarkRecipientRefundedInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsMarkRecipientRefundedAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_MarkRecipientRefundedInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsMarkRecipientSentArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_MarkRecipientSentInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsMarkRecipientSentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_MarkRecipientSentInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsRemoveRecipientArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_RemoveRecipientInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsRemoveRecipientAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_RemoveRecipientInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsSetMethodologyArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_SetMethodologyInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsSetMethodologyAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_SetMethodologyInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsUpdateRecipientArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_UpdateRecipientInput;
};


/** Mutations: DistributionPlan */
export type DistributionPlanMutationsUpdateRecipientAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DistributionPlan_UpdateRecipientInput;
};

/** Queries: DistributionPlan Document */
export type DistributionPlanQueries = {
  __typename?: 'DistributionPlanQueries';
  /** Get a specific DistributionPlan document by identifier */
  document?: Maybe<DistributionPlan_DocumentWithChildren>;
  /** Get children of a DistributionPlan document */
  documentChildren: DistributionPlan_DocumentResultPage;
  /** Get parents of a DistributionPlan document */
  documentParents: DistributionPlan_DocumentResultPage;
  /** Get all DistributionPlan documents (paged) */
  documents: DistributionPlan_DocumentResultPage;
  /** Find DistributionPlan documents by search criteria */
  findDocuments: DistributionPlan_DocumentResultPage;
};


/** Queries: DistributionPlan Document */
export type DistributionPlanQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<DistributionPlan_ViewFilterInput>;
};


/** Queries: DistributionPlan Document */
export type DistributionPlanQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<DistributionPlan_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<DistributionPlan_ViewFilterInput>;
};


/** Queries: DistributionPlan Document */
export type DistributionPlanQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<DistributionPlan_PagingInput>;
  view?: InputMaybe<DistributionPlan_ViewFilterInput>;
};


/** Queries: DistributionPlan Document */
export type DistributionPlanQueriesDocumentsArgs = {
  paging?: InputMaybe<DistributionPlan_PagingInput>;
};


/** Queries: DistributionPlan Document */
export type DistributionPlanQueriesFindDocumentsArgs = {
  paging?: InputMaybe<DistributionPlan_PagingInput>;
  search?: InputMaybe<DistributionPlan_SearchFilterInput>;
  view?: InputMaybe<DistributionPlan_ViewFilterInput>;
};

export type DistributionPlan_AddApprovalRefInput = {
  id: Scalars['OID']['input'];
  label: Scalars['String']['input'];
  url: Scalars['URL']['input'];
};

export type DistributionPlan_AddRecipientInput = {
  address: Scalars['EthereumAddress']['input'];
  allocatedAmount: Scalars['Amount_Tokens']['input'];
  chainId: Scalars['Int']['input'];
  id: Scalars['OID']['input'];
  rationale?: InputMaybe<Scalars['String']['input']>;
};

export type DistributionPlan_ApprovalRef = {
  __typename?: 'DistributionPlan_ApprovalRef';
  id: Scalars['OID']['output'];
  label: Scalars['String']['output'];
  url: Scalars['URL']['output'];
};

export type DistributionPlan_ApprovalRefInput = {
  id?: InputMaybe<Scalars['OID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['URL']['input']>;
};

export type DistributionPlan_ApprovePlanInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DistributionPlan_CancelPlanInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DistributionPlan_CompleteDistributionInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DistributionPlan_DistributionPlanState = {
  __typename?: 'DistributionPlan_DistributionPlanState';
  approvalRefs: Array<DistributionPlan_ApprovalRef>;
  methodology?: Maybe<Scalars['String']['output']>;
  recipients: Array<DistributionPlan_DistributionRecipient>;
  status: DistributionPlan_DistributionStatus;
  totalAvailable?: Maybe<Scalars['Amount_Tokens']['output']>;
};

/** Input Types for Initial State */
export type DistributionPlan_DistributionPlanStateInput = {
  approvalRefs?: InputMaybe<Array<InputMaybe<DistributionPlan_ApprovalRefInput>>>;
  methodology?: InputMaybe<Scalars['String']['input']>;
  recipients?: InputMaybe<Array<InputMaybe<DistributionPlan_DistributionRecipientInput>>>;
  status?: InputMaybe<DistributionPlan_DistributionStatus>;
  totalAvailable?: InputMaybe<Scalars['Amount_Tokens']['input']>;
};

export type DistributionPlan_DistributionRecipient = {
  __typename?: 'DistributionPlan_DistributionRecipient';
  address: Scalars['EthereumAddress']['output'];
  allocatedAmount: Scalars['Amount_Tokens']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  rationale?: Maybe<Scalars['String']['output']>;
  status: DistributionPlan_RecipientStatus;
  txHash?: Maybe<Scalars['String']['output']>;
};

export type DistributionPlan_DistributionRecipientInput = {
  address?: InputMaybe<Scalars['EthereumAddress']['input']>;
  allocatedAmount?: InputMaybe<Scalars['Amount_Tokens']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  rationale?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DistributionPlan_RecipientStatus>;
  txHash?: InputMaybe<Scalars['String']['input']>;
};

export type DistributionPlan_DistributionStatus =
  | 'APPROVED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'DRAFT'
  | 'EXECUTING';

/** Paginated result type for DistributionPlan documents */
export type DistributionPlan_DocumentResultPage = {
  __typename?: 'DistributionPlan_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<DistributionPlanMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for DistributionPlan */
export type DistributionPlan_DocumentWithChildren = {
  __typename?: 'DistributionPlan_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: DistributionPlanMutationResult;
};

/** Full state with all scopes for DistributionPlan */
export type DistributionPlan_FullState = {
  __typename?: 'DistributionPlan_FullState';
  auth: Scalars['JSONObject']['output'];
  document: DistributionPlan_PhDocumentScopeState;
  global: DistributionPlan_DistributionPlanState;
  local: Scalars['JSONObject']['output'];
};

export type DistributionPlan_InitialStateInput = {
  global?: InputMaybe<DistributionPlan_DistributionPlanStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type DistributionPlan_MarkRecipientFailedInput = {
  id: Scalars['OID']['input'];
};

export type DistributionPlan_MarkRecipientRefundedInput = {
  id: Scalars['OID']['input'];
};

export type DistributionPlan_MarkRecipientSentInput = {
  id: Scalars['OID']['input'];
  txHash: Scalars['String']['input'];
};

/** Document scope state (same for all document types) */
export type DistributionPlan_PhDocumentScopeState = {
  __typename?: 'DistributionPlan_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: DistributionPlan_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type DistributionPlan_PhHashConfig = {
  __typename?: 'DistributionPlan_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type DistributionPlan_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DistributionPlan_RecipientStatus =
  | 'FAILED'
  | 'PLANNED'
  | 'REFUNDED'
  | 'SENT';

export type DistributionPlan_RemoveRecipientInput = {
  id: Scalars['OID']['input'];
};

export type DistributionPlan_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

/** Module: Planning */
export type DistributionPlan_SetMethodologyInput = {
  methodology?: InputMaybe<Scalars['String']['input']>;
  totalAvailable?: InputMaybe<Scalars['Amount_Tokens']['input']>;
};

export type DistributionPlan_UpdateRecipientInput = {
  allocatedAmount?: InputMaybe<Scalars['Amount_Tokens']['input']>;
  id: Scalars['OID']['input'];
  rationale?: InputMaybe<Scalars['String']['input']>;
};

export type DistributionPlan_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DocumentChangeContext = {
  __typename?: 'DocumentChangeContext';
  childId?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['String']['output']>;
};

export type DocumentChangeEvent = {
  __typename?: 'DocumentChangeEvent';
  context?: Maybe<DocumentChangeContext>;
  documents: Array<PhDocument>;
  type: DocumentChangeType;
};

export type DocumentChangeType =
  | 'CHILD_ADDED'
  | 'CHILD_REMOVED'
  | 'CREATED'
  | 'DELETED'
  | 'PARENT_ADDED'
  | 'PARENT_REMOVED'
  | 'UPDATED';

export type DocumentDrive = IDocument & {
  __typename?: 'DocumentDrive';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: DocumentDrive_DocumentDriveState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: DocumentDrive_DocumentDriveState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type DocumentDriveOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for DocumentDrive operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type DocumentDriveMutationResult = {
  __typename?: 'DocumentDriveMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: DocumentDrive_FullState;
};

/** Mutations: DocumentDrive */
export type DocumentDriveMutations = {
  __typename?: 'DocumentDriveMutations';
  addFile: DocumentDriveMutationResult;
  addFileAsync: Scalars['String']['output'];
  addFolder: DocumentDriveMutationResult;
  addFolderAsync: Scalars['String']['output'];
  addListener: DocumentDriveMutationResult;
  addListenerAsync: Scalars['String']['output'];
  addTrigger: DocumentDriveMutationResult;
  addTriggerAsync: Scalars['String']['output'];
  copyNode: DocumentDriveMutationResult;
  copyNodeAsync: Scalars['String']['output'];
  createDocument: DocumentDriveMutationResult;
  createEmptyDocument: DocumentDriveMutationResult;
  deleteNode: DocumentDriveMutationResult;
  deleteNodeAsync: Scalars['String']['output'];
  moveNode: DocumentDriveMutationResult;
  moveNodeAsync: Scalars['String']['output'];
  removeListener: DocumentDriveMutationResult;
  removeListenerAsync: Scalars['String']['output'];
  removeTrigger: DocumentDriveMutationResult;
  removeTriggerAsync: Scalars['String']['output'];
  setAvailableOffline: DocumentDriveMutationResult;
  setAvailableOfflineAsync: Scalars['String']['output'];
  setDriveIcon: DocumentDriveMutationResult;
  setDriveIconAsync: Scalars['String']['output'];
  setDriveName: DocumentDriveMutationResult;
  setDriveNameAsync: Scalars['String']['output'];
  setSharingType: DocumentDriveMutationResult;
  setSharingTypeAsync: Scalars['String']['output'];
  updateFile: DocumentDriveMutationResult;
  updateFileAsync: Scalars['String']['output'];
  updateNode: DocumentDriveMutationResult;
  updateNodeAsync: Scalars['String']['output'];
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddFileArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddFileInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddFileAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddFileInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddFolderArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddFolderInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddFolderAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddFolderInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddListenerArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddListenerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddListenerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddListenerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddTriggerArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddTriggerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddTriggerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddTriggerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsCopyNodeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_CopyNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsCopyNodeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_CopyNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<DocumentDrive_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsDeleteNodeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_DeleteNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsDeleteNodeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_DeleteNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsMoveNodeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_MoveNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsMoveNodeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_MoveNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsRemoveListenerArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_RemoveListenerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsRemoveListenerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_RemoveListenerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsRemoveTriggerArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_RemoveTriggerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsRemoveTriggerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_RemoveTriggerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetAvailableOfflineArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetAvailableOfflineInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetAvailableOfflineAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetAvailableOfflineInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetDriveIconArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetDriveIconInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetDriveIconAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetDriveIconInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetDriveNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetDriveNameInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetDriveNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetDriveNameInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetSharingTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetSharingTypeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetSharingTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetSharingTypeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsUpdateFileArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_UpdateFileInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsUpdateFileAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_UpdateFileInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsUpdateNodeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_UpdateNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsUpdateNodeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_UpdateNodeInput;
};

/** Queries: DocumentDrive Document */
export type DocumentDriveQueries = {
  __typename?: 'DocumentDriveQueries';
  /** Get a specific DocumentDrive document by identifier */
  document?: Maybe<DocumentDrive_DocumentWithChildren>;
  /** Get children of a DocumentDrive document */
  documentChildren: DocumentDrive_DocumentResultPage;
  /** Get parents of a DocumentDrive document */
  documentParents: DocumentDrive_DocumentResultPage;
  /** Get all DocumentDrive documents (paged) */
  documents: DocumentDrive_DocumentResultPage;
  /** Find DocumentDrive documents by search criteria */
  findDocuments: DocumentDrive_DocumentResultPage;
};


/** Queries: DocumentDrive Document */
export type DocumentDriveQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<DocumentDrive_ViewFilterInput>;
};


/** Queries: DocumentDrive Document */
export type DocumentDriveQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<DocumentDrive_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<DocumentDrive_ViewFilterInput>;
};


/** Queries: DocumentDrive Document */
export type DocumentDriveQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<DocumentDrive_PagingInput>;
  view?: InputMaybe<DocumentDrive_ViewFilterInput>;
};


/** Queries: DocumentDrive Document */
export type DocumentDriveQueriesDocumentsArgs = {
  paging?: InputMaybe<DocumentDrive_PagingInput>;
};


/** Queries: DocumentDrive Document */
export type DocumentDriveQueriesFindDocumentsArgs = {
  paging?: InputMaybe<DocumentDrive_PagingInput>;
  search?: InputMaybe<DocumentDrive_SearchFilterInput>;
  view?: InputMaybe<DocumentDrive_ViewFilterInput>;
};

/** Module: Node */
export type DocumentDrive_AddFileInput = {
  documentType: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  parentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_AddFolderInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  parentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_AddListenerInput = {
  listener: DocumentDrive_ListenerInput;
};

export type DocumentDrive_AddTriggerInput = {
  trigger: DocumentDrive_TriggerInput;
};

export type DocumentDrive_CopyNodeInput = {
  srcId: Scalars['ID']['input'];
  targetId: Scalars['ID']['input'];
  targetName?: InputMaybe<Scalars['String']['input']>;
  targetParentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_DeleteNodeInput = {
  id: Scalars['ID']['input'];
};

export type DocumentDrive_DocumentDriveLocalState = {
  __typename?: 'DocumentDrive_DocumentDriveLocalState';
  availableOffline: Scalars['Boolean']['output'];
  listeners: Array<DocumentDrive_Listener>;
  sharingType?: Maybe<Scalars['String']['output']>;
  triggers: Array<DocumentDrive_Trigger>;
};

export type DocumentDrive_DocumentDriveLocalStateInput = {
  availableOffline?: InputMaybe<Scalars['Boolean']['input']>;
  listeners?: InputMaybe<Array<InputMaybe<DocumentDrive_ListenerInput>>>;
  sharingType?: InputMaybe<Scalars['String']['input']>;
  triggers?: InputMaybe<Array<InputMaybe<DocumentDrive_TriggerInput>>>;
};

export type DocumentDrive_DocumentDriveState = {
  __typename?: 'DocumentDrive_DocumentDriveState';
  icon?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nodes: Array<DocumentDrive_Node>;
};

export type DocumentDrive_DocumentDriveStateInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nodes?: InputMaybe<Array<InputMaybe<Scalars['JSONObject']['input']>>>;
};

/** Paginated result type for DocumentDrive documents */
export type DocumentDrive_DocumentResultPage = {
  __typename?: 'DocumentDrive_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<DocumentDriveMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for DocumentDrive */
export type DocumentDrive_DocumentWithChildren = {
  __typename?: 'DocumentDrive_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: DocumentDriveMutationResult;
};

export type DocumentDrive_FileNode = {
  __typename?: 'DocumentDrive_FileNode';
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  kind: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentFolder?: Maybe<Scalars['String']['output']>;
};

export type DocumentDrive_FileNodeInput = {
  documentType?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentFolder?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentDrive_FolderNode = {
  __typename?: 'DocumentDrive_FolderNode';
  id: Scalars['String']['output'];
  kind: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentFolder?: Maybe<Scalars['String']['output']>;
};

/** Input Types for Initial State */
export type DocumentDrive_FolderNodeInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentFolder?: InputMaybe<Scalars['String']['input']>;
};

/** Full state with all scopes for DocumentDrive */
export type DocumentDrive_FullState = {
  __typename?: 'DocumentDrive_FullState';
  auth: Scalars['JSONObject']['output'];
  document: DocumentDrive_PhDocumentScopeState;
  global: DocumentDrive_DocumentDriveState;
  local: DocumentDrive_DocumentDriveLocalState;
};

export type DocumentDrive_InitialStateInput = {
  global?: InputMaybe<DocumentDrive_DocumentDriveStateInput>;
  local?: InputMaybe<DocumentDrive_DocumentDriveLocalStateInput>;
};

export type DocumentDrive_Listener = {
  __typename?: 'DocumentDrive_Listener';
  block: Scalars['Boolean']['output'];
  callInfo?: Maybe<DocumentDrive_ListenerCallInfo>;
  filter: DocumentDrive_ListenerFilter;
  label?: Maybe<Scalars['String']['output']>;
  listenerId: Scalars['ID']['output'];
  system: Scalars['Boolean']['output'];
};

export type DocumentDrive_ListenerCallInfo = {
  __typename?: 'DocumentDrive_ListenerCallInfo';
  data?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transmitterType?: Maybe<DocumentDrive_TransmitterType>;
};

export type DocumentDrive_ListenerCallInfoInput = {
  data?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  transmitterType?: InputMaybe<DocumentDrive_TransmitterType>;
};

export type DocumentDrive_ListenerFilter = {
  __typename?: 'DocumentDrive_ListenerFilter';
  branch?: Maybe<Array<Scalars['String']['output']>>;
  documentId?: Maybe<Array<Scalars['ID']['output']>>;
  documentType: Array<Scalars['String']['output']>;
  scope?: Maybe<Array<Scalars['String']['output']>>;
};

export type DocumentDrive_ListenerFilterInput = {
  branch?: InputMaybe<Array<Scalars['String']['input']>>;
  documentId?: InputMaybe<Array<Scalars['ID']['input']>>;
  documentType?: InputMaybe<Array<Scalars['String']['input']>>;
  scope?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DocumentDrive_ListenerInput = {
  block: Scalars['Boolean']['input'];
  callInfo?: InputMaybe<DocumentDrive_ListenerCallInfoInput>;
  filter: DocumentDrive_ListenerFilterInput;
  label?: InputMaybe<Scalars['String']['input']>;
  listenerId: Scalars['ID']['input'];
  system: Scalars['Boolean']['input'];
};

export type DocumentDrive_MoveNodeInput = {
  srcFolder: Scalars['ID']['input'];
  targetParentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_Node = DocumentDrive_FileNode | DocumentDrive_FolderNode;

/** Document scope state (same for all document types) */
export type DocumentDrive_PhDocumentScopeState = {
  __typename?: 'DocumentDrive_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: DocumentDrive_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type DocumentDrive_PhHashConfig = {
  __typename?: 'DocumentDrive_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type DocumentDrive_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentDrive_PullResponderTriggerData = {
  __typename?: 'DocumentDrive_PullResponderTriggerData';
  interval: Scalars['String']['output'];
  listenerId: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type DocumentDrive_PullResponderTriggerDataInput = {
  interval: Scalars['String']['input'];
  listenerId: Scalars['ID']['input'];
  url: Scalars['String']['input'];
};

export type DocumentDrive_RemoveListenerInput = {
  listenerId: Scalars['String']['input'];
};

export type DocumentDrive_RemoveTriggerInput = {
  triggerId: Scalars['String']['input'];
};

export type DocumentDrive_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentDrive_SetAvailableOfflineInput = {
  availableOffline: Scalars['Boolean']['input'];
};

export type DocumentDrive_SetDriveIconInput = {
  icon: Scalars['String']['input'];
};

/** Module: Drive */
export type DocumentDrive_SetDriveNameInput = {
  name: Scalars['String']['input'];
};

export type DocumentDrive_SetSharingTypeInput = {
  type: Scalars['String']['input'];
};

export type DocumentDrive_TransmitterType =
  | 'Internal'
  | 'MatrixConnect'
  | 'PullResponder'
  | 'RESTWebhook'
  | 'SecureConnect'
  | 'SwitchboardPush';

export type DocumentDrive_Trigger = {
  __typename?: 'DocumentDrive_Trigger';
  data?: Maybe<DocumentDrive_TriggerData>;
  id: Scalars['ID']['output'];
  type: DocumentDrive_TriggerType;
};

export type DocumentDrive_TriggerData = DocumentDrive_PullResponderTriggerData;

export type DocumentDrive_TriggerInput = {
  data?: InputMaybe<DocumentDrive_PullResponderTriggerDataInput>;
  id: Scalars['ID']['input'];
  type: DocumentDrive_TriggerType;
};

export type DocumentDrive_TriggerType =
  | 'PullResponder';

export type DocumentDrive_UpdateFileInput = {
  documentType?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_UpdateNodeInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DocumentEditor = IDocument & {
  __typename?: 'DocumentEditor';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: DocumentEditor_DocumentEditorState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: DocumentEditor_DocumentEditorState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type DocumentEditorOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for DocumentEditor operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type DocumentEditorMutationResult = {
  __typename?: 'DocumentEditorMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: DocumentEditor_FullState;
};

/** Mutations: DocumentEditor */
export type DocumentEditorMutations = {
  __typename?: 'DocumentEditorMutations';
  addDocumentType: DocumentEditorMutationResult;
  addDocumentTypeAsync: Scalars['String']['output'];
  createDocument: DocumentEditorMutationResult;
  createEmptyDocument: DocumentEditorMutationResult;
  removeDocumentType: DocumentEditorMutationResult;
  removeDocumentTypeAsync: Scalars['String']['output'];
  setEditorName: DocumentEditorMutationResult;
  setEditorNameAsync: Scalars['String']['output'];
  setEditorStatus: DocumentEditorMutationResult;
  setEditorStatusAsync: Scalars['String']['output'];
};


/** Mutations: DocumentEditor */
export type DocumentEditorMutationsAddDocumentTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentEditor_AddDocumentTypeInput;
};


/** Mutations: DocumentEditor */
export type DocumentEditorMutationsAddDocumentTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentEditor_AddDocumentTypeInput;
};


/** Mutations: DocumentEditor */
export type DocumentEditorMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<DocumentEditor_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DocumentEditor */
export type DocumentEditorMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DocumentEditor */
export type DocumentEditorMutationsRemoveDocumentTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentEditor_RemoveDocumentTypeInput;
};


/** Mutations: DocumentEditor */
export type DocumentEditorMutationsRemoveDocumentTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentEditor_RemoveDocumentTypeInput;
};


/** Mutations: DocumentEditor */
export type DocumentEditorMutationsSetEditorNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentEditor_SetEditorNameInput;
};


/** Mutations: DocumentEditor */
export type DocumentEditorMutationsSetEditorNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentEditor_SetEditorNameInput;
};


/** Mutations: DocumentEditor */
export type DocumentEditorMutationsSetEditorStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentEditor_SetEditorStatusInput;
};


/** Mutations: DocumentEditor */
export type DocumentEditorMutationsSetEditorStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentEditor_SetEditorStatusInput;
};

/** Queries: DocumentEditor Document */
export type DocumentEditorQueries = {
  __typename?: 'DocumentEditorQueries';
  /** Get a specific DocumentEditor document by identifier */
  document?: Maybe<DocumentEditor_DocumentWithChildren>;
  /** Get children of a DocumentEditor document */
  documentChildren: DocumentEditor_DocumentResultPage;
  /** Get parents of a DocumentEditor document */
  documentParents: DocumentEditor_DocumentResultPage;
  /** Get all DocumentEditor documents (paged) */
  documents: DocumentEditor_DocumentResultPage;
  /** Find DocumentEditor documents by search criteria */
  findDocuments: DocumentEditor_DocumentResultPage;
};


/** Queries: DocumentEditor Document */
export type DocumentEditorQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<DocumentEditor_ViewFilterInput>;
};


/** Queries: DocumentEditor Document */
export type DocumentEditorQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<DocumentEditor_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<DocumentEditor_ViewFilterInput>;
};


/** Queries: DocumentEditor Document */
export type DocumentEditorQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<DocumentEditor_PagingInput>;
  view?: InputMaybe<DocumentEditor_ViewFilterInput>;
};


/** Queries: DocumentEditor Document */
export type DocumentEditorQueriesDocumentsArgs = {
  paging?: InputMaybe<DocumentEditor_PagingInput>;
};


/** Queries: DocumentEditor Document */
export type DocumentEditorQueriesFindDocumentsArgs = {
  paging?: InputMaybe<DocumentEditor_PagingInput>;
  search?: InputMaybe<DocumentEditor_SearchFilterInput>;
  view?: InputMaybe<DocumentEditor_ViewFilterInput>;
};

export type DocumentEditor_AddDocumentTypeInput = {
  documentType: Scalars['String']['input'];
  id: Scalars['OID']['input'];
};

export type DocumentEditor_DocumentEditorState = {
  __typename?: 'DocumentEditor_DocumentEditorState';
  documentTypes: Array<DocumentEditor_DocumentTypeItem>;
  name: Scalars['String']['output'];
  status: DocumentEditor_StatusType;
};

/** Input Types for Initial State */
export type DocumentEditor_DocumentEditorStateInput = {
  documentTypes?: InputMaybe<Array<InputMaybe<DocumentEditor_DocumentTypeItemInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DocumentEditor_StatusType>;
};

/** Paginated result type for DocumentEditor documents */
export type DocumentEditor_DocumentResultPage = {
  __typename?: 'DocumentEditor_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<DocumentEditorMutationResult>;
  totalCount: Scalars['Int']['output'];
};

export type DocumentEditor_DocumentTypeItem = {
  __typename?: 'DocumentEditor_DocumentTypeItem';
  documentType: Scalars['String']['output'];
  id: Scalars['OID']['output'];
};

export type DocumentEditor_DocumentTypeItemInput = {
  documentType?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
};

/** Document with children for DocumentEditor */
export type DocumentEditor_DocumentWithChildren = {
  __typename?: 'DocumentEditor_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: DocumentEditorMutationResult;
};

/** Full state with all scopes for DocumentEditor */
export type DocumentEditor_FullState = {
  __typename?: 'DocumentEditor_FullState';
  auth: Scalars['JSONObject']['output'];
  document: DocumentEditor_PhDocumentScopeState;
  global: DocumentEditor_DocumentEditorState;
  local: Scalars['JSONObject']['output'];
};

export type DocumentEditor_InitialStateInput = {
  global?: InputMaybe<DocumentEditor_DocumentEditorStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type DocumentEditor_PhDocumentScopeState = {
  __typename?: 'DocumentEditor_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: DocumentEditor_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type DocumentEditor_PhHashConfig = {
  __typename?: 'DocumentEditor_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type DocumentEditor_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentEditor_RemoveDocumentTypeInput = {
  id: Scalars['OID']['input'];
};

export type DocumentEditor_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

/** Module: BaseOperations */
export type DocumentEditor_SetEditorNameInput = {
  name: Scalars['String']['input'];
};

export type DocumentEditor_SetEditorStatusInput = {
  status: DocumentEditor_StatusType;
};

export type DocumentEditor_StatusType =
  | 'CONFIRMED'
  | 'DRAFT';

export type DocumentEditor_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DocumentModel = IDocument & {
  __typename?: 'DocumentModel';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type DocumentModelOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentModelGlobalState = {
  __typename?: 'DocumentModelGlobalState';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  namespace?: Maybe<Scalars['String']['output']>;
  specification: Scalars['JSONObject']['output'];
  version?: Maybe<Scalars['String']['output']>;
};

/**
 * Mutation result type for DocumentModel operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type DocumentModelMutationResult = {
  __typename?: 'DocumentModelMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: DocumentModel_FullState;
};

/** Mutations: DocumentModel */
export type DocumentModelMutations = {
  __typename?: 'DocumentModelMutations';
  addChangeLogItem: DocumentModelMutationResult;
  addChangeLogItemAsync: Scalars['String']['output'];
  addModule: DocumentModelMutationResult;
  addModuleAsync: Scalars['String']['output'];
  addOperation: DocumentModelMutationResult;
  addOperationAsync: Scalars['String']['output'];
  addOperationError: DocumentModelMutationResult;
  addOperationErrorAsync: Scalars['String']['output'];
  addOperationExample: DocumentModelMutationResult;
  addOperationExampleAsync: Scalars['String']['output'];
  addStateExample: DocumentModelMutationResult;
  addStateExampleAsync: Scalars['String']['output'];
  createDocument: DocumentModelMutationResult;
  createEmptyDocument: DocumentModelMutationResult;
  deleteChangeLogItem: DocumentModelMutationResult;
  deleteChangeLogItemAsync: Scalars['String']['output'];
  deleteModule: DocumentModelMutationResult;
  deleteModuleAsync: Scalars['String']['output'];
  deleteOperation: DocumentModelMutationResult;
  deleteOperationAsync: Scalars['String']['output'];
  deleteOperationError: DocumentModelMutationResult;
  deleteOperationErrorAsync: Scalars['String']['output'];
  deleteOperationExample: DocumentModelMutationResult;
  deleteOperationExampleAsync: Scalars['String']['output'];
  deleteStateExample: DocumentModelMutationResult;
  deleteStateExampleAsync: Scalars['String']['output'];
  moveOperation: DocumentModelMutationResult;
  moveOperationAsync: Scalars['String']['output'];
  reorderChangeLogItems: DocumentModelMutationResult;
  reorderChangeLogItemsAsync: Scalars['String']['output'];
  reorderModuleOperations: DocumentModelMutationResult;
  reorderModuleOperationsAsync: Scalars['String']['output'];
  reorderModules: DocumentModelMutationResult;
  reorderModulesAsync: Scalars['String']['output'];
  reorderOperationErrors: DocumentModelMutationResult;
  reorderOperationErrorsAsync: Scalars['String']['output'];
  reorderOperationExamples: DocumentModelMutationResult;
  reorderOperationExamplesAsync: Scalars['String']['output'];
  reorderStateExamples: DocumentModelMutationResult;
  reorderStateExamplesAsync: Scalars['String']['output'];
  setAuthorName: DocumentModelMutationResult;
  setAuthorNameAsync: Scalars['String']['output'];
  setAuthorWebsite: DocumentModelMutationResult;
  setAuthorWebsiteAsync: Scalars['String']['output'];
  setInitialState: DocumentModelMutationResult;
  setInitialStateAsync: Scalars['String']['output'];
  setModelDescription: DocumentModelMutationResult;
  setModelDescriptionAsync: Scalars['String']['output'];
  setModelExtension: DocumentModelMutationResult;
  setModelExtensionAsync: Scalars['String']['output'];
  setModelId: DocumentModelMutationResult;
  setModelIdAsync: Scalars['String']['output'];
  setModelName: DocumentModelMutationResult;
  setModelNameAsync: Scalars['String']['output'];
  setModuleDescription: DocumentModelMutationResult;
  setModuleDescriptionAsync: Scalars['String']['output'];
  setModuleName: DocumentModelMutationResult;
  setModuleNameAsync: Scalars['String']['output'];
  setOperationDescription: DocumentModelMutationResult;
  setOperationDescriptionAsync: Scalars['String']['output'];
  setOperationErrorCode: DocumentModelMutationResult;
  setOperationErrorCodeAsync: Scalars['String']['output'];
  setOperationErrorDescription: DocumentModelMutationResult;
  setOperationErrorDescriptionAsync: Scalars['String']['output'];
  setOperationErrorName: DocumentModelMutationResult;
  setOperationErrorNameAsync: Scalars['String']['output'];
  setOperationErrorTemplate: DocumentModelMutationResult;
  setOperationErrorTemplateAsync: Scalars['String']['output'];
  setOperationName: DocumentModelMutationResult;
  setOperationNameAsync: Scalars['String']['output'];
  setOperationReducer: DocumentModelMutationResult;
  setOperationReducerAsync: Scalars['String']['output'];
  setOperationSchema: DocumentModelMutationResult;
  setOperationSchemaAsync: Scalars['String']['output'];
  setOperationScope: DocumentModelMutationResult;
  setOperationScopeAsync: Scalars['String']['output'];
  setOperationTemplate: DocumentModelMutationResult;
  setOperationTemplateAsync: Scalars['String']['output'];
  setStateSchema: DocumentModelMutationResult;
  setStateSchemaAsync: Scalars['String']['output'];
  updateChangeLogItem: DocumentModelMutationResult;
  updateChangeLogItemAsync: Scalars['String']['output'];
  updateOperationExample: DocumentModelMutationResult;
  updateOperationExampleAsync: Scalars['String']['output'];
  updateStateExample: DocumentModelMutationResult;
  updateStateExampleAsync: Scalars['String']['output'];
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddChangeLogItemArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddChangeLogItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddModuleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddModuleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddModuleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddModuleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationErrorArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationErrorInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationErrorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationErrorInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddStateExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddStateExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddStateExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddStateExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<DocumentModel_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteChangeLogItemArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteChangeLogItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteModuleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteModuleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteModuleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteModuleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationErrorArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationErrorInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationErrorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationErrorInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteStateExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteStateExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteStateExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteStateExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsMoveOperationArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_MoveOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsMoveOperationAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_MoveOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderChangeLogItemsArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderChangeLogItemsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderChangeLogItemsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderChangeLogItemsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderModuleOperationsArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderModuleOperationsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderModuleOperationsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderModuleOperationsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderModulesArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderModulesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderModulesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderModulesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderOperationErrorsArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderOperationErrorsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderOperationErrorsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderOperationErrorsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderOperationExamplesArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderOperationExamplesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderOperationExamplesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderOperationExamplesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderStateExamplesArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderStateExamplesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderStateExamplesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderStateExamplesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetAuthorNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetAuthorNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetAuthorNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetAuthorNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetAuthorWebsiteArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetAuthorWebsiteInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetAuthorWebsiteAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetAuthorWebsiteInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetInitialStateArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetInitialStateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetInitialStateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetInitialStateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelDescriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelDescriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelExtensionArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelExtensionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelExtensionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelExtensionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelIdArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelIdInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelIdAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelIdInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModuleDescriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModuleDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModuleDescriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModuleDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModuleNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModuleNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModuleNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModuleNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationDescriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationDescriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorCodeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorCodeInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorCodeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorCodeInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorDescriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorDescriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorTemplateArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorTemplateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorTemplateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorTemplateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationReducerArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationReducerInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationReducerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationReducerInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationSchemaArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationSchemaInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationSchemaAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationSchemaInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationScopeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationScopeInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationScopeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationScopeInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationTemplateArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationTemplateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationTemplateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationTemplateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetStateSchemaArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetStateSchemaInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetStateSchemaAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetStateSchemaInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateChangeLogItemArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateChangeLogItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateOperationExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateOperationExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateStateExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateStateExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateStateExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateStateExampleInput;
};

/** Queries: DocumentModel Document */
export type DocumentModelQueries = {
  __typename?: 'DocumentModelQueries';
  /** Get a specific DocumentModel document by identifier */
  document?: Maybe<DocumentModel_DocumentWithChildren>;
  /** Get children of a DocumentModel document */
  documentChildren: DocumentModel_DocumentResultPage;
  /** Get parents of a DocumentModel document */
  documentParents: DocumentModel_DocumentResultPage;
  /** Get all DocumentModel documents (paged) */
  documents: DocumentModel_DocumentResultPage;
  /** Find DocumentModel documents by search criteria */
  findDocuments: DocumentModel_DocumentResultPage;
};


/** Queries: DocumentModel Document */
export type DocumentModelQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<DocumentModel_ViewFilterInput>;
};


/** Queries: DocumentModel Document */
export type DocumentModelQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<DocumentModel_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<DocumentModel_ViewFilterInput>;
};


/** Queries: DocumentModel Document */
export type DocumentModelQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<DocumentModel_PagingInput>;
  view?: InputMaybe<DocumentModel_ViewFilterInput>;
};


/** Queries: DocumentModel Document */
export type DocumentModelQueriesDocumentsArgs = {
  paging?: InputMaybe<DocumentModel_PagingInput>;
};


/** Queries: DocumentModel Document */
export type DocumentModelQueriesFindDocumentsArgs = {
  paging?: InputMaybe<DocumentModel_PagingInput>;
  search?: InputMaybe<DocumentModel_SearchFilterInput>;
  view?: InputMaybe<DocumentModel_ViewFilterInput>;
};

export type DocumentModelResultPage = {
  __typename?: 'DocumentModelResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<DocumentModelGlobalState>;
  totalCount: Scalars['Int']['output'];
};

/** Module: Versioning */
export type DocumentModel_AddChangeLogItemInput = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  insertBefore?: InputMaybe<Scalars['ID']['input']>;
};

/** Module: Module */
export type DocumentModel_AddModuleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

/** Module: OperationError */
export type DocumentModel_AddOperationErrorInput = {
  errorCode?: InputMaybe<Scalars['String']['input']>;
  errorDescription?: InputMaybe<Scalars['String']['input']>;
  errorName?: InputMaybe<Scalars['String']['input']>;
  errorTemplate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  operationId: Scalars['ID']['input'];
};

/** Module: OperationExample */
export type DocumentModel_AddOperationExampleInput = {
  example: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  operationId: Scalars['ID']['input'];
};

/** Module: Operation */
export type DocumentModel_AddOperationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  moduleId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  reducer?: InputMaybe<Scalars['String']['input']>;
  schema?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_AddStateExampleInput = {
  example: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  insertBefore?: InputMaybe<Scalars['ID']['input']>;
  scope: Scalars['String']['input'];
};

export type DocumentModel_Author = {
  __typename?: 'DocumentModel_Author';
  name: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type DocumentModel_AuthorInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_CodeExample = {
  __typename?: 'DocumentModel_CodeExample';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

/** Input Types for Initial State */
export type DocumentModel_CodeExampleInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_DeleteChangeLogItemInput = {
  id: Scalars['ID']['input'];
};

export type DocumentModel_DeleteModuleInput = {
  id: Scalars['ID']['input'];
};

export type DocumentModel_DeleteOperationErrorInput = {
  id: Scalars['ID']['input'];
};

export type DocumentModel_DeleteOperationExampleInput = {
  id: Scalars['ID']['input'];
};

export type DocumentModel_DeleteOperationInput = {
  id: Scalars['ID']['input'];
};

export type DocumentModel_DeleteStateExampleInput = {
  id: Scalars['ID']['input'];
  scope: Scalars['String']['input'];
};

export type DocumentModel_DocumentModelGlobalState = {
  __typename?: 'DocumentModel_DocumentModelGlobalState';
  author: DocumentModel_Author;
  description: Scalars['String']['output'];
  extension: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  specifications: Array<DocumentModel_DocumentSpecification>;
};

export type DocumentModel_DocumentModelGlobalStateInput = {
  author?: InputMaybe<DocumentModel_AuthorInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  extension?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  specifications?: InputMaybe<Array<InputMaybe<DocumentModel_DocumentSpecificationInput>>>;
};

/** Paginated result type for DocumentModel documents */
export type DocumentModel_DocumentResultPage = {
  __typename?: 'DocumentModel_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<DocumentModelMutationResult>;
  totalCount: Scalars['Int']['output'];
};

export type DocumentModel_DocumentSpecification = {
  __typename?: 'DocumentModel_DocumentSpecification';
  changeLog: Array<Scalars['String']['output']>;
  modules: Array<DocumentModel_Module>;
  state: DocumentModel_ScopeState;
  version: Scalars['Int']['output'];
};

export type DocumentModel_DocumentSpecificationInput = {
  changeLog?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  modules?: InputMaybe<Array<InputMaybe<DocumentModel_ModuleInput>>>;
  state?: InputMaybe<DocumentModel_ScopeStateInput>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** Document with children for DocumentModel */
export type DocumentModel_DocumentWithChildren = {
  __typename?: 'DocumentModel_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: DocumentModelMutationResult;
};

/** Full state with all scopes for DocumentModel */
export type DocumentModel_FullState = {
  __typename?: 'DocumentModel_FullState';
  auth: Scalars['JSONObject']['output'];
  document: DocumentModel_PhDocumentScopeState;
  global: DocumentModel_DocumentModelGlobalState;
  local: Scalars['JSONObject']['output'];
};

export type DocumentModel_InitialStateInput = {
  global?: InputMaybe<DocumentModel_DocumentModelGlobalStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type DocumentModel_Module = {
  __typename?: 'DocumentModel_Module';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  operations: Array<DocumentModel_Operation>;
};

export type DocumentModel_ModuleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  operations?: InputMaybe<Array<InputMaybe<DocumentModel_OperationInput>>>;
};

export type DocumentModel_MoveOperationInput = {
  newModuleId: Scalars['ID']['input'];
  operationId: Scalars['ID']['input'];
};

export type DocumentModel_Operation = {
  __typename?: 'DocumentModel_Operation';
  description?: Maybe<Scalars['String']['output']>;
  errors: Array<DocumentModel_OperationError>;
  examples: Array<DocumentModel_CodeExample>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  reducer?: Maybe<Scalars['String']['output']>;
  schema?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  template?: Maybe<Scalars['String']['output']>;
};

export type DocumentModel_OperationError = {
  __typename?: 'DocumentModel_OperationError';
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  template?: Maybe<Scalars['String']['output']>;
};

export type DocumentModel_OperationErrorInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_OperationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  errors?: InputMaybe<Array<InputMaybe<DocumentModel_OperationErrorInput>>>;
  examples?: InputMaybe<Array<InputMaybe<DocumentModel_CodeExampleInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  reducer?: InputMaybe<Scalars['String']['input']>;
  schema?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['String']['input']>;
};

/** Document scope state (same for all document types) */
export type DocumentModel_PhDocumentScopeState = {
  __typename?: 'DocumentModel_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: DocumentModel_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type DocumentModel_PhHashConfig = {
  __typename?: 'DocumentModel_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type DocumentModel_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentModel_ReorderChangeLogItemsInput = {
  order: Array<Scalars['ID']['input']>;
};

export type DocumentModel_ReorderModuleOperationsInput = {
  moduleId: Scalars['ID']['input'];
  order: Array<Scalars['ID']['input']>;
};

export type DocumentModel_ReorderModulesInput = {
  order: Array<Scalars['ID']['input']>;
};

export type DocumentModel_ReorderOperationErrorsInput = {
  operationId: Scalars['ID']['input'];
  order: Array<Scalars['ID']['input']>;
};

export type DocumentModel_ReorderOperationExamplesInput = {
  operationId: Scalars['ID']['input'];
  order: Array<Scalars['ID']['input']>;
};

export type DocumentModel_ReorderStateExamplesInput = {
  order: Array<Scalars['ID']['input']>;
  scope: Scalars['String']['input'];
};

export type DocumentModel_ScopeState = {
  __typename?: 'DocumentModel_ScopeState';
  global: DocumentModel_State;
  local: DocumentModel_State;
};

export type DocumentModel_ScopeStateInput = {
  global?: InputMaybe<DocumentModel_StateInput>;
  local?: InputMaybe<DocumentModel_StateInput>;
};

export type DocumentModel_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetAuthorNameInput = {
  authorName: Scalars['String']['input'];
};

export type DocumentModel_SetAuthorWebsiteInput = {
  authorWebsite: Scalars['String']['input'];
};

export type DocumentModel_SetInitialStateInput = {
  initialValue: Scalars['String']['input'];
  scope: Scalars['String']['input'];
};

export type DocumentModel_SetModelDescriptionInput = {
  description: Scalars['String']['input'];
};

export type DocumentModel_SetModelExtensionInput = {
  extension: Scalars['String']['input'];
};

export type DocumentModel_SetModelIdInput = {
  id: Scalars['String']['input'];
};

/** Module: Header */
export type DocumentModel_SetModelNameInput = {
  name: Scalars['String']['input'];
};

export type DocumentModel_SetModuleDescriptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetModuleNameInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetOperationDescriptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetOperationErrorCodeInput = {
  errorCode?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetOperationErrorDescriptionInput = {
  errorDescription?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetOperationErrorNameInput = {
  errorName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetOperationErrorTemplateInput = {
  errorTemplate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetOperationNameInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetOperationReducerInput = {
  id: Scalars['ID']['input'];
  reducer?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetOperationSchemaInput = {
  id: Scalars['ID']['input'];
  schema?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetOperationScopeInput = {
  id: Scalars['ID']['input'];
  scope?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetOperationTemplateInput = {
  id: Scalars['ID']['input'];
  template?: InputMaybe<Scalars['String']['input']>;
};

/** Module: State */
export type DocumentModel_SetStateSchemaInput = {
  schema: Scalars['String']['input'];
  scope: Scalars['String']['input'];
};

export type DocumentModel_State = {
  __typename?: 'DocumentModel_State';
  examples: Array<DocumentModel_CodeExample>;
  initialValue: Scalars['String']['output'];
  schema: Scalars['String']['output'];
};

export type DocumentModel_StateInput = {
  examples?: InputMaybe<Array<InputMaybe<DocumentModel_CodeExampleInput>>>;
  initialValue?: InputMaybe<Scalars['String']['input']>;
  schema?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_UpdateChangeLogItemInput = {
  id: Scalars['ID']['input'];
  newContent: Scalars['String']['input'];
};

export type DocumentModel_UpdateOperationExampleInput = {
  example: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type DocumentModel_UpdateStateExampleInput = {
  id: Scalars['ID']['input'];
  newExample: Scalars['String']['input'];
  scope: Scalars['String']['input'];
};

export type DocumentModel_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DocumentOperationsFilterInput = {
  actionTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
  sinceRevision?: InputMaybe<Scalars['Int']['input']>;
  timestampFrom?: InputMaybe<Scalars['String']['input']>;
  timestampTo?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentWithChildren = {
  __typename?: 'DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: PhDocument;
};

export type DriveDocument = IDocument & {
  __typename?: 'DriveDocument';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type DriveDocumentOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type ExternalDependency = IDocument & {
  __typename?: 'ExternalDependency';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ExternalDependency_ExternalDependencyState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: ExternalDependency_ExternalDependencyState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type ExternalDependencyOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for ExternalDependency operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type ExternalDependencyMutationResult = {
  __typename?: 'ExternalDependencyMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: ExternalDependency_FullState;
};

/** Mutations: ExternalDependency */
export type ExternalDependencyMutations = {
  __typename?: 'ExternalDependencyMutations';
  abandon: ExternalDependencyMutationResult;
  abandonAsync: Scalars['String']['output'];
  createDocument: ExternalDependencyMutationResult;
  createEmptyDocument: ExternalDependencyMutationResult;
  linkPledge: ExternalDependencyMutationResult;
  linkPledgeAsync: Scalars['String']['output'];
  resolve: ExternalDependencyMutationResult;
  resolveAsync: Scalars['String']['output'];
  setDependencyDetails: ExternalDependencyMutationResult;
  setDependencyDetailsAsync: Scalars['String']['output'];
  setExternalRef: ExternalDependencyMutationResult;
  setExternalRefAsync: Scalars['String']['output'];
  unlinkPledge: ExternalDependencyMutationResult;
  unlinkPledgeAsync: Scalars['String']['output'];
  updateStatus: ExternalDependencyMutationResult;
  updateStatusAsync: Scalars['String']['output'];
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsAbandonArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_AbandonInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsAbandonAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_AbandonInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<ExternalDependency_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsLinkPledgeArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_LinkPledgeInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsLinkPledgeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_LinkPledgeInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsResolveArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_ResolveInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsResolveAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_ResolveInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsSetDependencyDetailsArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_SetDependencyDetailsInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsSetDependencyDetailsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_SetDependencyDetailsInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsSetExternalRefArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_SetExternalRefInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsSetExternalRefAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_SetExternalRefInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsUnlinkPledgeArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_UnlinkPledgeInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsUnlinkPledgeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_UnlinkPledgeInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsUpdateStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_UpdateStatusInput;
};


/** Mutations: ExternalDependency */
export type ExternalDependencyMutationsUpdateStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExternalDependency_UpdateStatusInput;
};

/** Queries: ExternalDependency Document */
export type ExternalDependencyQueries = {
  __typename?: 'ExternalDependencyQueries';
  /** Get a specific ExternalDependency document by identifier */
  document?: Maybe<ExternalDependency_DocumentWithChildren>;
  /** Get children of a ExternalDependency document */
  documentChildren: ExternalDependency_DocumentResultPage;
  /** Get parents of a ExternalDependency document */
  documentParents: ExternalDependency_DocumentResultPage;
  /** Get all ExternalDependency documents (paged) */
  documents: ExternalDependency_DocumentResultPage;
  /** Find ExternalDependency documents by search criteria */
  findDocuments: ExternalDependency_DocumentResultPage;
};


/** Queries: ExternalDependency Document */
export type ExternalDependencyQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<ExternalDependency_ViewFilterInput>;
};


/** Queries: ExternalDependency Document */
export type ExternalDependencyQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<ExternalDependency_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ExternalDependency_ViewFilterInput>;
};


/** Queries: ExternalDependency Document */
export type ExternalDependencyQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<ExternalDependency_PagingInput>;
  view?: InputMaybe<ExternalDependency_ViewFilterInput>;
};


/** Queries: ExternalDependency Document */
export type ExternalDependencyQueriesDocumentsArgs = {
  paging?: InputMaybe<ExternalDependency_PagingInput>;
};


/** Queries: ExternalDependency Document */
export type ExternalDependencyQueriesFindDocumentsArgs = {
  paging?: InputMaybe<ExternalDependency_PagingInput>;
  search?: InputMaybe<ExternalDependency_SearchFilterInput>;
  view?: InputMaybe<ExternalDependency_ViewFilterInput>;
};

export type ExternalDependency_AbandonInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExternalDependency_DependencyKind =
  | 'COUNCIL_ACTION'
  | 'GOVERNANCE_VOTE'
  | 'ONCHAIN_TX'
  | 'OPERATIONAL'
  | 'OTHER';

export type ExternalDependency_DependencyRef = {
  __typename?: 'ExternalDependency_DependencyRef';
  proposalId?: Maybe<Scalars['String']['output']>;
  txHash?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['URL']['output']>;
};

export type ExternalDependency_DependencyRefInput = {
  proposalId?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['URL']['input']>;
};

export type ExternalDependency_DependencyStatus =
  | 'ABANDONED'
  | 'BLOCKED'
  | 'IN_PROGRESS'
  | 'OPEN'
  | 'RESOLVED';

/** Paginated result type for ExternalDependency documents */
export type ExternalDependency_DocumentResultPage = {
  __typename?: 'ExternalDependency_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<ExternalDependencyMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for ExternalDependency */
export type ExternalDependency_DocumentWithChildren = {
  __typename?: 'ExternalDependency_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: ExternalDependencyMutationResult;
};

export type ExternalDependency_ExternalDependencyState = {
  __typename?: 'ExternalDependency_ExternalDependencyState';
  assignee?: Maybe<Scalars['String']['output']>;
  blocks: Array<Scalars['PHID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expectedResolution?: Maybe<Scalars['DateTime']['output']>;
  externalRef?: Maybe<ExternalDependency_DependencyRef>;
  kind: ExternalDependency_DependencyKind;
  status: ExternalDependency_DependencyStatus;
  title: Scalars['String']['output'];
};

/** Input Types for Initial State */
export type ExternalDependency_ExternalDependencyStateInput = {
  assignee?: InputMaybe<Scalars['String']['input']>;
  blocks?: InputMaybe<Array<InputMaybe<Scalars['PHID']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  expectedResolution?: InputMaybe<Scalars['DateTime']['input']>;
  externalRef?: InputMaybe<ExternalDependency_DependencyRefInput>;
  kind?: InputMaybe<ExternalDependency_DependencyKind>;
  status?: InputMaybe<ExternalDependency_DependencyStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Full state with all scopes for ExternalDependency */
export type ExternalDependency_FullState = {
  __typename?: 'ExternalDependency_FullState';
  auth: Scalars['JSONObject']['output'];
  document: ExternalDependency_PhDocumentScopeState;
  global: ExternalDependency_ExternalDependencyState;
  local: Scalars['JSONObject']['output'];
};

export type ExternalDependency_InitialStateInput = {
  global?: InputMaybe<ExternalDependency_ExternalDependencyStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type ExternalDependency_LinkPledgeInput = {
  pledgeId: Scalars['PHID']['input'];
};

/** Document scope state (same for all document types) */
export type ExternalDependency_PhDocumentScopeState = {
  __typename?: 'ExternalDependency_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: ExternalDependency_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type ExternalDependency_PhHashConfig = {
  __typename?: 'ExternalDependency_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type ExternalDependency_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ExternalDependency_ResolveInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExternalDependency_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

/** Module: Tracking */
export type ExternalDependency_SetDependencyDetailsInput = {
  assignee?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expectedResolution?: InputMaybe<Scalars['DateTime']['input']>;
  kind?: InputMaybe<ExternalDependency_DependencyKind>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ExternalDependency_SetExternalRefInput = {
  proposalId?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['URL']['input']>;
};

export type ExternalDependency_UnlinkPledgeInput = {
  pledgeId: Scalars['PHID']['input'];
};

export type ExternalDependency_UpdateStatusInput = {
  status: ExternalDependency_DependencyStatus;
};

export type ExternalDependency_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GqlDocument = IDocument & {
  __typename?: 'GqlDocument';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type GqlDocumentOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type IDocument = {
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type IDocumentOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type JobChangeEvent = {
  __typename?: 'JobChangeEvent';
  error?: Maybe<Scalars['String']['output']>;
  jobId: Scalars['String']['output'];
  result: Scalars['JSONObject']['output'];
  status: Scalars['String']['output'];
};

export type JobInfo = {
  __typename?: 'JobInfo';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  result: Scalars['JSONObject']['output'];
  status: Scalars['String']['output'];
};

export type MoveChildrenResult = {
  __typename?: 'MoveChildrenResult';
  source: PhDocument;
  target: PhDocument;
};

export type MultiCurrencyConversions = {
  conversions: Array<InputMaybe<CurrencyConversion>>;
  currency?: InputMaybe<Scalars['String']['input']>;
  /** List of dimensions to filter by, such as 'budget' or 'project' */
  dimensions?: InputMaybe<Array<InputMaybe<AnalyticsFilterDimension>>>;
  end?: InputMaybe<Scalars['String']['input']>;
  /** Period to group by */
  granularity?: InputMaybe<AnalyticsGranularity>;
  /** List of metrics to filter by, such as 'budget' or 'actuals' */
  metrics?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  start?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type Mutation = {
  __typename?: 'Mutation';
  AppModule: AppModuleMutations;
  ContributorProfile: ContributorProfileMutations;
  DefiUnited_attachReceiptToPledge: DefiUnited_OperationResult;
  DefiUnited_cancelPledge: DefiUnited_OperationResult;
  DefiUnited_markPledgeConfirmed: DefiUnited_OperationResult;
  DefiUnited_publishStatusUpdate: DefiUnited_OperationResult;
  DefiUnited_resolveDependency: DefiUnited_OperationResult;
  DistributionPlan: DistributionPlanMutations;
  DocumentDrive: DocumentDriveMutations;
  DocumentEditor: DocumentEditorMutations;
  DocumentModel: DocumentModelMutations;
  ExternalDependency: ExternalDependencyMutations;
  OnchainReceipt: OnchainReceiptMutations;
  Pledge: PledgeMutations;
  ProcessorModule: ProcessorModuleMutations;
  ReliefCampaign: ReliefCampaignMutations;
  StatusUpdate: StatusUpdateMutations;
  SubgraphModule: SubgraphModuleMutations;
  VetraPackage: VetraPackageMutations;
  addChildren: PhDocument;
  createDocument: PhDocument;
  createEmptyDocument: PhDocument;
  deleteDocument: Scalars['Boolean']['output'];
  deleteDocuments: Scalars['Boolean']['output'];
  moveChildren: MoveChildrenResult;
  mutateDocument: PhDocument;
  mutateDocumentAsync: Scalars['String']['output'];
  pushSyncEnvelopes: Scalars['Boolean']['output'];
  removeChildren: PhDocument;
  renameDocument: PhDocument;
  touchChannel: TouchChannelResult;
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationDefiUnited_AttachReceiptToPledgeArgs = {
  campaignSlug: Scalars['String']['input'];
  pledgeId: Scalars['String']['input'];
  receiptId: Scalars['String']['input'];
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationDefiUnited_CancelPledgeArgs = {
  campaignSlug: Scalars['String']['input'];
  pledgeId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationDefiUnited_MarkPledgeConfirmedArgs = {
  campaignSlug: Scalars['String']['input'];
  pledgeId: Scalars['String']['input'];
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationDefiUnited_PublishStatusUpdateArgs = {
  campaignSlug: Scalars['String']['input'];
  publishedAt: Scalars['String']['input'];
  updateId: Scalars['String']['input'];
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationDefiUnited_ResolveDependencyArgs = {
  campaignSlug: Scalars['String']['input'];
  dependencyId: Scalars['String']['input'];
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationAddChildrenArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  documentIdentifiers: Array<Scalars['String']['input']>;
  parentIdentifier: Scalars['String']['input'];
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationCreateDocumentArgs = {
  document: Scalars['JSONObject']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationCreateEmptyDocumentArgs = {
  documentType: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationDeleteDocumentArgs = {
  identifier: Scalars['String']['input'];
  propagate?: InputMaybe<PropagationMode>;
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationDeleteDocumentsArgs = {
  identifiers: Array<Scalars['String']['input']>;
  propagate?: InputMaybe<PropagationMode>;
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationMoveChildrenArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  documentIdentifiers: Array<Scalars['String']['input']>;
  sourceParentIdentifier: Scalars['String']['input'];
  targetParentIdentifier: Scalars['String']['input'];
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationMutateDocumentArgs = {
  actions: Array<Scalars['JSONObject']['input']>;
  documentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ViewFilterInput>;
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationMutateDocumentAsyncArgs = {
  actions: Array<Scalars['JSONObject']['input']>;
  documentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ViewFilterInput>;
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationPushSyncEnvelopesArgs = {
  envelopes: Array<SyncEnvelopeInput>;
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationRemoveChildrenArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  documentIdentifiers: Array<Scalars['String']['input']>;
  parentIdentifier: Scalars['String']['input'];
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationRenameDocumentArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  documentIdentifier: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


/**
 * Operator-only mutation API for DeFi United relief campaigns.
 *
 * Authentication: requires a Renown DID bearer token in the
 * `Authorization: Bearer <jwt>` header. The recovered wallet address
 * must be listed in the target campaign's `operatorWallets`. Mints the
 * bearer token client-side via @powerhousedao/reactor-browser:
 * `renown.getBearerToken({ expiresIn: 600 })` — do NOT pass an `aud`
 * claim or the verifier will reject the token.
 */
export type MutationTouchChannelArgs = {
  input: TouchChannelInput;
};

export type OnchainReceipt = IDocument & {
  __typename?: 'OnchainReceipt';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: OnchainReceipt_OnchainReceiptState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: OnchainReceipt_OnchainReceiptState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type OnchainReceiptOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for OnchainReceipt operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type OnchainReceiptMutationResult = {
  __typename?: 'OnchainReceiptMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: OnchainReceipt_FullState;
};

/** Mutations: OnchainReceipt */
export type OnchainReceiptMutations = {
  __typename?: 'OnchainReceiptMutations';
  attachPledge: OnchainReceiptMutationResult;
  attachPledgeAsync: Scalars['String']['output'];
  clearMatch: OnchainReceiptMutationResult;
  clearMatchAsync: Scalars['String']['output'];
  createDocument: OnchainReceiptMutationResult;
  createEmptyDocument: OnchainReceiptMutationResult;
  markAmbiguous: OnchainReceiptMutationResult;
  markAmbiguousAsync: Scalars['String']['output'];
  overrideMatch: OnchainReceiptMutationResult;
  overrideMatchAsync: Scalars['String']['output'];
  recordReceipt: OnchainReceiptMutationResult;
  recordReceiptAsync: Scalars['String']['output'];
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsAttachPledgeArgs = {
  docId: Scalars['PHID']['input'];
  input: OnchainReceipt_AttachPledgeInput;
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsAttachPledgeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: OnchainReceipt_AttachPledgeInput;
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsClearMatchArgs = {
  docId: Scalars['PHID']['input'];
  input: OnchainReceipt_ClearMatchInput;
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsClearMatchAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: OnchainReceipt_ClearMatchInput;
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<OnchainReceipt_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsMarkAmbiguousArgs = {
  docId: Scalars['PHID']['input'];
  input: OnchainReceipt_MarkAmbiguousInput;
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsMarkAmbiguousAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: OnchainReceipt_MarkAmbiguousInput;
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsOverrideMatchArgs = {
  docId: Scalars['PHID']['input'];
  input: OnchainReceipt_OverrideMatchInput;
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsOverrideMatchAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: OnchainReceipt_OverrideMatchInput;
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsRecordReceiptArgs = {
  docId: Scalars['PHID']['input'];
  input: OnchainReceipt_RecordReceiptInput;
};


/** Mutations: OnchainReceipt */
export type OnchainReceiptMutationsRecordReceiptAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: OnchainReceipt_RecordReceiptInput;
};

/** Queries: OnchainReceipt Document */
export type OnchainReceiptQueries = {
  __typename?: 'OnchainReceiptQueries';
  /** Get a specific OnchainReceipt document by identifier */
  document?: Maybe<OnchainReceipt_DocumentWithChildren>;
  /** Get children of a OnchainReceipt document */
  documentChildren: OnchainReceipt_DocumentResultPage;
  /** Get parents of a OnchainReceipt document */
  documentParents: OnchainReceipt_DocumentResultPage;
  /** Get all OnchainReceipt documents (paged) */
  documents: OnchainReceipt_DocumentResultPage;
  /** Find OnchainReceipt documents by search criteria */
  findDocuments: OnchainReceipt_DocumentResultPage;
};


/** Queries: OnchainReceipt Document */
export type OnchainReceiptQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<OnchainReceipt_ViewFilterInput>;
};


/** Queries: OnchainReceipt Document */
export type OnchainReceiptQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<OnchainReceipt_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<OnchainReceipt_ViewFilterInput>;
};


/** Queries: OnchainReceipt Document */
export type OnchainReceiptQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<OnchainReceipt_PagingInput>;
  view?: InputMaybe<OnchainReceipt_ViewFilterInput>;
};


/** Queries: OnchainReceipt Document */
export type OnchainReceiptQueriesDocumentsArgs = {
  paging?: InputMaybe<OnchainReceipt_PagingInput>;
};


/** Queries: OnchainReceipt Document */
export type OnchainReceiptQueriesFindDocumentsArgs = {
  paging?: InputMaybe<OnchainReceipt_PagingInput>;
  search?: InputMaybe<OnchainReceipt_SearchFilterInput>;
  view?: InputMaybe<OnchainReceipt_ViewFilterInput>;
};

export type OnchainReceipt_AttachPledgeInput = {
  pledgeId: Scalars['PHID']['input'];
};

export type OnchainReceipt_ClearMatchInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Paginated result type for OnchainReceipt documents */
export type OnchainReceipt_DocumentResultPage = {
  __typename?: 'OnchainReceipt_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<OnchainReceiptMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for OnchainReceipt */
export type OnchainReceipt_DocumentWithChildren = {
  __typename?: 'OnchainReceipt_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: OnchainReceiptMutationResult;
};

/** Full state with all scopes for OnchainReceipt */
export type OnchainReceipt_FullState = {
  __typename?: 'OnchainReceipt_FullState';
  auth: Scalars['JSONObject']['output'];
  document: OnchainReceipt_PhDocumentScopeState;
  global: OnchainReceipt_OnchainReceiptState;
  local: Scalars['JSONObject']['output'];
};

export type OnchainReceipt_InitialStateInput = {
  global?: InputMaybe<OnchainReceipt_OnchainReceiptStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type OnchainReceipt_MarkAmbiguousInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OnchainReceipt_OnchainReceiptState = {
  __typename?: 'OnchainReceipt_OnchainReceiptState';
  amount?: Maybe<Scalars['Amount_Tokens']['output']>;
  asset?: Maybe<OnchainReceipt_ReceiptAsset>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  blockTimestamp?: Maybe<Scalars['DateTime']['output']>;
  chainId?: Maybe<Scalars['Int']['output']>;
  fromAddress?: Maybe<Scalars['EthereumAddress']['output']>;
  matchedPledgeId?: Maybe<Scalars['PHID']['output']>;
  rawLog?: Maybe<Scalars['String']['output']>;
  reconciliationStatus: OnchainReceipt_ReconciliationStatus;
  toAddress?: Maybe<Scalars['EthereumAddress']['output']>;
  txHash?: Maybe<Scalars['String']['output']>;
};

/** Input Types for Initial State */
export type OnchainReceipt_OnchainReceiptStateInput = {
  amount?: InputMaybe<Scalars['Amount_Tokens']['input']>;
  asset?: InputMaybe<OnchainReceipt_ReceiptAssetInput>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  blockTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  fromAddress?: InputMaybe<Scalars['EthereumAddress']['input']>;
  matchedPledgeId?: InputMaybe<Scalars['PHID']['input']>;
  rawLog?: InputMaybe<Scalars['String']['input']>;
  reconciliationStatus?: InputMaybe<OnchainReceipt_ReconciliationStatus>;
  toAddress?: InputMaybe<Scalars['EthereumAddress']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
};

export type OnchainReceipt_OverrideMatchInput = {
  pledgeId: Scalars['PHID']['input'];
};

/** Document scope state (same for all document types) */
export type OnchainReceipt_PhDocumentScopeState = {
  __typename?: 'OnchainReceipt_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: OnchainReceipt_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type OnchainReceipt_PhHashConfig = {
  __typename?: 'OnchainReceipt_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type OnchainReceipt_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type OnchainReceipt_ReceiptAsset = {
  __typename?: 'OnchainReceipt_ReceiptAsset';
  contractAddress?: Maybe<Scalars['EthereumAddress']['output']>;
  symbol: Scalars['String']['output'];
};

/** Module: Reconciliation */
export type OnchainReceipt_ReceiptAssetInput = {
  contractAddress?: InputMaybe<Scalars['EthereumAddress']['input']>;
  symbol: Scalars['String']['input'];
};

export type OnchainReceipt_ReconciliationStatus =
  | 'AMBIGUOUS'
  | 'MANUALLY_OVERRIDDEN'
  | 'MATCHED'
  | 'UNMATCHED';

export type OnchainReceipt_RecordReceiptInput = {
  amount: Scalars['Amount_Tokens']['input'];
  asset: OnchainReceipt_ReceiptAssetInput;
  blockNumber: Scalars['Int']['input'];
  blockTimestamp: Scalars['DateTime']['input'];
  chainId: Scalars['Int']['input'];
  fromAddress: Scalars['EthereumAddress']['input'];
  rawLog?: InputMaybe<Scalars['String']['input']>;
  toAddress: Scalars['EthereumAddress']['input'];
  txHash: Scalars['String']['input'];
};

export type OnchainReceipt_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type OnchainReceipt_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Operation = {
  __typename?: 'Operation';
  context?: Maybe<PhOperationContext>;
  error?: Maybe<Scalars['String']['output']>;
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  inputText?: Maybe<Scalars['String']['output']>;
  skip?: Maybe<Scalars['Int']['output']>;
  timestampUtcMs: Scalars['DateTime']['output'];
  type: Scalars['String']['output'];
};

export type OperationContext = {
  __typename?: 'OperationContext';
  branch: Scalars['String']['output'];
  documentId: Scalars['String']['output'];
  documentType: Scalars['String']['output'];
  ordinal: Scalars['Int']['output'];
  scope: Scalars['String']['output'];
};

export type OperationContextInput = {
  branch: Scalars['String']['input'];
  documentId: Scalars['String']['input'];
  documentType: Scalars['String']['input'];
  ordinal: Scalars['Int']['input'];
  scope: Scalars['String']['input'];
};

export type OperationInput = {
  action: ActionInput;
  error?: InputMaybe<Scalars['String']['input']>;
  hash: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  timestampUtcMs: Scalars['String']['input'];
};

export type OperationWithContext = {
  __typename?: 'OperationWithContext';
  context: OperationContext;
  operation: ReactorOperation;
};

export type OperationWithContextInput = {
  context: OperationContextInput;
  operation: OperationInput;
};

export type OperationsFilterInput = {
  actionTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  branch?: InputMaybe<Scalars['String']['input']>;
  documentId: Scalars['String']['input'];
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
  sinceRevision?: InputMaybe<Scalars['Int']['input']>;
  timestampFrom?: InputMaybe<Scalars['String']['input']>;
  timestampTo?: InputMaybe<Scalars['String']['input']>;
};

export type PhDocument = {
  __typename?: 'PHDocument';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations?: Maybe<ReactorOperationResultPage>;
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: Scalars['JSONObject']['output'];
};


export type PhDocumentOperationsArgs = {
  filter?: InputMaybe<DocumentOperationsFilterInput>;
  paging?: InputMaybe<PagingInput>;
};

export type PhDocumentResultPage = {
  __typename?: 'PHDocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<PhDocument>;
  totalCount: Scalars['Int']['output'];
};

export type PhOperationContext = {
  __typename?: 'PHOperationContext';
  signer?: Maybe<Signer>;
};

export type PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Pledge = IDocument & {
  __typename?: 'Pledge';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: Pledge_PledgeState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: Pledge_PledgeState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type PledgeOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for Pledge operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type PledgeMutationResult = {
  __typename?: 'PledgeMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: Pledge_FullState;
};

/** Mutations: Pledge */
export type PledgeMutations = {
  __typename?: 'PledgeMutations';
  attachGovernance: PledgeMutationResult;
  attachGovernanceAsync: Scalars['String']['output'];
  cancelPledge: PledgeMutationResult;
  cancelPledgeAsync: Scalars['String']['output'];
  createDocument: PledgeMutationResult;
  createEmptyDocument: PledgeMutationResult;
  editNotes: PledgeMutationResult;
  editNotesAsync: Scalars['String']['output'];
  failPledge: PledgeMutationResult;
  failPledgeAsync: Scalars['String']['output'];
  markConfirmed: PledgeMutationResult;
  markConfirmedAsync: Scalars['String']['output'];
  markGovernancePending: PledgeMutationResult;
  markGovernancePendingAsync: Scalars['String']['output'];
  markReceived: PledgeMutationResult;
  markReceivedAsync: Scalars['String']['output'];
  proposePledge: PledgeMutationResult;
  proposePledgeAsync: Scalars['String']['output'];
};


/** Mutations: Pledge */
export type PledgeMutationsAttachGovernanceArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_AttachGovernanceInput;
};


/** Mutations: Pledge */
export type PledgeMutationsAttachGovernanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_AttachGovernanceInput;
};


/** Mutations: Pledge */
export type PledgeMutationsCancelPledgeArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_CancelPledgeInput;
};


/** Mutations: Pledge */
export type PledgeMutationsCancelPledgeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_CancelPledgeInput;
};


/** Mutations: Pledge */
export type PledgeMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<Pledge_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Pledge */
export type PledgeMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Pledge */
export type PledgeMutationsEditNotesArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_EditNotesInput;
};


/** Mutations: Pledge */
export type PledgeMutationsEditNotesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_EditNotesInput;
};


/** Mutations: Pledge */
export type PledgeMutationsFailPledgeArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_FailPledgeInput;
};


/** Mutations: Pledge */
export type PledgeMutationsFailPledgeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_FailPledgeInput;
};


/** Mutations: Pledge */
export type PledgeMutationsMarkConfirmedArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_MarkConfirmedInput;
};


/** Mutations: Pledge */
export type PledgeMutationsMarkConfirmedAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_MarkConfirmedInput;
};


/** Mutations: Pledge */
export type PledgeMutationsMarkGovernancePendingArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_MarkGovernancePendingInput;
};


/** Mutations: Pledge */
export type PledgeMutationsMarkGovernancePendingAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_MarkGovernancePendingInput;
};


/** Mutations: Pledge */
export type PledgeMutationsMarkReceivedArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_MarkReceivedInput;
};


/** Mutations: Pledge */
export type PledgeMutationsMarkReceivedAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_MarkReceivedInput;
};


/** Mutations: Pledge */
export type PledgeMutationsProposePledgeArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_ProposePledgeInput;
};


/** Mutations: Pledge */
export type PledgeMutationsProposePledgeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Pledge_ProposePledgeInput;
};

/** Queries: Pledge Document */
export type PledgeQueries = {
  __typename?: 'PledgeQueries';
  /** Get a specific Pledge document by identifier */
  document?: Maybe<Pledge_DocumentWithChildren>;
  /** Get children of a Pledge document */
  documentChildren: Pledge_DocumentResultPage;
  /** Get parents of a Pledge document */
  documentParents: Pledge_DocumentResultPage;
  /** Get all Pledge documents (paged) */
  documents: Pledge_DocumentResultPage;
  /** Find Pledge documents by search criteria */
  findDocuments: Pledge_DocumentResultPage;
};


/** Queries: Pledge Document */
export type PledgeQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<Pledge_ViewFilterInput>;
};


/** Queries: Pledge Document */
export type PledgeQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<Pledge_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<Pledge_ViewFilterInput>;
};


/** Queries: Pledge Document */
export type PledgeQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<Pledge_PagingInput>;
  view?: InputMaybe<Pledge_ViewFilterInput>;
};


/** Queries: Pledge Document */
export type PledgeQueriesDocumentsArgs = {
  paging?: InputMaybe<Pledge_PagingInput>;
};


/** Queries: Pledge Document */
export type PledgeQueriesFindDocumentsArgs = {
  paging?: InputMaybe<Pledge_PagingInput>;
  search?: InputMaybe<Pledge_SearchFilterInput>;
  view?: InputMaybe<Pledge_ViewFilterInput>;
};

export type Pledge_AttachGovernanceInput = {
  platform: Pledge_GovernancePlatform;
  proposalUrl: Scalars['URL']['input'];
  quorumStatus?: InputMaybe<Scalars['String']['input']>;
  voteEndDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Pledge_CancelPledgeInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated result type for Pledge documents */
export type Pledge_DocumentResultPage = {
  __typename?: 'Pledge_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<PledgeMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for Pledge */
export type Pledge_DocumentWithChildren = {
  __typename?: 'Pledge_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: PledgeMutationResult;
};

export type Pledge_EditNotesInput = {
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  publicNotes?: InputMaybe<Scalars['String']['input']>;
};

export type Pledge_FailPledgeInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
};

/** Full state with all scopes for Pledge */
export type Pledge_FullState = {
  __typename?: 'Pledge_FullState';
  auth: Scalars['JSONObject']['output'];
  document: Pledge_PhDocumentScopeState;
  global: Pledge_PledgeState;
  local: Scalars['JSONObject']['output'];
};

export type Pledge_GovernancePlatform =
  | 'AGORA'
  | 'FORUM'
  | 'OTHER'
  | 'SNAPSHOT'
  | 'TALLY';

export type Pledge_InitialStateInput = {
  global?: InputMaybe<Pledge_PledgeStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type Pledge_MarkConfirmedInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Pledge_MarkGovernancePendingInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Pledge_MarkReceivedInput = {
  amount: Scalars['Amount_Tokens']['input'];
  receiptId: Scalars['PHID']['input'];
  receivedAt: Scalars['DateTime']['input'];
};

/** Document scope state (same for all document types) */
export type Pledge_PhDocumentScopeState = {
  __typename?: 'Pledge_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: Pledge_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type Pledge_PhHashConfig = {
  __typename?: 'Pledge_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type Pledge_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Pledge_PledgeAsset = {
  __typename?: 'Pledge_PledgeAsset';
  address?: Maybe<Scalars['EthereumAddress']['output']>;
  chainId: Scalars['Int']['output'];
  symbol: Scalars['String']['output'];
};

/** Module: Lifecycle */
export type Pledge_PledgeAssetInput = {
  address?: InputMaybe<Scalars['EthereumAddress']['input']>;
  chainId: Scalars['Int']['input'];
  symbol: Scalars['String']['input'];
};

export type Pledge_PledgeGovernance = {
  __typename?: 'Pledge_PledgeGovernance';
  platform: Pledge_GovernancePlatform;
  proposalUrl: Scalars['URL']['output'];
  quorumStatus?: Maybe<Scalars['String']['output']>;
  voteEndDate?: Maybe<Scalars['DateTime']['output']>;
};

export type Pledge_PledgeGovernanceInput = {
  platform?: InputMaybe<Pledge_GovernancePlatform>;
  proposalUrl?: InputMaybe<Scalars['URL']['input']>;
  quorumStatus?: InputMaybe<Scalars['String']['input']>;
  voteEndDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Pledge_PledgeState = {
  __typename?: 'Pledge_PledgeState';
  asset?: Maybe<Pledge_PledgeAsset>;
  contributorProfileId?: Maybe<Scalars['PHID']['output']>;
  governance?: Maybe<Pledge_PledgeGovernance>;
  internalNotes?: Maybe<Scalars['String']['output']>;
  pledgedAmount?: Maybe<Scalars['Amount_Tokens']['output']>;
  publicNotes?: Maybe<Scalars['String']['output']>;
  receiptIds: Array<Scalars['PHID']['output']>;
  receivedAmount?: Maybe<Scalars['Amount_Tokens']['output']>;
  receivedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Pledge_PledgeStatus;
};

/** Input Types for Initial State */
export type Pledge_PledgeStateInput = {
  asset?: InputMaybe<Pledge_PledgeAssetInput>;
  contributorProfileId?: InputMaybe<Scalars['PHID']['input']>;
  governance?: InputMaybe<Pledge_PledgeGovernanceInput>;
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  pledgedAmount?: InputMaybe<Scalars['Amount_Tokens']['input']>;
  publicNotes?: InputMaybe<Scalars['String']['input']>;
  receiptIds?: InputMaybe<Array<InputMaybe<Scalars['PHID']['input']>>>;
  receivedAmount?: InputMaybe<Scalars['Amount_Tokens']['input']>;
  receivedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Pledge_PledgeStatus>;
};

export type Pledge_PledgeStatus =
  | 'CANCELLED'
  | 'CONFIRMED'
  | 'FAILED'
  | 'GOVERNANCE_PENDING'
  | 'PROPOSED'
  | 'RECEIVED';

export type Pledge_ProposePledgeInput = {
  asset: Pledge_PledgeAssetInput;
  contributorProfileId: Scalars['PHID']['input'];
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  pledgedAmount: Scalars['Amount_Tokens']['input'];
  publicNotes?: InputMaybe<Scalars['String']['input']>;
};

export type Pledge_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type Pledge_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PollSyncEnvelopesResult = {
  __typename?: 'PollSyncEnvelopesResult';
  ackOrdinal: Scalars['Int']['output'];
  deadLetters: Array<DeadLetterInfo>;
  envelopes: Array<SyncEnvelope>;
  hasMore: Scalars['Boolean']['output'];
};

export type ProcessorModule = IDocument & {
  __typename?: 'ProcessorModule';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ProcessorModule_ProcessorModuleState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: ProcessorModule_ProcessorModuleState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type ProcessorModuleOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for ProcessorModule operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type ProcessorModuleMutationResult = {
  __typename?: 'ProcessorModuleMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: ProcessorModule_FullState;
};

/** Mutations: ProcessorModule */
export type ProcessorModuleMutations = {
  __typename?: 'ProcessorModuleMutations';
  addDocumentType: ProcessorModuleMutationResult;
  addDocumentTypeAsync: Scalars['String']['output'];
  addProcessorApp: ProcessorModuleMutationResult;
  addProcessorAppAsync: Scalars['String']['output'];
  createDocument: ProcessorModuleMutationResult;
  createEmptyDocument: ProcessorModuleMutationResult;
  removeDocumentType: ProcessorModuleMutationResult;
  removeDocumentTypeAsync: Scalars['String']['output'];
  removeProcessorApp: ProcessorModuleMutationResult;
  removeProcessorAppAsync: Scalars['String']['output'];
  setProcessorName: ProcessorModuleMutationResult;
  setProcessorNameAsync: Scalars['String']['output'];
  setProcessorStatus: ProcessorModuleMutationResult;
  setProcessorStatusAsync: Scalars['String']['output'];
  setProcessorType: ProcessorModuleMutationResult;
  setProcessorTypeAsync: Scalars['String']['output'];
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsAddDocumentTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_AddDocumentTypeInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsAddDocumentTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_AddDocumentTypeInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsAddProcessorAppArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_AddProcessorAppInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsAddProcessorAppAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_AddProcessorAppInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<ProcessorModule_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsRemoveDocumentTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_RemoveDocumentTypeInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsRemoveDocumentTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_RemoveDocumentTypeInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsRemoveProcessorAppArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_RemoveProcessorAppInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsRemoveProcessorAppAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_RemoveProcessorAppInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsSetProcessorNameArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_SetProcessorNameInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsSetProcessorNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_SetProcessorNameInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsSetProcessorStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_SetProcessorStatusInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsSetProcessorStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_SetProcessorStatusInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsSetProcessorTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_SetProcessorTypeInput;
};


/** Mutations: ProcessorModule */
export type ProcessorModuleMutationsSetProcessorTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ProcessorModule_SetProcessorTypeInput;
};

/** Queries: ProcessorModule Document */
export type ProcessorModuleQueries = {
  __typename?: 'ProcessorModuleQueries';
  /** Get a specific ProcessorModule document by identifier */
  document?: Maybe<ProcessorModule_DocumentWithChildren>;
  /** Get children of a ProcessorModule document */
  documentChildren: ProcessorModule_DocumentResultPage;
  /** Get parents of a ProcessorModule document */
  documentParents: ProcessorModule_DocumentResultPage;
  /** Get all ProcessorModule documents (paged) */
  documents: ProcessorModule_DocumentResultPage;
  /** Find ProcessorModule documents by search criteria */
  findDocuments: ProcessorModule_DocumentResultPage;
};


/** Queries: ProcessorModule Document */
export type ProcessorModuleQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<ProcessorModule_ViewFilterInput>;
};


/** Queries: ProcessorModule Document */
export type ProcessorModuleQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<ProcessorModule_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ProcessorModule_ViewFilterInput>;
};


/** Queries: ProcessorModule Document */
export type ProcessorModuleQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<ProcessorModule_PagingInput>;
  view?: InputMaybe<ProcessorModule_ViewFilterInput>;
};


/** Queries: ProcessorModule Document */
export type ProcessorModuleQueriesDocumentsArgs = {
  paging?: InputMaybe<ProcessorModule_PagingInput>;
};


/** Queries: ProcessorModule Document */
export type ProcessorModuleQueriesFindDocumentsArgs = {
  paging?: InputMaybe<ProcessorModule_PagingInput>;
  search?: InputMaybe<ProcessorModule_SearchFilterInput>;
  view?: InputMaybe<ProcessorModule_ViewFilterInput>;
};

export type ProcessorModule_AddDocumentTypeInput = {
  documentType: Scalars['String']['input'];
  id: Scalars['OID']['input'];
};

export type ProcessorModule_AddProcessorAppInput = {
  processorApp: Scalars['String']['input'];
};

/** Paginated result type for ProcessorModule documents */
export type ProcessorModule_DocumentResultPage = {
  __typename?: 'ProcessorModule_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<ProcessorModuleMutationResult>;
  totalCount: Scalars['Int']['output'];
};

export type ProcessorModule_DocumentTypeItem = {
  __typename?: 'ProcessorModule_DocumentTypeItem';
  documentType: Scalars['String']['output'];
  id: Scalars['OID']['output'];
};

export type ProcessorModule_DocumentTypeItemInput = {
  documentType?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
};

/** Document with children for ProcessorModule */
export type ProcessorModule_DocumentWithChildren = {
  __typename?: 'ProcessorModule_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: ProcessorModuleMutationResult;
};

/** Full state with all scopes for ProcessorModule */
export type ProcessorModule_FullState = {
  __typename?: 'ProcessorModule_FullState';
  auth: Scalars['JSONObject']['output'];
  document: ProcessorModule_PhDocumentScopeState;
  global: ProcessorModule_ProcessorModuleState;
  local: Scalars['JSONObject']['output'];
};

export type ProcessorModule_InitialStateInput = {
  global?: InputMaybe<ProcessorModule_ProcessorModuleStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type ProcessorModule_PhDocumentScopeState = {
  __typename?: 'ProcessorModule_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: ProcessorModule_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type ProcessorModule_PhHashConfig = {
  __typename?: 'ProcessorModule_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type ProcessorModule_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ProcessorModule_ProcessorModuleState = {
  __typename?: 'ProcessorModule_ProcessorModuleState';
  documentTypes: Array<ProcessorModule_DocumentTypeItem>;
  name: Scalars['String']['output'];
  processorApps: Array<Scalars['String']['output']>;
  status: ProcessorModule_StatusType;
  type: Scalars['String']['output'];
};

/** Input Types for Initial State */
export type ProcessorModule_ProcessorModuleStateInput = {
  documentTypes?: InputMaybe<Array<InputMaybe<ProcessorModule_DocumentTypeItemInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  processorApps?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<ProcessorModule_StatusType>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ProcessorModule_RemoveDocumentTypeInput = {
  id: Scalars['OID']['input'];
};

export type ProcessorModule_RemoveProcessorAppInput = {
  processorApp: Scalars['String']['input'];
};

export type ProcessorModule_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

/** Module: BaseOperations */
export type ProcessorModule_SetProcessorNameInput = {
  name: Scalars['String']['input'];
};

export type ProcessorModule_SetProcessorStatusInput = {
  status: ProcessorModule_StatusType;
};

export type ProcessorModule_SetProcessorTypeInput = {
  type: Scalars['String']['input'];
};

export type ProcessorModule_StatusType =
  | 'CONFIRMED'
  | 'DRAFT';

export type ProcessorModule_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PropagationMode =
  | 'CASCADE'
  | 'ORPHAN';

/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type Query = {
  __typename?: 'Query';
  AppModule: AppModuleQueries;
  ContributorProfile: ContributorProfileQueries;
  /** Find a single campaign by slug. */
  DefiUnited_campaign?: Maybe<DefiUnited_PublicCampaign>;
  /** List campaigns, optionally filtered by status. */
  DefiUnited_campaigns: Array<DefiUnited_PublicCampaign>;
  DefiUnited_contributor?: Maybe<DefiUnited_PublicContributorProfile>;
  DefiUnited_contributors: Array<DefiUnited_PublicContributorProfile>;
  DistributionPlan: DistributionPlanQueries;
  DocumentDrive: DocumentDriveQueries;
  DocumentEditor: DocumentEditorQueries;
  DocumentModel: DocumentModelQueries;
  ExternalDependency: ExternalDependencyQueries;
  OnchainReceipt: OnchainReceiptQueries;
  Pledge: PledgeQueries;
  ProcessorModule: ProcessorModuleQueries;
  ReliefCampaign: ReliefCampaignQueries;
  StatusUpdate: StatusUpdateQueries;
  SubgraphModule: SubgraphModuleQueries;
  VetraPackage: VetraPackageQueries;
  analytics?: Maybe<AnalyticsQuery>;
  document?: Maybe<DocumentWithChildren>;
  documentChildren: PhDocumentResultPage;
  documentModels: DocumentModelResultPage;
  documentOperations: ReactorOperationResultPage;
  documentParents: PhDocumentResultPage;
  findDocuments: PhDocumentResultPage;
  jobStatus?: Maybe<JobInfo>;
  pollSyncEnvelopes: PollSyncEnvelopesResult;
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryDefiUnited_CampaignArgs = {
  slug: Scalars['String']['input'];
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryDefiUnited_CampaignsArgs = {
  status?: InputMaybe<DefiUnited_CampaignStatus>;
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryDefiUnited_ContributorArgs = {
  id: Scalars['String']['input'];
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryDefiUnited_ContributorsArgs = {
  kind?: InputMaybe<Scalars['String']['input']>;
  trustLevel?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<ViewFilterInput>;
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryDocumentChildrenArgs = {
  paging?: InputMaybe<PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ViewFilterInput>;
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryDocumentModelsArgs = {
  namespace?: InputMaybe<Scalars['String']['input']>;
  paging?: InputMaybe<PagingInput>;
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryDocumentOperationsArgs = {
  filter: OperationsFilterInput;
  paging?: InputMaybe<PagingInput>;
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<PagingInput>;
  view?: InputMaybe<ViewFilterInput>;
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryFindDocumentsArgs = {
  paging?: InputMaybe<PagingInput>;
  search?: InputMaybe<SearchFilterInput>;
  view?: InputMaybe<ViewFilterInput>;
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryJobStatusArgs = {
  jobId: Scalars['String']['input'];
};


/**
 * Public read API for the cross-campaign contributor registry. Lists every
 * Contributor Profile across the DAO drive plus a derived view of which
 * campaigns each contributor has participated in.
 */
export type QueryPollSyncEnvelopesArgs = {
  channelId: Scalars['String']['input'];
  outboxAck: Scalars['Int']['input'];
  outboxLatest: Scalars['Int']['input'];
};

export type ReactorOperation = {
  __typename?: 'ReactorOperation';
  action: Action;
  error?: Maybe<Scalars['String']['output']>;
  hash: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  index: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  timestampUtcMs: Scalars['String']['output'];
};

export type ReactorOperationResultPage = {
  __typename?: 'ReactorOperationResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<ReactorOperation>;
  totalCount: Scalars['Int']['output'];
};

export type ReactorSigner = {
  __typename?: 'ReactorSigner';
  app?: Maybe<ReactorSignerApp>;
  signatures: Array<Scalars['String']['output']>;
  user?: Maybe<ReactorSignerUser>;
};

export type ReactorSignerApp = {
  __typename?: 'ReactorSignerApp';
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ReactorSignerAppInput = {
  key: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ReactorSignerInput = {
  app?: InputMaybe<ReactorSignerAppInput>;
  signatures: Array<Scalars['String']['input']>;
  user?: InputMaybe<ReactorSignerUserInput>;
};

export type ReactorSignerUser = {
  __typename?: 'ReactorSignerUser';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  networkId: Scalars['String']['output'];
};

export type ReactorSignerUserInput = {
  address: Scalars['String']['input'];
  chainId: Scalars['Int']['input'];
  networkId: Scalars['String']['input'];
};

export type ReliefCampaign = IDocument & {
  __typename?: 'ReliefCampaign';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ReliefCampaign_ReliefCampaignState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: ReliefCampaign_ReliefCampaignState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type ReliefCampaignOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for ReliefCampaign operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type ReliefCampaignMutationResult = {
  __typename?: 'ReliefCampaignMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: ReliefCampaign_FullState;
};

/** Mutations: ReliefCampaign */
export type ReliefCampaignMutations = {
  __typename?: 'ReliefCampaignMutations';
  addContributionAddress: ReliefCampaignMutationResult;
  addContributionAddressAsync: Scalars['String']['output'];
  addExternalLink: ReliefCampaignMutationResult;
  addExternalLinkAsync: Scalars['String']['output'];
  addOperatorWallet: ReliefCampaignMutationResult;
  addOperatorWalletAsync: Scalars['String']['output'];
  archiveCampaign: ReliefCampaignMutationResult;
  archiveCampaignAsync: Scalars['String']['output'];
  createDocument: ReliefCampaignMutationResult;
  createEmptyDocument: ReliefCampaignMutationResult;
  markFailed: ReliefCampaignMutationResult;
  markFailedAsync: Scalars['String']['output'];
  markResolved: ReliefCampaignMutationResult;
  markResolvedAsync: Scalars['String']['output'];
  removeContributionAddress: ReliefCampaignMutationResult;
  removeContributionAddressAsync: Scalars['String']['output'];
  removeOperatorWallet: ReliefCampaignMutationResult;
  removeOperatorWalletAsync: Scalars['String']['output'];
  setCampaignDetails: ReliefCampaignMutationResult;
  setCampaignDetailsAsync: Scalars['String']['output'];
  startCampaign: ReliefCampaignMutationResult;
  startCampaignAsync: Scalars['String']['output'];
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsAddContributionAddressArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_AddContributionAddressInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsAddContributionAddressAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_AddContributionAddressInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsAddExternalLinkArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_AddExternalLinkInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsAddExternalLinkAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_AddExternalLinkInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsAddOperatorWalletArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_AddOperatorWalletInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsAddOperatorWalletAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_AddOperatorWalletInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsArchiveCampaignArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_ArchiveCampaignInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsArchiveCampaignAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_ArchiveCampaignInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<ReliefCampaign_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsMarkFailedArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_MarkFailedInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsMarkFailedAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_MarkFailedInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsMarkResolvedArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_MarkResolvedInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsMarkResolvedAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_MarkResolvedInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsRemoveContributionAddressArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_RemoveContributionAddressInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsRemoveContributionAddressAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_RemoveContributionAddressInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsRemoveOperatorWalletArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_RemoveOperatorWalletInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsRemoveOperatorWalletAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_RemoveOperatorWalletInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsSetCampaignDetailsArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_SetCampaignDetailsInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsSetCampaignDetailsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_SetCampaignDetailsInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsStartCampaignArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_StartCampaignInput;
};


/** Mutations: ReliefCampaign */
export type ReliefCampaignMutationsStartCampaignAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ReliefCampaign_StartCampaignInput;
};

/** Queries: ReliefCampaign Document */
export type ReliefCampaignQueries = {
  __typename?: 'ReliefCampaignQueries';
  /** Get a specific ReliefCampaign document by identifier */
  document?: Maybe<ReliefCampaign_DocumentWithChildren>;
  /** Get children of a ReliefCampaign document */
  documentChildren: ReliefCampaign_DocumentResultPage;
  /** Get parents of a ReliefCampaign document */
  documentParents: ReliefCampaign_DocumentResultPage;
  /** Get all ReliefCampaign documents (paged) */
  documents: ReliefCampaign_DocumentResultPage;
  /** Find ReliefCampaign documents by search criteria */
  findDocuments: ReliefCampaign_DocumentResultPage;
};


/** Queries: ReliefCampaign Document */
export type ReliefCampaignQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<ReliefCampaign_ViewFilterInput>;
};


/** Queries: ReliefCampaign Document */
export type ReliefCampaignQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<ReliefCampaign_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ReliefCampaign_ViewFilterInput>;
};


/** Queries: ReliefCampaign Document */
export type ReliefCampaignQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<ReliefCampaign_PagingInput>;
  view?: InputMaybe<ReliefCampaign_ViewFilterInput>;
};


/** Queries: ReliefCampaign Document */
export type ReliefCampaignQueriesDocumentsArgs = {
  paging?: InputMaybe<ReliefCampaign_PagingInput>;
};


/** Queries: ReliefCampaign Document */
export type ReliefCampaignQueriesFindDocumentsArgs = {
  paging?: InputMaybe<ReliefCampaign_PagingInput>;
  search?: InputMaybe<ReliefCampaign_SearchFilterInput>;
  view?: InputMaybe<ReliefCampaign_ViewFilterInput>;
};

export type ReliefCampaign_AddContributionAddressInput = {
  address: Scalars['EthereumAddress']['input'];
  chainId: Scalars['Int']['input'];
  id: Scalars['OID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
};

export type ReliefCampaign_AddExternalLinkInput = {
  id: Scalars['OID']['input'];
  label: Scalars['String']['input'];
  url: Scalars['URL']['input'];
};

export type ReliefCampaign_AddOperatorWalletInput = {
  address: Scalars['EthereumAddress']['input'];
};

export type ReliefCampaign_AffectedAsset = {
  __typename?: 'ReliefCampaign_AffectedAsset';
  address?: Maybe<Scalars['EthereumAddress']['output']>;
  chainId: Scalars['Int']['output'];
  symbol: Scalars['String']['output'];
};

/** Module: Management */
export type ReliefCampaign_AffectedAssetInput = {
  address?: InputMaybe<Scalars['EthereumAddress']['input']>;
  chainId: Scalars['Int']['input'];
  symbol: Scalars['String']['input'];
};

export type ReliefCampaign_ArchiveCampaignInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReliefCampaign_CampaignStatus =
  | 'ACTIVE'
  | 'ARCHIVED'
  | 'DRAFT'
  | 'EXECUTING'
  | 'FAILED'
  | 'RESOLVED';

export type ReliefCampaign_ContributionAddress = {
  __typename?: 'ReliefCampaign_ContributionAddress';
  address: Scalars['EthereumAddress']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type ReliefCampaign_ContributionAddressInput = {
  address?: InputMaybe<Scalars['EthereumAddress']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated result type for ReliefCampaign documents */
export type ReliefCampaign_DocumentResultPage = {
  __typename?: 'ReliefCampaign_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<ReliefCampaignMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for ReliefCampaign */
export type ReliefCampaign_DocumentWithChildren = {
  __typename?: 'ReliefCampaign_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: ReliefCampaignMutationResult;
};

export type ReliefCampaign_ExternalLink = {
  __typename?: 'ReliefCampaign_ExternalLink';
  id: Scalars['OID']['output'];
  label: Scalars['String']['output'];
  url: Scalars['URL']['output'];
};

export type ReliefCampaign_ExternalLinkInput = {
  id?: InputMaybe<Scalars['OID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['URL']['input']>;
};

/** Full state with all scopes for ReliefCampaign */
export type ReliefCampaign_FullState = {
  __typename?: 'ReliefCampaign_FullState';
  auth: Scalars['JSONObject']['output'];
  document: ReliefCampaign_PhDocumentScopeState;
  global: ReliefCampaign_ReliefCampaignState;
  local: Scalars['JSONObject']['output'];
};

export type ReliefCampaign_InitialStateInput = {
  global?: InputMaybe<ReliefCampaign_ReliefCampaignStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type ReliefCampaign_MarkFailedInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type ReliefCampaign_MarkResolvedInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Document scope state (same for all document types) */
export type ReliefCampaign_PhDocumentScopeState = {
  __typename?: 'ReliefCampaign_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: ReliefCampaign_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type ReliefCampaign_PhHashConfig = {
  __typename?: 'ReliefCampaign_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type ReliefCampaign_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ReliefCampaign_ReliefCampaignState = {
  __typename?: 'ReliefCampaign_ReliefCampaignState';
  affectedAsset?: Maybe<ReliefCampaign_AffectedAsset>;
  contributionAddresses: Array<ReliefCampaign_ContributionAddress>;
  contributorRegistryDriveId?: Maybe<Scalars['PHID']['output']>;
  externalLinks: Array<ReliefCampaign_ExternalLink>;
  incidentDate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  operatorWallets: Array<Scalars['EthereumAddress']['output']>;
  riskDisclaimer?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  status: ReliefCampaign_CampaignStatus;
  summary?: Maybe<Scalars['String']['output']>;
  targetAmount?: Maybe<Scalars['Amount_Tokens']['output']>;
};

/** Input Types for Initial State */
export type ReliefCampaign_ReliefCampaignStateInput = {
  affectedAsset?: InputMaybe<ReliefCampaign_AffectedAssetInput>;
  contributionAddresses?: InputMaybe<Array<InputMaybe<ReliefCampaign_ContributionAddressInput>>>;
  contributorRegistryDriveId?: InputMaybe<Scalars['PHID']['input']>;
  externalLinks?: InputMaybe<Array<InputMaybe<ReliefCampaign_ExternalLinkInput>>>;
  incidentDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  operatorWallets?: InputMaybe<Array<InputMaybe<Scalars['EthereumAddress']['input']>>>;
  riskDisclaimer?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ReliefCampaign_CampaignStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
  targetAmount?: InputMaybe<Scalars['Amount_Tokens']['input']>;
};

export type ReliefCampaign_RemoveContributionAddressInput = {
  id: Scalars['OID']['input'];
};

export type ReliefCampaign_RemoveOperatorWalletInput = {
  address: Scalars['EthereumAddress']['input'];
};

export type ReliefCampaign_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type ReliefCampaign_SetCampaignDetailsInput = {
  affectedAsset?: InputMaybe<ReliefCampaign_AffectedAssetInput>;
  contributorRegistryDriveId?: InputMaybe<Scalars['PHID']['input']>;
  incidentDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  riskDisclaimer?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  targetAmount?: InputMaybe<Scalars['Amount_Tokens']['input']>;
};

export type ReliefCampaign_StartCampaignInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReliefCampaign_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RemoteCursor = {
  __typename?: 'RemoteCursor';
  cursorOrdinal: Scalars['Int']['output'];
  lastSyncedAtUtcMs?: Maybe<Scalars['String']['output']>;
  remoteName: Scalars['String']['output'];
};

export type RemoteCursorInput = {
  cursorOrdinal: Scalars['Int']['input'];
  lastSyncedAtUtcMs?: InputMaybe<Scalars['String']['input']>;
  remoteName: Scalars['String']['input'];
};

export type RemoteFilterInput = {
  branch: Scalars['String']['input'];
  documentId: Array<Scalars['String']['input']>;
  scope: Array<Scalars['String']['input']>;
};

export type Revision = {
  __typename?: 'Revision';
  revision: Scalars['Int']['output'];
  scope: Scalars['String']['output'];
};

export type SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Signer = {
  __typename?: 'Signer';
  app?: Maybe<SignerApp>;
  signatures: Array<Scalars['String']['output']>;
  user?: Maybe<SignerUser>;
};

export type SignerApp = {
  __typename?: 'SignerApp';
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SignerUser = {
  __typename?: 'SignerUser';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  networkId: Scalars['String']['output'];
};

export type StatusUpdate = IDocument & {
  __typename?: 'StatusUpdate';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: StatusUpdate_StatusUpdateState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: StatusUpdate_StatusUpdateState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type StatusUpdateOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for StatusUpdate operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type StatusUpdateMutationResult = {
  __typename?: 'StatusUpdateMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: StatusUpdate_FullState;
};

/** Mutations: StatusUpdate */
export type StatusUpdateMutations = {
  __typename?: 'StatusUpdateMutations';
  attachAnnouncement: StatusUpdateMutationResult;
  attachAnnouncementAsync: Scalars['String']['output'];
  createDocument: StatusUpdateMutationResult;
  createEmptyDocument: StatusUpdateMutationResult;
  draftUpdate: StatusUpdateMutationResult;
  draftUpdateAsync: Scalars['String']['output'];
  editUpdate: StatusUpdateMutationResult;
  editUpdateAsync: Scalars['String']['output'];
  publishUpdate: StatusUpdateMutationResult;
  publishUpdateAsync: Scalars['String']['output'];
  retractUpdate: StatusUpdateMutationResult;
  retractUpdateAsync: Scalars['String']['output'];
  setVisibility: StatusUpdateMutationResult;
  setVisibilityAsync: Scalars['String']['output'];
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsAttachAnnouncementArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_AttachAnnouncementInput;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsAttachAnnouncementAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_AttachAnnouncementInput;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<StatusUpdate_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsDraftUpdateArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_DraftUpdateInput;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsDraftUpdateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_DraftUpdateInput;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsEditUpdateArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_EditUpdateInput;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsEditUpdateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_EditUpdateInput;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsPublishUpdateArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_PublishUpdateInput;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsPublishUpdateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_PublishUpdateInput;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsRetractUpdateArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_RetractUpdateInput;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsRetractUpdateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_RetractUpdateInput;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsSetVisibilityArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_SetVisibilityInput;
};


/** Mutations: StatusUpdate */
export type StatusUpdateMutationsSetVisibilityAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: StatusUpdate_SetVisibilityInput;
};

/** Queries: StatusUpdate Document */
export type StatusUpdateQueries = {
  __typename?: 'StatusUpdateQueries';
  /** Get a specific StatusUpdate document by identifier */
  document?: Maybe<StatusUpdate_DocumentWithChildren>;
  /** Get children of a StatusUpdate document */
  documentChildren: StatusUpdate_DocumentResultPage;
  /** Get parents of a StatusUpdate document */
  documentParents: StatusUpdate_DocumentResultPage;
  /** Get all StatusUpdate documents (paged) */
  documents: StatusUpdate_DocumentResultPage;
  /** Find StatusUpdate documents by search criteria */
  findDocuments: StatusUpdate_DocumentResultPage;
};


/** Queries: StatusUpdate Document */
export type StatusUpdateQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<StatusUpdate_ViewFilterInput>;
};


/** Queries: StatusUpdate Document */
export type StatusUpdateQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<StatusUpdate_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<StatusUpdate_ViewFilterInput>;
};


/** Queries: StatusUpdate Document */
export type StatusUpdateQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<StatusUpdate_PagingInput>;
  view?: InputMaybe<StatusUpdate_ViewFilterInput>;
};


/** Queries: StatusUpdate Document */
export type StatusUpdateQueriesDocumentsArgs = {
  paging?: InputMaybe<StatusUpdate_PagingInput>;
};


/** Queries: StatusUpdate Document */
export type StatusUpdateQueriesFindDocumentsArgs = {
  paging?: InputMaybe<StatusUpdate_PagingInput>;
  search?: InputMaybe<StatusUpdate_SearchFilterInput>;
  view?: InputMaybe<StatusUpdate_ViewFilterInput>;
};

export type StatusUpdate_AnnouncementPlatform =
  | 'BLOG'
  | 'FARCASTER'
  | 'MIRROR'
  | 'TWITTER';

export type StatusUpdate_AttachAnnouncementInput = {
  id: Scalars['OID']['input'];
  platform: StatusUpdate_AnnouncementPlatform;
  url: Scalars['URL']['input'];
};

/** Paginated result type for StatusUpdate documents */
export type StatusUpdate_DocumentResultPage = {
  __typename?: 'StatusUpdate_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<StatusUpdateMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for StatusUpdate */
export type StatusUpdate_DocumentWithChildren = {
  __typename?: 'StatusUpdate_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: StatusUpdateMutationResult;
};

/** Module: Publishing */
export type StatusUpdate_DraftUpdateInput = {
  authorProfileId?: InputMaybe<Scalars['PHID']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<StatusUpdate_UpdateVisibility>;
};

export type StatusUpdate_EditUpdateInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type StatusUpdate_ExternalAnnouncement = {
  __typename?: 'StatusUpdate_ExternalAnnouncement';
  id: Scalars['OID']['output'];
  platform: StatusUpdate_AnnouncementPlatform;
  url: Scalars['URL']['output'];
};

export type StatusUpdate_ExternalAnnouncementInput = {
  id?: InputMaybe<Scalars['OID']['input']>;
  platform?: InputMaybe<StatusUpdate_AnnouncementPlatform>;
  url?: InputMaybe<Scalars['URL']['input']>;
};

/** Full state with all scopes for StatusUpdate */
export type StatusUpdate_FullState = {
  __typename?: 'StatusUpdate_FullState';
  auth: Scalars['JSONObject']['output'];
  document: StatusUpdate_PhDocumentScopeState;
  global: StatusUpdate_StatusUpdateState;
  local: Scalars['JSONObject']['output'];
};

export type StatusUpdate_InitialStateInput = {
  global?: InputMaybe<StatusUpdate_StatusUpdateStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type StatusUpdate_MetricsSnapshot = {
  __typename?: 'StatusUpdate_MetricsSnapshot';
  dependenciesResolved?: Maybe<Scalars['Int']['output']>;
  totalPledged?: Maybe<Scalars['Amount_Tokens']['output']>;
  totalReceived?: Maybe<Scalars['Amount_Tokens']['output']>;
};

export type StatusUpdate_MetricsSnapshotInput = {
  dependenciesResolved?: InputMaybe<Scalars['Int']['input']>;
  totalPledged?: InputMaybe<Scalars['Amount_Tokens']['input']>;
  totalReceived?: InputMaybe<Scalars['Amount_Tokens']['input']>;
};

/** Document scope state (same for all document types) */
export type StatusUpdate_PhDocumentScopeState = {
  __typename?: 'StatusUpdate_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: StatusUpdate_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type StatusUpdate_PhHashConfig = {
  __typename?: 'StatusUpdate_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type StatusUpdate_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type StatusUpdate_PublishUpdateInput = {
  metricsSnapshot?: InputMaybe<StatusUpdate_MetricsSnapshotInput>;
  publishedAt: Scalars['DateTime']['input'];
};

export type StatusUpdate_RetractUpdateInput = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StatusUpdate_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type StatusUpdate_SetVisibilityInput = {
  visibility: StatusUpdate_UpdateVisibility;
};

export type StatusUpdate_StatusUpdateState = {
  __typename?: 'StatusUpdate_StatusUpdateState';
  authorProfileId?: Maybe<Scalars['PHID']['output']>;
  body: Scalars['String']['output'];
  externalAnnouncements: Array<StatusUpdate_ExternalAnnouncement>;
  metricsSnapshot?: Maybe<StatusUpdate_MetricsSnapshot>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  visibility: StatusUpdate_UpdateVisibility;
};

/** Input Types for Initial State */
export type StatusUpdate_StatusUpdateStateInput = {
  authorProfileId?: InputMaybe<Scalars['PHID']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  externalAnnouncements?: InputMaybe<Array<InputMaybe<StatusUpdate_ExternalAnnouncementInput>>>;
  metricsSnapshot?: InputMaybe<StatusUpdate_MetricsSnapshotInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<StatusUpdate_UpdateVisibility>;
};

export type StatusUpdate_UpdateVisibility =
  | 'CONTRIBUTORS_ONLY'
  | 'INTERNAL'
  | 'PUBLIC';

export type StatusUpdate_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SubgraphModule = IDocument & {
  __typename?: 'SubgraphModule';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: SubgraphModule_SubgraphModuleState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: SubgraphModule_SubgraphModuleState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type SubgraphModuleOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for SubgraphModule operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type SubgraphModuleMutationResult = {
  __typename?: 'SubgraphModuleMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: SubgraphModule_FullState;
};

/** Mutations: SubgraphModule */
export type SubgraphModuleMutations = {
  __typename?: 'SubgraphModuleMutations';
  createDocument: SubgraphModuleMutationResult;
  createEmptyDocument: SubgraphModuleMutationResult;
  setSubgraphName: SubgraphModuleMutationResult;
  setSubgraphNameAsync: Scalars['String']['output'];
  setSubgraphStatus: SubgraphModuleMutationResult;
  setSubgraphStatusAsync: Scalars['String']['output'];
};


/** Mutations: SubgraphModule */
export type SubgraphModuleMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<SubgraphModule_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: SubgraphModule */
export type SubgraphModuleMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: SubgraphModule */
export type SubgraphModuleMutationsSetSubgraphNameArgs = {
  docId: Scalars['PHID']['input'];
  input: SubgraphModule_SetSubgraphNameInput;
};


/** Mutations: SubgraphModule */
export type SubgraphModuleMutationsSetSubgraphNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubgraphModule_SetSubgraphNameInput;
};


/** Mutations: SubgraphModule */
export type SubgraphModuleMutationsSetSubgraphStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: SubgraphModule_SetSubgraphStatusInput;
};


/** Mutations: SubgraphModule */
export type SubgraphModuleMutationsSetSubgraphStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubgraphModule_SetSubgraphStatusInput;
};

/** Queries: SubgraphModule Document */
export type SubgraphModuleQueries = {
  __typename?: 'SubgraphModuleQueries';
  /** Get a specific SubgraphModule document by identifier */
  document?: Maybe<SubgraphModule_DocumentWithChildren>;
  /** Get children of a SubgraphModule document */
  documentChildren: SubgraphModule_DocumentResultPage;
  /** Get parents of a SubgraphModule document */
  documentParents: SubgraphModule_DocumentResultPage;
  /** Get all SubgraphModule documents (paged) */
  documents: SubgraphModule_DocumentResultPage;
  /** Find SubgraphModule documents by search criteria */
  findDocuments: SubgraphModule_DocumentResultPage;
};


/** Queries: SubgraphModule Document */
export type SubgraphModuleQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<SubgraphModule_ViewFilterInput>;
};


/** Queries: SubgraphModule Document */
export type SubgraphModuleQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<SubgraphModule_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<SubgraphModule_ViewFilterInput>;
};


/** Queries: SubgraphModule Document */
export type SubgraphModuleQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<SubgraphModule_PagingInput>;
  view?: InputMaybe<SubgraphModule_ViewFilterInput>;
};


/** Queries: SubgraphModule Document */
export type SubgraphModuleQueriesDocumentsArgs = {
  paging?: InputMaybe<SubgraphModule_PagingInput>;
};


/** Queries: SubgraphModule Document */
export type SubgraphModuleQueriesFindDocumentsArgs = {
  paging?: InputMaybe<SubgraphModule_PagingInput>;
  search?: InputMaybe<SubgraphModule_SearchFilterInput>;
  view?: InputMaybe<SubgraphModule_ViewFilterInput>;
};

/** Paginated result type for SubgraphModule documents */
export type SubgraphModule_DocumentResultPage = {
  __typename?: 'SubgraphModule_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<SubgraphModuleMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for SubgraphModule */
export type SubgraphModule_DocumentWithChildren = {
  __typename?: 'SubgraphModule_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: SubgraphModuleMutationResult;
};

/** Full state with all scopes for SubgraphModule */
export type SubgraphModule_FullState = {
  __typename?: 'SubgraphModule_FullState';
  auth: Scalars['JSONObject']['output'];
  document: SubgraphModule_PhDocumentScopeState;
  global: SubgraphModule_SubgraphModuleState;
  local: Scalars['JSONObject']['output'];
};

export type SubgraphModule_InitialStateInput = {
  global?: InputMaybe<SubgraphModule_SubgraphModuleStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type SubgraphModule_PhDocumentScopeState = {
  __typename?: 'SubgraphModule_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: SubgraphModule_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type SubgraphModule_PhHashConfig = {
  __typename?: 'SubgraphModule_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type SubgraphModule_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type SubgraphModule_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

/** Module: BaseOperations */
export type SubgraphModule_SetSubgraphNameInput = {
  name: Scalars['String']['input'];
};

export type SubgraphModule_SetSubgraphStatusInput = {
  status: SubgraphModule_StatusType;
};

export type SubgraphModule_StatusType =
  | 'CONFIRMED'
  | 'DRAFT';

export type SubgraphModule_SubgraphModuleState = {
  __typename?: 'SubgraphModule_SubgraphModuleState';
  name: Scalars['String']['output'];
  status: SubgraphModule_StatusType;
};

/** Input Types for Initial State */
export type SubgraphModule_SubgraphModuleStateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SubgraphModule_StatusType>;
};

export type SubgraphModule_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  documentChanges: DocumentChangeEvent;
  jobChanges: JobChangeEvent;
};


export type SubscriptionDocumentChangesArgs = {
  search?: InputMaybe<SearchFilterInput>;
  view?: InputMaybe<ViewFilterInput>;
};


export type SubscriptionJobChangesArgs = {
  jobId: Scalars['String']['input'];
};

export type SyncEnvelope = {
  __typename?: 'SyncEnvelope';
  channelMeta: ChannelMeta;
  cursor?: Maybe<RemoteCursor>;
  dependsOn?: Maybe<Array<Scalars['String']['output']>>;
  key?: Maybe<Scalars['String']['output']>;
  operations?: Maybe<Array<OperationWithContext>>;
  type: SyncEnvelopeType;
};

export type SyncEnvelopeInput = {
  channelMeta: ChannelMetaInput;
  cursor?: InputMaybe<RemoteCursorInput>;
  dependsOn?: InputMaybe<Array<Scalars['String']['input']>>;
  key?: InputMaybe<Scalars['String']['input']>;
  operations?: InputMaybe<Array<OperationWithContextInput>>;
  type: SyncEnvelopeType;
};

export type SyncEnvelopeType =
  | 'ACK'
  | 'OPERATIONS';

export type TouchChannelInput = {
  collectionId: Scalars['String']['input'];
  filter: RemoteFilterInput;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  sinceTimestampUtcMs: Scalars['String']['input'];
};

export type TouchChannelResult = {
  __typename?: 'TouchChannelResult';
  ackOrdinal: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
};

export type Value = {
  __typename?: 'Value';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type VetraPackage = IDocument & {
  __typename?: 'VetraPackage';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: VetraPackage_VetraPackageState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: VetraPackage_VetraPackageState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type VetraPackageOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for VetraPackage operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type VetraPackageMutationResult = {
  __typename?: 'VetraPackageMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: VetraPackage_FullState;
};

/** Mutations: VetraPackage */
export type VetraPackageMutations = {
  __typename?: 'VetraPackageMutations';
  addPackageKeyword: VetraPackageMutationResult;
  addPackageKeywordAsync: Scalars['String']['output'];
  createDocument: VetraPackageMutationResult;
  createEmptyDocument: VetraPackageMutationResult;
  removePackageKeyword: VetraPackageMutationResult;
  removePackageKeywordAsync: Scalars['String']['output'];
  setPackageAuthor: VetraPackageMutationResult;
  setPackageAuthorAsync: Scalars['String']['output'];
  setPackageAuthorName: VetraPackageMutationResult;
  setPackageAuthorNameAsync: Scalars['String']['output'];
  setPackageAuthorWebsite: VetraPackageMutationResult;
  setPackageAuthorWebsiteAsync: Scalars['String']['output'];
  setPackageCategory: VetraPackageMutationResult;
  setPackageCategoryAsync: Scalars['String']['output'];
  setPackageDescription: VetraPackageMutationResult;
  setPackageDescriptionAsync: Scalars['String']['output'];
  setPackageGithubUrl: VetraPackageMutationResult;
  setPackageGithubUrlAsync: Scalars['String']['output'];
  setPackageName: VetraPackageMutationResult;
  setPackageNameAsync: Scalars['String']['output'];
  setPackageNpmUrl: VetraPackageMutationResult;
  setPackageNpmUrlAsync: Scalars['String']['output'];
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsAddPackageKeywordArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_AddPackageKeywordInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsAddPackageKeywordAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_AddPackageKeywordInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<VetraPackage_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsRemovePackageKeywordArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_RemovePackageKeywordInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsRemovePackageKeywordAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_RemovePackageKeywordInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageAuthorArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageAuthorInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageAuthorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageAuthorInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageAuthorNameArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageAuthorNameInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageAuthorNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageAuthorNameInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageAuthorWebsiteArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageAuthorWebsiteInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageAuthorWebsiteAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageAuthorWebsiteInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageCategoryArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageCategoryInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageCategoryAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageCategoryInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageDescriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageDescriptionInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageDescriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageDescriptionInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageGithubUrlArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageGithubUrlInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageGithubUrlAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageGithubUrlInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageNameArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageNameInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageNameInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageNpmUrlArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageNpmUrlInput;
};


/** Mutations: VetraPackage */
export type VetraPackageMutationsSetPackageNpmUrlAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: VetraPackage_SetPackageNpmUrlInput;
};

/** Queries: VetraPackage Document */
export type VetraPackageQueries = {
  __typename?: 'VetraPackageQueries';
  /** Get a specific VetraPackage document by identifier */
  document?: Maybe<VetraPackage_DocumentWithChildren>;
  /** Get children of a VetraPackage document */
  documentChildren: VetraPackage_DocumentResultPage;
  /** Get parents of a VetraPackage document */
  documentParents: VetraPackage_DocumentResultPage;
  /** Get all VetraPackage documents (paged) */
  documents: VetraPackage_DocumentResultPage;
  /** Find VetraPackage documents by search criteria */
  findDocuments: VetraPackage_DocumentResultPage;
};


/** Queries: VetraPackage Document */
export type VetraPackageQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<VetraPackage_ViewFilterInput>;
};


/** Queries: VetraPackage Document */
export type VetraPackageQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<VetraPackage_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<VetraPackage_ViewFilterInput>;
};


/** Queries: VetraPackage Document */
export type VetraPackageQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<VetraPackage_PagingInput>;
  view?: InputMaybe<VetraPackage_ViewFilterInput>;
};


/** Queries: VetraPackage Document */
export type VetraPackageQueriesDocumentsArgs = {
  paging?: InputMaybe<VetraPackage_PagingInput>;
};


/** Queries: VetraPackage Document */
export type VetraPackageQueriesFindDocumentsArgs = {
  paging?: InputMaybe<VetraPackage_PagingInput>;
  search?: InputMaybe<VetraPackage_SearchFilterInput>;
  view?: InputMaybe<VetraPackage_ViewFilterInput>;
};

export type VetraPackage_AddPackageKeywordInput = {
  id: Scalars['String']['input'];
  label: Scalars['String']['input'];
};

export type VetraPackage_Author = {
  __typename?: 'VetraPackage_Author';
  name?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['URL']['output']>;
};

export type VetraPackage_AuthorInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['URL']['input']>;
};

/** Paginated result type for VetraPackage documents */
export type VetraPackage_DocumentResultPage = {
  __typename?: 'VetraPackage_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<VetraPackageMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for VetraPackage */
export type VetraPackage_DocumentWithChildren = {
  __typename?: 'VetraPackage_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: VetraPackageMutationResult;
};

/** Full state with all scopes for VetraPackage */
export type VetraPackage_FullState = {
  __typename?: 'VetraPackage_FullState';
  auth: Scalars['JSONObject']['output'];
  document: VetraPackage_PhDocumentScopeState;
  global: VetraPackage_VetraPackageState;
  local: Scalars['JSONObject']['output'];
};

export type VetraPackage_InitialStateInput = {
  global?: InputMaybe<VetraPackage_VetraPackageStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type VetraPackage_Keyword = {
  __typename?: 'VetraPackage_Keyword';
  id: Scalars['OID']['output'];
  label: Scalars['String']['output'];
};

export type VetraPackage_KeywordInput = {
  id?: InputMaybe<Scalars['OID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Document scope state (same for all document types) */
export type VetraPackage_PhDocumentScopeState = {
  __typename?: 'VetraPackage_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: VetraPackage_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type VetraPackage_PhHashConfig = {
  __typename?: 'VetraPackage_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type VetraPackage_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type VetraPackage_RemovePackageKeywordInput = {
  id: Scalars['String']['input'];
};

export type VetraPackage_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type VetraPackage_SetPackageAuthorInput = {
  name?: InputMaybe<Scalars['OID']['input']>;
  website?: InputMaybe<Scalars['URL']['input']>;
};

export type VetraPackage_SetPackageAuthorNameInput = {
  name: Scalars['String']['input'];
};

export type VetraPackage_SetPackageAuthorWebsiteInput = {
  website: Scalars['URL']['input'];
};

export type VetraPackage_SetPackageCategoryInput = {
  category: Scalars['String']['input'];
};

export type VetraPackage_SetPackageDescriptionInput = {
  description: Scalars['String']['input'];
};

export type VetraPackage_SetPackageGithubUrlInput = {
  url: Scalars['URL']['input'];
};

/** Module: BaseOperations */
export type VetraPackage_SetPackageNameInput = {
  name: Scalars['String']['input'];
};

export type VetraPackage_SetPackageNpmUrlInput = {
  url: Scalars['URL']['input'];
};

export type VetraPackage_VetraPackageState = {
  __typename?: 'VetraPackage_VetraPackageState';
  author: VetraPackage_Author;
  category?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  githubUrl?: Maybe<Scalars['URL']['output']>;
  keywords: Array<VetraPackage_Keyword>;
  name?: Maybe<Scalars['String']['output']>;
  npmUrl?: Maybe<Scalars['URL']['output']>;
};

/** Input Types for Initial State */
export type VetraPackage_VetraPackageStateInput = {
  author?: InputMaybe<VetraPackage_AuthorInput>;
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  githubUrl?: InputMaybe<Scalars['URL']['input']>;
  keywords?: InputMaybe<Array<InputMaybe<VetraPackage_KeywordInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  npmUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type VetraPackage_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GetCampaignQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetCampaignQuery = { __typename?: 'Query', DefiUnited_campaign?: { __typename?: 'DefiUnited_PublicCampaign', slug: string, name: string, summary?: string | null, status: DefiUnited_CampaignStatus, incidentDate?: string | null, targetAmount?: string | null, totalPledged: string, totalReceived: string, percentReceived: number, pledgeCount: number, dependenciesBlocking: number, dependenciesResolved: number, riskDisclaimer?: string | null, lastUpdateAt?: string | null, affectedAsset?: { __typename?: 'DefiUnited_PublicAffectedAsset', symbol: string, address?: string | null, chainId: number } | null, contributionAddresses: Array<{ __typename?: 'DefiUnited_PublicContributionAddress', chainId: number, address: string, label?: string | null }>, contributorsPublic: Array<{ __typename?: 'DefiUnited_PublicPledge', contributorDisplayName: string, contributorTrustLevel: string, contributorWebsiteUrl?: string | null, contributorTwitter?: string | null, pledgedAmount: string, receivedAmount?: string | null, assetSymbol: string, status: DefiUnited_PledgeStatus, governanceProposalUrl?: string | null, governancePlatform?: string | null, publicNotes?: string | null }>, dependenciesPublic: Array<{ __typename?: 'DefiUnited_PublicDependency', title: string, description?: string | null, kind: DefiUnited_DependencyKind, status: DefiUnited_DependencyStatus, externalRefUrl?: string | null, externalRefProposalId?: string | null, expectedResolution?: string | null }>, recentUpdates: Array<{ __typename?: 'DefiUnited_PublicStatusUpdate', id: string, publishedAt: string, title: string, body: string, metricsTotalPledged?: string | null, metricsTotalReceived?: string | null, externalAnnouncements: Array<{ __typename?: 'DefiUnited_PublicExternalAnnouncement', platform: string, url: string }> }>, recentReceipts: Array<{ __typename?: 'DefiUnited_PublicReceiptEntry', id: string, txHash: string, blockNumber: number, blockTimestamp: string, fromAddress: string, toAddress: string, assetSymbol: string, assetContractAddress?: string | null, amount: string, ethEquivalentAmount: string, ethPriceUsdAtReceipt: number, reconciliationStatus: string, matchedPledgeId?: string | null }>, onchainLiveBalance?: { __typename?: 'DefiUnited_OnchainLiveBalance', totalEthEquivalent: string, ethPriceUsd: number, fetchedAt: string, perAsset: Array<{ __typename?: 'DefiUnited_OnchainAssetBalance', symbol: string, contractAddress?: string | null, rawBalance: string, formattedAmount: string, ethEquivalent: string }> } | null, pendingReceiptsEthEquivalent?: string | null, externalLinks: Array<{ __typename?: 'DefiUnited_PublicExternalLink', label: string, url: string }> } | null };

export type ListCampaignsQueryVariables = Exact<{
  status?: InputMaybe<DefiUnited_CampaignStatus>;
}>;


export type ListCampaignsQuery = { __typename?: 'Query', DefiUnited_campaigns: Array<{ __typename?: 'DefiUnited_PublicCampaign', slug: string, name: string, summary?: string | null, status: DefiUnited_CampaignStatus, targetAmount?: string | null, totalPledged: string, totalReceived: string, percentReceived: number, lastUpdateAt?: string | null }> };

export type GetContributorQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetContributorQuery = { __typename?: 'Query', DefiUnited_contributor?: { __typename?: 'DefiUnited_PublicContributorProfile', id: string, displayName: string, kind: string, websiteUrl?: string | null, twitterHandle?: string | null, farcasterHandle?: string | null, trustLevel: string, campaignParticipation: Array<{ __typename?: 'DefiUnited_CampaignParticipation', campaignSlug: string, campaignName: string, pledgedAmount: string, receivedAmount?: string | null, pledgeStatus: string, assetSymbol: string }> } | null };

export type ListContributorsQueryVariables = Exact<{
  trustLevel?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListContributorsQuery = { __typename?: 'Query', DefiUnited_contributors: Array<{ __typename?: 'DefiUnited_PublicContributorProfile', id: string, displayName: string, kind: string, trustLevel: string, websiteUrl?: string | null, twitterHandle?: string | null }> };

export type MarkPledgeConfirmedMutationVariables = Exact<{
  campaignSlug: Scalars['String']['input'];
  pledgeId: Scalars['String']['input'];
}>;


export type MarkPledgeConfirmedMutation = { __typename?: 'Mutation', DefiUnited_markPledgeConfirmed: { __typename?: 'DefiUnited_OperationResult', success: boolean, operatorAddress?: string | null, error?: string | null } };

export type ResolveDependencyMutationVariables = Exact<{
  campaignSlug: Scalars['String']['input'];
  dependencyId: Scalars['String']['input'];
}>;


export type ResolveDependencyMutation = { __typename?: 'Mutation', DefiUnited_resolveDependency: { __typename?: 'DefiUnited_OperationResult', success: boolean, operatorAddress?: string | null, error?: string | null } };

export type CancelPledgeMutationVariables = Exact<{
  campaignSlug: Scalars['String']['input'];
  pledgeId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type CancelPledgeMutation = { __typename?: 'Mutation', DefiUnited_cancelPledge: { __typename?: 'DefiUnited_OperationResult', success: boolean, operatorAddress?: string | null, error?: string | null } };

export type PublishStatusUpdateMutationVariables = Exact<{
  campaignSlug: Scalars['String']['input'];
  updateId: Scalars['String']['input'];
  publishedAt: Scalars['String']['input'];
}>;


export type PublishStatusUpdateMutation = { __typename?: 'Mutation', DefiUnited_publishStatusUpdate: { __typename?: 'DefiUnited_OperationResult', success: boolean, operatorAddress?: string | null, error?: string | null } };
