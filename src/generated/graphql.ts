import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents an ISO 8601 date and time in UTC. For example, "2022-08-18T08:53:33Z". */
  DateTime: any;
};

/** The Account object. */
export type Account = {
  __typename?: 'Account';
  /** The Account's unique identifier. */
  id: Scalars['ID'];
};

/**
 * The Application object.
 *
 * Applications represent the web or mobile app you are building. They are OAuth 2.0 clients that give you scoped access to the Propel API.
 *
 * The Application's Propeller determines the compute power assigned to the Application: the larger the Propeller, the faster the queries.
 *
 * We recommend every web or mobile app to be its own Propel Application.
 */
export type Application = Common & Node & {
  __typename?: 'Application';
  /** The Application's Account. */
  account: Account;
  /** The Application's OAuth 2.0 client identifier. */
  clientId: Scalars['String'];
  /** The Application's creation date and time in UTC. */
  createdAt: Scalars['DateTime'];
  /** The Application's creator. It can be either a User ID, an Application ID, or "system" if it was created by Propel. */
  createdBy: Scalars['String'];
  /** The Application's description. */
  description: Scalars['String'];
  /** The Application's Environment. */
  environment: Environment;
  /** The Application's unique identifier. */
  id: Scalars['ID'];
  /** The Application's last modification date and time in UTC. */
  modifiedAt: Scalars['DateTime'];
  /** The Application's last modifier. It can be either a User ID, an Application ID, or "system" if it was modified by Propel. */
  modifiedBy: Scalars['String'];
  /** A paginated list of Policies associated with the Application. */
  policies: PolicyConnection;
  /** The Application's Propeller. */
  propeller: Propeller;
  /** The Application's OAuth 2.0 scopes. */
  scopes: Array<ApplicationScope>;
  /** The Application's OAuth 2.0 client secret. */
  secret?: Maybe<Scalars['String']>;
  /** The Application's unique name. */
  uniqueName: Scalars['String'];
};


/**
 * The Application object.
 *
 * Applications represent the web or mobile app you are building. They are OAuth 2.0 clients that give you scoped access to the Propel API.
 *
 * The Application's Propeller determines the compute power assigned to the Application: the larger the Propeller, the faster the queries.
 *
 * We recommend every web or mobile app to be its own Propel Application.
 */
export type ApplicationPoliciesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/**
 * The Application connection object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type ApplicationConnection = {
  __typename?: 'ApplicationConnection';
  /** The connection's edges. */
  edges: Array<ApplicationEdge>;
  /** The connection's nodes. */
  nodes: Array<Application>;
  /** The connection's page info. */
  pageInfo: PageInfo;
};

/**
 * The Application edge object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type ApplicationEdge = {
  __typename?: 'ApplicationEdge';
  /** The edge's cursor. */
  cursor: Scalars['String'];
  /** The edge's node. */
  node: Application;
};

/**
 * The result of a mutation which creates or modifies an Application.
 *
 * If successful, an `ApplicationResponse` will be returned; otherwise, a
 * `FailureResponse` will be returned.
 */
export type ApplicationOrFailureResponse = ApplicationResponse | FailureResponse;

/** The result of a mutation which creates or modifies an Application. */
export type ApplicationResponse = {
  __typename?: 'ApplicationResponse';
  /**  The Application which was created or modified.  */
  application?: Maybe<Application>;
};

/** The API operations an Application is authorized to perform. */
export enum ApplicationScope {
  /** Grant read/write access to Data Sources, Data Pools and Metrics. */
  Admin = 'ADMIN',
  /** Grant read access to query Metrics. */
  MetricQuery = 'METRIC_QUERY',
  /** Grant read access to fetch Dimension statistics from Metrics. */
  MetricStats = 'METRIC_STATS'
}

/** Settings for Average Metrics. */
export type AverageMetricSettings = {
  __typename?: 'AverageMetricSettings';
  /** Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Metric Filters are present, all records will be included. To filter at query time, add Dimensions and use the `filters` property on the `timeSeriesInput`, `counterInput`, or `leaderboardInput` objects. There is no need to add `filters` to be able to filter at query time. */
  filters?: Maybe<Array<Filter>>;
  /** The Dimension to be averaged. */
  measure: Dimension;
};

/**
 * Boosters allow you to optimize Metric Queries for a subset of commonly used Dimensions. A Metric can have one or many Boosters to optimize for the different Query patterns.
 *
 * Boosters can be understood as an aggregating index. The index is formed from left to right as follows:
 *
 * 1. The Data Pool's Tenant ID column (if present)
 * 2. Metric Filter columns (if present)
 * 3. Query Filter Dimensions (see `dimensions`)
 * 4. The Data Pool's timestamp column
 */
export type Booster = Node & {
  __typename?: 'Booster';
  /** The Booster's Account. */
  account: Account;
  /** The Booster's creation date and time in UTC. */
  createdAt: Scalars['DateTime'];
  /** The Booster's creator. It can be either a User ID, an Application ID, or "system" if it was created by Propel. */
  createdBy: Scalars['String'];
  /** Dimensions included in the Booster. */
  dimensions: Array<Dimension>;
  /** The Booster's Environment. */
  environment: Environment;
  /**
   * If the Booster fails during the optimization process, this field includes a descriptive
   * error message.
   */
  error?: Maybe<Error>;
  /** The Booster's unique identifier. */
  id: Scalars['ID'];
  /**  The Metric this Booster is associated to.  */
  metric: Metric;
  /** The Booster's last modification date and time in UTC. */
  modifiedAt: Scalars['DateTime'];
  /** The Booster's last modifier. It can be either a User ID, an Application ID, or "system" if it was modified by Propel. */
  modifiedBy: Scalars['String'];
  /**
   * When the Booster is OPTIMIZING, this represents its progress as a number from 0 to 1.
   * In all other states, progress is null.
   */
  progress?: Maybe<Scalars['Float']>;
  /**  The number of records in the Booster.  */
  recordCount?: Maybe<Scalars['String']>;
  /**  The amount of storage in terabytes used by the Booster.  */
  sizeInTerabytes?: Maybe<Scalars['Float']>;
  /**  The status of the Booster (once LIVE it will be available for speeding up Metric queries).  */
  status: BoosterStatus;
};

/**
 * The Booster connection object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type BoosterConnection = {
  __typename?: 'BoosterConnection';
  /** The connection's edges. */
  edges?: Maybe<Array<BoosterEdge>>;
  /** The connection's nodes. */
  nodes?: Maybe<Array<Booster>>;
  /** The connection's page info. */
  pageInfo: PageInfo;
};

/**
 * The Booster edge object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type BoosterEdge = {
  __typename?: 'BoosterEdge';
  /** The edge's cursor. */
  cursor: Scalars['String'];
  /** The edge's node. */
  node: Booster;
};

/** The result of a mutation which creates or modifies a Booster. */
export type BoosterResponse = {
  __typename?: 'BoosterResponse';
  /**  The Booster which was created or modified.  */
  booster?: Maybe<Booster>;
};

/** The Booster status. */
export enum BoosterStatus {
  /**  The Booster has been created. Propel will start optimizing the Data Pool soon.  */
  Created = 'CREATED',
  /**  Propel is deleting the Booster and all of its associated data.  */
  Deleting = 'DELETING',
  /**  Propel failed to setup the Booster. Please write to support. Alternatively, you can delete the Booster and try again.  */
  Failed = 'FAILED',
  /**  The Booster is now live and available to speed up Metric queries.  */
  Live = 'LIVE',
  /**  Propel is setting up the Booster and optimizing the Data Pool.  */
  Optimizing = 'OPTIMIZING'
}

/**
 * The column object.
 *
 * Once a table introspection succeeds, it creates a new table object for every table it introspected. Within each table object, it also creates a column object for every column it introspected.
 */
export type Column = {
  __typename?: 'Column';
  /** The time at which the column was cached (i.e., the time at which it was introspected). */
  cachedAt: Scalars['DateTime'];
  /**
   * Information about the column obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  comment?: Maybe<Scalars['String']>;
  /** The time at which the column was created. This is the same as its `cachedAt` time. */
  createdAt: Scalars['DateTime'];
  /** The columns's creator. This corresponds to the initiator of the table introspection. It can be either a User ID, an Application ID, or "system" if it was created by Propel. */
  createdBy: Scalars['String'];
  /**
   * Information about the column obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  defaultValue?: Maybe<Scalars['String']>;
  /** Whether the column is nullable, meaning whether it accepts a null value. */
  isNullable?: Maybe<Scalars['Boolean']>;
  /**
   * Information about the column obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  isPrimaryKey?: Maybe<Scalars['Boolean']>;
  /**
   * Information about the column obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  isUniqueKey?: Maybe<Scalars['Boolean']>;
  /**
   * Information about the column obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  kind: Scalars['String'];
  /** The column's name. */
  name: Scalars['String'];
  /**
   * Information about the column obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  policyName?: Maybe<Scalars['String']>;
  /** The column's type. */
  type: Scalars['String'];
};

/**
 * The column connection object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type ColumnConnection = {
  __typename?: 'ColumnConnection';
  /** The time at which the columns were cached (i.e., the time at which they were introspected). */
  cachedAt: Scalars['DateTime'];
  /** The connection's edges. */
  edges: Array<ColumnEdge>;
  /** The connection's nodes. */
  nodes: Array<Column>;
  /** The connection's page info. */
  pageInfo: PageInfo;
};

/**
 * The column edge object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type ColumnEdge = {
  __typename?: 'ColumnEdge';
  /** The edge's cursor. */
  cursor: Scalars['String'];
  /** The edge's node. */
  node: Column;
};

/** The Propel data types. */
export enum ColumnType {
  /** True or false. */
  Boolean = 'BOOLEAN',
  /** A date without a timestamp. For example, "YYYY-MM-DD". */
  Date = 'DATE',
  /** A 64-bit signed double-precision floating point number. */
  Double = 'DOUBLE',
  /** A 32-bit signed double-precision floating point number. */
  Float = 'FLOAT',
  /** An 8-bit signed integer, with a minimum value of -2⁷ and a maximum value of 2⁷-1. */
  Int8 = 'INT8',
  /** A 16-bit signed integer, with a minimum value of -2¹⁵ and a maximum value of 2¹⁵-1. */
  Int16 = 'INT16',
  /** A 32-bit signed integer, with a minimum value of -2³¹ and a maximum value of 2³¹-1. */
  Int32 = 'INT32',
  /** A 64-bit signed integer, with a minimum value of -2⁶³ and a maximum value of 2⁶³-1. */
  Int64 = 'INT64',
  /** A variable-length string. */
  String = 'STRING',
  /** A date with a timestamp. For example, "yyy-MM-dd HH:mm:ss". */
  Timestamp = 'TIMESTAMP'
}

/**
 * All Propel resources, such as Applications and Metrics, have a set of common properties, such as the Propel Account and Environment that they are associated with. They also have a unique ID, which is specified in the interface `Node`.
 *
 * Environments are independent and isolated Propel workspaces for development, staging (testing), and production workloads.
 */
export type Common = {
  /**  The resource's Account.  */
  account: Account;
  /**  The resource's creation date and time in UTC.  */
  createdAt: Scalars['DateTime'];
  /**  The resource's creator. It can be either a User ID, an Application ID, or "system" if it was created by Propel.  */
  createdBy: Scalars['String'];
  /**  The resource's description.  */
  description: Scalars['String'];
  /**  The resource's Environment.  */
  environment: Environment;
  /**  The resource's last modification date and time in UTC.  */
  modifiedAt: Scalars['DateTime'];
  /**  The resource's last modifier. It can be either a User ID, an Application ID, or "system" if it was modified by Propel.  */
  modifiedBy: Scalars['String'];
  /**  The resource's unique name.  */
  uniqueName: Scalars['String'];
};

export type ConnectionSettings = HttpConnectionSettings | S3ConnectionSettings | SnowflakeConnectionSettings;

/** Settings for Count Distinct Metrics. */
export type CountDistinctMetricSettings = {
  __typename?: 'CountDistinctMetricSettings';
  /** The Dimension where the count distinct operation is going to be performed. */
  dimension: Dimension;
  /** Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Metric Filters are present, all records will be included. To filter at query time, add Dimensions and use the `filters` property on the `timeSeriesInput`, `counterInput`, or `leaderboardInput` objects. There is no need to add `filters` to be able to filter at query time. */
  filters?: Maybe<Array<Filter>>;
};

/** Settings for Count Metrics. */
export type CountMetricSettings = {
  __typename?: 'CountMetricSettings';
  /** Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Metric Filters are present, all records will be included. To filter at query time, add Dimensions and use the `filters` property on the `timeSeriesInput`, `counterInput`, or `leaderboardInput` objects. There is no need to add `filters` to be able to filter at query time. */
  filters?: Maybe<Array<Filter>>;
};

/**
 * The fields for querying a Metric in counter format.
 *
 * A Metric's counter query returns a single value over a given time range.
 */
export type CounterInput = {
  /**  The Query Filters to apply before retrieving the counter data. If no Query Filters are provided, all data is included. */
  filters?: InputMaybe<Array<FilterInput>>;
  /**  Optionally specifies the Propeller to use. This can be set when querying from the Metric Playground or GraphQL Explorer. Applications may not set this value. Instead, Application Queries always use the Propeller configured on the Application.  */
  propeller?: InputMaybe<Propeller>;
  /**  The time range for calculating the counter. */
  timeRange: TimeRangeInput;
};

/** The counter response object. It contains a single Metric value for the given time range and Query Filters. */
export type CounterResponse = {
  __typename?: 'CounterResponse';
  /** The Query statistics and metadata. */
  query: QueryInfo;
  /** The value of the counter. */
  value: Scalars['String'];
};

/** The fields for creating a new Average Metric. */
export type CreateAverageMetricInput = {
  /**  The Data Pool that powers this Metric.  */
  dataPool: Scalars['ID'];
  /**  The Metric's description.  */
  description?: InputMaybe<Scalars['String']>;
  /**  The Metric's Dimensions. Dimensions define the columns that will be available to filter the Metric at query time.  */
  dimensions?: InputMaybe<Array<DimensionInput>>;
  /**  The Metric's Filters. Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Filters are present, all records will be included.  */
  filters?: InputMaybe<Array<FilterInput>>;
  /**  The column to be averaged.  */
  measure: DimensionInput;
  /**  The Metric's unique name.  */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/**
 * The fields for creating a new Booster.
 *
 * Boosters can be understood as an aggregating index. The index is formed from left to right as follows:
 *
 * 1. The Data Pool's Tenant ID column (if present)
 * 2. Metric Filter columns (if present)
 * 3. Query Filter Dimensions (see `dimensions`)
 * 4. The Data Pool's timestamp column
 */
export type CreateBoosterInput = {
  /**
   * Dimensions to include in the Booster.
   *
   * Follow these guidelines when specifying Dimensions:
   *
   * 1. Specify Dimensions in descending order of importance for filtering and in ascending order of cardinality.
   * 2. Take into consideration hierarchical relationships as well (for example, a "country" Dimension should appear before a "state" Dimension).
   */
  dimensions: Array<DimensionInput>;
  /**  The Booster's Metric.  */
  metric: Scalars['ID'];
};

/** The fields for creating a new Count Distinct Metric. */
export type CreateCountDistinctMetricInput = {
  /**  The Data Pool that powers this Metric.  */
  dataPool: Scalars['ID'];
  /**  The Metric's description.  */
  description?: InputMaybe<Scalars['String']>;
  /**  The Dimension over which the count distinct operation is going to be performed.  */
  dimension: DimensionInput;
  /**  The Metric's Dimensions. Dimensions define the columns that will be available to filter the Metric at query time.  */
  dimensions?: InputMaybe<Array<DimensionInput>>;
  /**  The Metric's Filters. Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Filters are present, all records will be included.  */
  filters?: InputMaybe<Array<FilterInput>>;
  /**  The Metric's unique name. If not specified, Propel will set the ID as unique name. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for creating a new Count Metric. */
export type CreateCountMetricInput = {
  /**  The Data Pool that powers this Metric.  */
  dataPool: Scalars['ID'];
  /**  The Metric's description.  */
  description?: InputMaybe<Scalars['String']>;
  /**  The Metric's Dimensions. Dimensions define the columns that will be available to filter the Metric at query time.  */
  dimensions?: InputMaybe<Array<DimensionInput>>;
  /**  The Metric's Filters. Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Filters are present, all records will be included.  */
  filters?: InputMaybe<Array<FilterInput>>;
  /**  The Metric's unique name. If not specified, Propel will set the ID as unique name.  */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for creating an HTTP Data Source. */
export type CreateHttpDataSourceInput = {
  /** The HTTP Data Source connection settings. */
  connectionSettings: HttpConnectionSettingsInput;
  /** The Data Source's description. */
  description?: InputMaybe<Scalars['String']>;
  /** The Data Source's unique name. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for creating a new Maximum (Max) Metric. */
export type CreateMaxMetricInput = {
  /**  The Data Pool that powers this Metric.  */
  dataPool: Scalars['ID'];
  /**  The Metric's description.  */
  description?: InputMaybe<Scalars['String']>;
  /**  The Metric's Dimensions. Dimensions define the columns that will be available to filter the Metric at query time.  */
  dimensions?: InputMaybe<Array<DimensionInput>>;
  /**  The Metric's Filters. Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Filters are present, all records will be included.  */
  filters?: InputMaybe<Array<FilterInput>>;
  /**  The column to calculate the maximum from.  */
  measure: DimensionInput;
  /**  The Metric's unique name. If not specified, Propel will set the ID as unique name. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for creating a new Minimum (Min) Metric. */
export type CreateMinMetricInput = {
  /**  The Data Pool that powers this Metric.  */
  dataPool: Scalars['ID'];
  /**  The Metric's description.  */
  description?: InputMaybe<Scalars['String']>;
  /**  The Metric's Dimensions. Dimensions define the columns that will be available to filter the Metric at query time.  */
  dimensions?: InputMaybe<Array<DimensionInput>>;
  /**  The Metric's Filters. Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Filters are present, all records will be included.  */
  filters?: InputMaybe<Array<FilterInput>>;
  /**  The column to calculate the minimum from.  */
  measure: DimensionInput;
  /**  The Metric's unique name. If not specified, Propel will set the ID as unique name. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for creating a Policy. */
export type CreatePolicyInput = {
  /** The Application that will be granted access to the Metric. */
  application: Scalars['ID'];
  /**  The Metric to which the Policy will be applied.  */
  metric: Scalars['ID'];
  /** The type of Policy to create. */
  type: PolicyType;
};

export type CreateS3DataSourceInput = {
  /** The S3 Data Source connection settings. */
  connectionSettings?: InputMaybe<S3ConnectionSettingsInput>;
  /** The Data Source's description. */
  description?: InputMaybe<Scalars['String']>;
  /** The Data Source's unique name. If not specified, Propel will set the ID as unique name. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for creating a new Sum Metric. */
export type CreateSumMetricInput = {
  /**  The Data Pool that powers this Metric.  */
  dataPool: Scalars['ID'];
  /**  The Metric's description.  */
  description?: InputMaybe<Scalars['String']>;
  /**  The Metric's Dimensions. Dimensions define the columns that will be available to filter the Metric at query time.  */
  dimensions?: InputMaybe<Array<DimensionInput>>;
  /**  The Metric's Filters. Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Filters are present, all records will be included.  */
  filters?: InputMaybe<Array<FilterInput>>;
  /**  The column to be summed.  */
  measure: DimensionInput;
  /**  The Metric's unique name. If not specified, Propel will set the ID as unique name. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/**
 * The Data Pool object.
 *
 * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
 *
 * [Learn more about Data Pools](https://docs.propeldata.com).
 */
export type DataPool = Common & Node & {
  __typename?: 'DataPool';
  /** The Data Pool's Account. */
  account: Account;
  /**
   * A list of measures (numeric columns) available to Metrics.
   *
   * This list does not include any excluded columns.
   */
  availableMeasures?: Maybe<ColumnConnection>;
  /**
   * A list of columns included in the Data Pool. The specified columns from the underlying table will by synced to the Data Pool.
   *
   * This list does not include any excluded columns. You can access those via `excludedColumns`.
   */
  columns?: Maybe<ColumnConnection>;
  /** The Data Pool's creation date and time in UTC. */
  createdAt: Scalars['DateTime'];
  /** The Data Pools's creator. It can be either a User ID, an Application ID, or "system" if it was created by Propel. */
  createdBy: Scalars['String'];
  /** The Data Pool's data retention in days (not yet supported). */
  dataRetentionInDays: Scalars['Int'];
  /** The Data Pool's Data Source. */
  dataSource: DataSource;
  /** The Data Pool's description. */
  description: Scalars['String'];
  /** The Data Pool's Environment. */
  environment: Environment;
  /** @deprecated Refer to `setupTasks` instead */
  error?: Maybe<Error>;
  /**  A list of columns to exclude from the Data Pool. The specified columns from the underlying table will not be synced to the Data Pool.  */
  excludedColumns?: Maybe<ColumnConnection>;
  /** The Data Pool's unique identifier. */
  id: Scalars['ID'];
  metrics?: Maybe<MetricConnection>;
  /** The Data Pool's last modification date and time in UTC. */
  modifiedAt: Scalars['DateTime'];
  /** The Data Pools's last modifier. It can be either a User ID, an Application ID, or "system" if it was modified by Propel. */
  modifiedBy: Scalars['String'];
  /**  The number of records in the Data Pool.  */
  recordCount?: Maybe<Scalars['String']>;
  /**  A list of setup tasks performed on the Data Pool during its most recent setup attempt.  */
  setupTasks?: Maybe<Array<DataPoolSetupTask>>;
  /**  The amount of storage in terabytes used by the Data Pool.  */
  sizeInTerabytes?: Maybe<Scalars['Float']>;
  /** The Data Pool's status. */
  status: DataPoolStatus;
  /**  Indicates whether or not syncing records is enabled for the Data Pool.  */
  syncing?: Maybe<DataPoolSyncStatus>;
  syncs?: Maybe<SyncConnection>;
  /** The name of the Data Pool's table. */
  table: Scalars['String'];
  /** The Data Pool's Tenant ID, if configured. */
  tenant?: Maybe<Tenant>;
  /** The Data Pool's timestamp column. */
  timestamp: Dimension;
  /** The Data Pool's unique name. */
  uniqueName: Scalars['String'];
};


/**
 * The Data Pool object.
 *
 * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
 *
 * [Learn more about Data Pools](https://docs.propeldata.com).
 */
export type DataPoolAvailableMeasuresArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/**
 * The Data Pool object.
 *
 * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
 *
 * [Learn more about Data Pools](https://docs.propeldata.com).
 */
export type DataPoolColumnsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/**
 * The Data Pool object.
 *
 * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
 *
 * [Learn more about Data Pools](https://docs.propeldata.com).
 */
export type DataPoolExcludedColumnsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/**
 * The Data Pool object.
 *
 * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
 *
 * [Learn more about Data Pools](https://docs.propeldata.com).
 */
export type DataPoolMetricsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/**
 * The Data Pool object.
 *
 * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
 *
 * [Learn more about Data Pools](https://docs.propeldata.com).
 */
export type DataPoolSyncsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/**
 * The Data Pool connection object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type DataPoolConnection = {
  __typename?: 'DataPoolConnection';
  /** The connection's edges. */
  edges?: Maybe<Array<DataPoolEdge>>;
  /** The connection's nodes. */
  nodes?: Maybe<Array<DataPool>>;
  /** The connection's page info. */
  pageInfo: PageInfo;
};

/**
 * The Data Pool edge object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type DataPoolEdge = {
  __typename?: 'DataPoolEdge';
  /** The edge's cursor. */
  cursor: Scalars['String'];
  /** The edge's node. */
  node: DataPool;
};

/**
 * The result of a mutation which creates or modifies a Data Pool.
 *
 * If successful, an `DataPoolResponse` will be returned; otherwise, a
 * `FailureResponse` will be returned.
 */
export type DataPoolOrFailureResponse = DataPoolResponse | FailureResponse;

/** The result of a mutation which creates or modifies a Data Pool. */
export type DataPoolResponse = {
  __typename?: 'DataPoolResponse';
  /**  The Data Pool which was created or modified.  */
  dataPool?: Maybe<DataPool>;
};

/**
 * The Data Pool Setup Task object.
 *
 * Data Pool Setup Tasks are executed when setting up your Data Pool. They ensure Propel will be able to sync records from your Data Source to your Data Pool.
 *
 * The exact Setup Tasks to perform vary by Data Source. For example, Data Pools pointing to a Snowflake-backed Data Sources will have their own specific Setup Tasks.
 */
export type DataPoolSetupTask = {
  __typename?: 'DataPoolSetupTask';
  /**  The time at which the Data Pool Setup Task was completed.  */
  completedAt?: Maybe<Scalars['DateTime']>;
  /**  A description of the Data Pool Setup Task to be performed.  */
  description?: Maybe<Scalars['String']>;
  /**  If the Data Pool Setup Task failed, this field includes a descriptive error message.  */
  error?: Maybe<Error>;
  /**  The name of the Data Pool Setup Task to be performed.  */
  name: Scalars['String'];
  /**  The status of the Data Pool Setup Task (all setup tasks begin as NOT_STARTED before transitioning to SUCCEEDED or FAILED).  */
  status: DataPoolSetupTaskStatus;
};

/** The status of a Data Pool Setup Task. */
export enum DataPoolSetupTaskStatus {
  /** The Data Pool Setup Task has failed.  */
  Failed = 'FAILED',
  /** The Data Pool Setup Task has not been started yet. */
  NotStarted = 'NOT_STARTED',
  /** The Data Pool Setup Task has completed successfully.  */
  Succeeded = 'SUCCEEDED'
}

/** The status of a Data Pool. */
export enum DataPoolStatus {
  /** @deprecated Start using `SETUP_FAILED` instead */
  Broken = 'BROKEN',
  /** @deprecated Start using `LIVE` instead */
  Connected = 'CONNECTED',
  /** @deprecated Start using `PENDING` instead */
  Connecting = 'CONNECTING',
  /**  The Data Pool has been created and will be set up soon.  */
  Created = 'CREATED',
  /**  Propel is deleting the Data Pool and all of its associated data.  */
  Deleting = 'DELETING',
  /**  The Data Pool is set up and serving data. Check its Syncs to monitor data ingestion.  */
  Live = 'LIVE',
  /** @deprecated The ability to pause will move to a new field */
  Paused = 'PAUSED',
  /** @deprecated The ability to pause will move to a new field */
  Pausing = 'PAUSING',
  /**  Propel is attempting to set up the Data Pool.  */
  Pending = 'PENDING',
  /**  The Data Pool setup failed. Check its Setup Tasks before re-attempting setup.  */
  SetupFailed = 'SETUP_FAILED'
}

/** The Data Pool Sync Status. It indicates whether a Data Pool is syncing data or not. */
export enum DataPoolSyncStatus {
  /**  Syncing is disabled for the Data Pool.  */
  Disabled = 'DISABLED',
  /**  Propel is disabling syncing for the Data Pool.  */
  Disabling = 'DISABLING',
  /**  Syncing is enabled for the Data Pool.  */
  Enabled = 'ENABLED',
  /**  Propel is re-enabling syncing for the Data Pool.  */
  Enabling = 'ENABLING'
}

/**
 * The Data Source object.
 *
 * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
 *
 * [Learn more about Data Sources](https://docs.propeldata.com).
 */
export type DataSource = Common & Node & {
  __typename?: 'DataSource';
  /** The Data Source's Account. */
  account: Account;
  /**  A list of checks performed on the Data Source during its most recent connection attempt.  */
  checks?: Maybe<Array<DataSourceCheck>>;
  /** The Data Source's connection settings. */
  connectionSettings: ConnectionSettings;
  /** The Data Source's creation date and time in UTC. */
  createdAt: Scalars['DateTime'];
  /** The Data Source's creator. It can be either a User ID, an Application ID, or "system" if it was created by Propel. */
  createdBy: Scalars['String'];
  /**
   * If you list Data Pools via the `dataPools` field on a Data Source, you will get Data Pools for the Data Source.
   *
   * The `dataPools` field uses [cursor-based pagination](/docs/api/pagination) typical of GraphQL APIs. You can use the pairs of parameters `first` and `after` or `last` and `before` to page forward or backward through the results, respectively.
   *
   * For forward pagination, the `first` parameter defines the number of results to return, and the `after` parameter defines the cursor to continue from. You should pass the cursor for the _last_ result of the current page to `after`.
   *
   * For backward pagination, the `last` parameter defines the number of results to return, and the `before` parameter defines the cursor to continue from. You should pass the cursor for the _first_ result of the current page to `before`.
   */
  dataPools?: Maybe<DataPoolConnection>;
  /** The Data Source's description. */
  description: Scalars['String'];
  /** The Data Source's Environment. */
  environment: Environment;
  /** @deprecated Refer to `checks` instead */
  error?: Maybe<Error>;
  /** The Data Source's unique identifier. */
  id: Scalars['ID'];
  /** The Data Source's last modification date and time in UTC. */
  modifiedAt: Scalars['DateTime'];
  /** The Data Source's last modifier. It can be either a User ID, an Application ID, or "system" if it was modified by Propel. */
  modifiedBy: Scalars['String'];
  /** The Data Source's status. */
  status: DataSourceStatus;
  /** A list of table introspections performed for the Data Source. You can see how tables and columns changed over time by paging through this list. */
  tableIntrospections?: Maybe<TableIntrospectionConnection>;
  /** The tables contained within the Data Source, according to the most recent table introspection.  */
  tables?: Maybe<TableConnection>;
  /** The Data Source's type. */
  type: DataSourceType;
  /** The Data Source's unique name. */
  uniqueName: Scalars['String'];
};


/**
 * The Data Source object.
 *
 * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
 *
 * [Learn more about Data Sources](https://docs.propeldata.com).
 */
export type DataSourceDataPoolsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/**
 * The Data Source object.
 *
 * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
 *
 * [Learn more about Data Sources](https://docs.propeldata.com).
 */
export type DataSourceTableIntrospectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/**
 * The Data Source object.
 *
 * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
 *
 * [Learn more about Data Sources](https://docs.propeldata.com).
 */
export type DataSourceTablesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/**
 * The Data Source Check object.
 *
 * Data Source Checks are executed when setting up your Data Source. They check that Propel will be able to receive data and setup Data Pools.
 *
 * The exact Checks to perform vary by Data Source. For example, Snowflake-backed Data Sources will have their own specific Checks.
 */
export type DataSourceCheck = {
  __typename?: 'DataSourceCheck';
  /**  The time at which the Data Source Check was performed.  */
  checkedAt?: Maybe<Scalars['DateTime']>;
  /**  A description of the Data Source Check to be performed.  */
  description?: Maybe<Scalars['String']>;
  /**  If the Data Source Check failed, this field includes a descriptive error message.  */
  error?: Maybe<Error>;
  /**  The name of the Data Source Check to be performed.  */
  name: Scalars['String'];
  /**  The status of the Data Source Check (all checks begin as NOT_STARTED before transitioning to SUCCEEDED or FAILED).  */
  status: DataSourceCheckStatus;
};

/** The status of a Data Source Check. */
export enum DataSourceCheckStatus {
  /** The Check failed. */
  Failed = 'FAILED',
  /** The Check has not started. */
  NotStarted = 'NOT_STARTED',
  /** The Check succeeded. */
  Succeeded = 'SUCCEEDED'
}

/**
 * The Data Source connection object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type DataSourceConnection = {
  __typename?: 'DataSourceConnection';
  /** The connection's edges. */
  edges?: Maybe<Array<DataSourceEdge>>;
  /** The connection's nodes. */
  nodes?: Maybe<Array<DataSource>>;
  /** The connection's page info. */
  pageInfo: PageInfo;
};

/**
 * The Data Source edge object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type DataSourceEdge = {
  __typename?: 'DataSourceEdge';
  /** The edge's cursor. */
  cursor: Scalars['String'];
  /** The edge's node. */
  node: DataSource;
};

/**
 * The result of a mutation which creates or modifies a DataSource.
 *
 * If successful, an `DataSourceResponse` will be returned; otherwise, a
 * `FailureResponse` will be returned.
 */
export type DataSourceOrFailureResponse = DataSourceResponse | FailureResponse;

/** The result of a mutation which creates or modifies a Data Source. */
export type DataSourceResponse = {
  __typename?: 'DataSourceResponse';
  /**  The Data Source which was created or modified.  */
  dataSource?: Maybe<DataSource>;
};

/** The status of a Data Source. */
export enum DataSourceStatus {
  /** The Data Source failed to connect. */
  Broken = 'BROKEN',
  /** The Data Source is connected. */
  Connected = 'CONNECTED',
  /** Propel is attempting to connect the Data Source. */
  Connecting = 'CONNECTING',
  /** The Data Source has been created, but it is not connected yet. */
  Created = 'CREATED',
  /** Propel is deleting the Data Source. */
  Deleting = 'DELETING'
}

/** The types of Data Sources. */
export enum DataSourceType {
  /** Indicates an Http Data Source. */
  Http = 'Http',
  /** Indicates an S3 Data Source. */
  S3 = 'S3',
  /** Indicates a Snowflake Data Source. */
  Snowflake = 'Snowflake'
}

/** The Dimension object that represents a column in a table. */
export type Dimension = {
  __typename?: 'Dimension';
  /**  The column name it represents.  */
  columnName: Scalars['String'];
  /**  Whether the column is nullable.  */
  isNullable?: Maybe<Scalars['Boolean']>;
  /**
   *  Whether the column is a unique key.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  isUniqueKey?: Maybe<Scalars['Boolean']>;
  /**  The statistics for the dimension values. Fetching statistics incurs query costs. */
  stats?: Maybe<DimensionStatistics>;
  /**  The column data type.  */
  type: Scalars['String'];
};

/** The fields for creating or modifying a Dimension. */
export type DimensionInput = {
  /**  The name of the column to create the Dimension from.  */
  columnName: Scalars['String'];
};

/** Statistics about a particular Dimension. */
export type DimensionStatistics = {
  __typename?: 'DimensionStatistics';
  /**  The average value of the Dimension. Empty for non-numeric Dimensions.  */
  average?: Maybe<Scalars['String']>;
  /**  The maximum value of the Dimension.  */
  max?: Maybe<Scalars['String']>;
  /**  The minimum value of the Dimension.  */
  min?: Maybe<Scalars['String']>;
  /** The Query statistics and metadata. */
  query: QueryInfo;
  /**  An array of unique values for the Dimension, up to 1,000. Empty if the Dimension contains more than 1,000 unique values. Fetching unique values incurs query costs.  */
  uniqueValues?: Maybe<Array<Scalars['String']>>;
};


/** Statistics about a particular Dimension. */
export type DimensionStatisticsUniqueValuesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

/**
 * The Environments object.
 *
 * Environments are independent and isolated Propel workspaces for development, staging (testing), and production workloads. Environments are hosted in a specific region, initially in us-east-2 only.
 */
export type Environment = {
  __typename?: 'Environment';
  /** The Environment's unique identifier. */
  id: Scalars['ID'];
};

/** The error object. */
export type Error = {
  __typename?: 'Error';
  /** The error code. */
  code?: Maybe<Scalars['Int']>;
  /** The error message. */
  message: Scalars['String'];
};

/** The failure response object. */
export type FailureResponse = {
  __typename?: 'FailureResponse';
  /** The error that caused the failure. */
  error: Error;
};

/** The fields of a Filter. */
export type Filter = {
  __typename?: 'Filter';
  /**  The name of the column to filter on.  */
  column: Scalars['String'];
  /**  The operation to perform when comparing the column and filter values.  */
  operator: FilterOperator;
  /**  The value to compare the column to.  */
  value: Scalars['String'];
};

/** The fields for defining a Filter. */
export type FilterInput = {
  /**  The name of the column to filter on.  */
  column: Scalars['String'];
  /**  The operation to perform when comparing the column and filter values.  */
  operator: FilterOperator;
  /**  The value to compare the column to.  */
  value: Scalars['String'];
};

/** The available Filter operators. */
export enum FilterOperator {
  /**  Selects values that are equal to the specified value. */
  Equals = 'EQUALS',
  /**  Selects values that are greater than the specified value. */
  GreaterThan = 'GREATER_THAN',
  /**  Selects values that are greater or equal to the specified value. */
  GreaterThanOrEqualTo = 'GREATER_THAN_OR_EQUAL_TO',
  /**  Selects values that are less than the specified value. */
  LessThan = 'LESS_THAN',
  /**  Selects values that are less or equal to the specified value. */
  LessThanOrEqualTo = 'LESS_THAN_OR_EQUAL_TO',
  /**  Selects values that are not equal to the specified value. */
  NotEquals = 'NOT_EQUALS'
}

/** The fields for specifying an HTTP Data Source's Basic authentication settings. */
export type HttpBasicAuthInput = {
  /** The password for HTTP Basic authentication that must be included in the Authorization header when uploading new data. */
  password: Scalars['String'];
  /** The username for HTTP Basic authentication that must be included in the Authorization header when uploading new data. */
  username: Scalars['String'];
};

/** The HTTP Basic authentication settings. */
export type HttpBasicAuthSettings = {
  __typename?: 'HttpBasicAuthSettings';
  /** Password for HTTP Basic authentication that must be included in the Authorization header when uploading new data. */
  password: Scalars['String'];
  /** Username for HTTP Basic authentication that must be included in the Authorization header when uploading new data. */
  username: Scalars['String'];
};

/** The HTTP Data Source connection settings. */
export type HttpConnectionSettings = {
  __typename?: 'HttpConnectionSettings';
  /**
   * The HTTP Basic authentication settings for uploading new data.
   *
   * If this parameter is not provided, anyone with the URL to your tables will be able to upload data.
   * While it's OK to test without HTTP Basic authentication, we recommend enabling it.
   */
  basicAuth?: Maybe<HttpBasicAuthSettings>;
};

/** The fields for creating an HTTP Data Source's connection settings. */
export type HttpConnectionSettingsInput = {
  /**
   * The HTTP Basic authentication settings for uploading new data.
   *
   * If this parameter is not provided, anyone with the URL to your tables will be able to upload data.
   * While it's OK to test without HTTP Basic authentication, we recommend enabling it.
   */
  basicAuth?: InputMaybe<HttpBasicAuthInput>;
  /** The Data Source's tables. */
  tables: Array<HttpDataSourceTableInput>;
};

/** The fields for specifying a Column in a Table. */
export type HttpDataSourceColumnInput = {
  /** The column name. It has to be unique within a Table. */
  name: Scalars['String'];
  /** Whether the column's type is nullable or not. */
  nullable: Scalars['Boolean'];
  /** The column type. */
  type: ColumnType;
};

/** The fields for specifying a Table. */
export type HttpDataSourceTableInput = {
  /** All the columns that will be present in the table */
  columns: Array<HttpDataSourceColumnInput>;
  /** The name of the table */
  name: Scalars['String'];
};

/**
 * The fields for querying a Metric in leaderboard format.
 *
 * A Metric's leaderboard query returns an ordered table of Dimension and Metric values over a given time range.
 */
export type LeaderboardInput = {
  /**  One or many Dimensions to group the Metric values by. Typically, Dimensions in a leaderboard are what you want to compare and rank.  */
  dimensions: Array<DimensionInput>;
  /**  The list of filters to apply before retrieving the leaderboard data. If no Query Filters are provided, all data is included. */
  filters?: InputMaybe<Array<FilterInput>>;
  /** Optionally specifies the Propeller to use. This can be set by Users when querying from the Metric Playground or GraphQL Explorer. Applications may not set this value. Instead, Application Queries always use the Propeller configured on the Application.  */
  propeller?: InputMaybe<Propeller>;
  /**  The number of rows to be returned. It can be a number between 1 and 1,000.  */
  rowLimit: Scalars['Int'];
  /**  The sort order of the rows. It can be ascending (`ASC`) or descending (`DESC`) order. Defaults to descending (`DESC`) order when not provided.  */
  sort?: InputMaybe<Sort>;
  /**  The time range for calculating the leaderboard. */
  timeRange: TimeRangeInput;
};

/** The leaderboard response object. It contains an array of headers and a table (array of rows) with the selected Dimensions and corresponding Metric values for the given time range and Query Filters. */
export type LeaderboardResponse = {
  __typename?: 'LeaderboardResponse';
  /**  The table headers. It contains the Dimension and Metric names. */
  headers: Array<Scalars['String']>;
  /** The Query statistics and metadata. */
  query: QueryInfo;
  /**  An ordered array of rows. Each row contains the Dimension values and the corresponding Metric value. A Dimension value can be empty. A Metric value will never be empty. */
  rows: Array<Array<Maybe<Scalars['String']>>>;
};

/** Settings for Max Metrics. */
export type MaxMetricSettings = {
  __typename?: 'MaxMetricSettings';
  /** Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Metric Filters are present, all records will be included. To filter at query time, add Dimensions and use the `filters` property on the `timeSeriesInput`, `counterInput`, or `leaderboardInput` objects. There is no need to add `filters` to be able to filter at query time. */
  filters?: Maybe<Array<Filter>>;
  /** The Dimension to select the maximum from. */
  measure: Dimension;
};

/**
 * The Metric object.
 *
 * A Metric is a business indicator measured over time.
 *
 * [Learn more about Metrics](/docs/key-concepts#metric).
 */
export type Metric = Common & Node & {
  __typename?: 'Metric';
  /** Whether or not access control is enabled for the Metric. */
  accessControlEnabled: Scalars['Boolean'];
  /** The Metric's Account. */
  account: Account;
  /** List the Boosters associated to the Metric. */
  boosters: BoosterConnection;
  /** The Metric data in counter format. A single metric value for the given time range and filters. */
  counter?: Maybe<CounterResponse>;
  /** The Metric's creation date and time in UTC. */
  createdAt: Scalars['DateTime'];
  /** The Metric's creator. It can be either a User ID, an Application ID, or "system" if it was created by Propel. */
  createdBy: Scalars['String'];
  /** The Data Pool that powers this Metric. */
  dataPool?: Maybe<DataPool>;
  /** The Metric's description. */
  description: Scalars['String'];
  /** The Metric's Dimensions. These Dimensions are available to Query Filters. */
  dimensions: Array<Dimension>;
  /** The Metric's Environment. */
  environment: Environment;
  /** The Metric's unique identifier. */
  id: Scalars['ID'];
  /** The Metric data in leaderboard format. A table (array of rows) with the selected dimensions and corresponding Metric values for the given time range and filters. */
  leaderboard?: Maybe<LeaderboardResponse>;
  /**
   * The Metric's measure. Access this from the Metric's `settings` object instead.
   * @deprecated Use the Metric `settings` object instead.
   */
  measure?: Maybe<Dimension>;
  /** The Metric's last modification date and time in UTC. */
  modifiedAt: Scalars['DateTime'];
  /** The Metric's last modifier. It can be either a User ID, an Application ID, or "system" if it was modified by Propel. */
  modifiedBy: Scalars['String'];
  /** List the Policies associated to the Metric. */
  policies: PolicyConnection;
  /** The settings for the Metric. The settings are specific to the Metric's type. */
  settings: MetricSettings;
  /** The Metric data in time series format. Arrays of timestamps and Metric values for the given time range and filters. */
  timeSeries?: Maybe<TimeSeriesResponse>;
  /** The Metric's timestamp. This is the same as its Data Pool's timestamp. */
  timestamp: Dimension;
  /** The Metric's type. The different Metric types determine how the values are calculated. */
  type: MetricType;
  /** The Metric's unique name. */
  uniqueName: Scalars['String'];
};


/**
 * The Metric object.
 *
 * A Metric is a business indicator measured over time.
 *
 * [Learn more about Metrics](/docs/key-concepts#metric).
 */
export type MetricBoostersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/**
 * The Metric object.
 *
 * A Metric is a business indicator measured over time.
 *
 * [Learn more about Metrics](/docs/key-concepts#metric).
 */
export type MetricCounterArgs = {
  input: CounterInput;
};


/**
 * The Metric object.
 *
 * A Metric is a business indicator measured over time.
 *
 * [Learn more about Metrics](/docs/key-concepts#metric).
 */
export type MetricLeaderboardArgs = {
  input: LeaderboardInput;
};


/**
 * The Metric object.
 *
 * A Metric is a business indicator measured over time.
 *
 * [Learn more about Metrics](/docs/key-concepts#metric).
 */
export type MetricPoliciesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/**
 * The Metric object.
 *
 * A Metric is a business indicator measured over time.
 *
 * [Learn more about Metrics](/docs/key-concepts#metric).
 */
export type MetricTimeSeriesArgs = {
  input: TimeSeriesInput;
};

/**
 * The Metric connection object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type MetricConnection = {
  __typename?: 'MetricConnection';
  /** The connection's edges. */
  edges?: Maybe<Array<MetricEdge>>;
  /** The connection's nodes. */
  nodes?: Maybe<Array<Metric>>;
  /** The connection's page info. */
  pageInfo: PageInfo;
};

/**
 * The Metric edge object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type MetricEdge = {
  __typename?: 'MetricEdge';
  /** The edge's cursor. */
  cursor: Scalars['String'];
  /** The edge's node. */
  node: Metric;
};

/** The result of a mutation which creates or modifies a Metric. */
export type MetricResponse = {
  __typename?: 'MetricResponse';
  /**  The Metric which was created or modified.  */
  metric?: Maybe<Metric>;
};

/** A Metric's settings, depending on its type. */
export type MetricSettings = AverageMetricSettings | CountDistinctMetricSettings | CountMetricSettings | MaxMetricSettings | MinMetricSettings | SumMetricSettings;

/** The available Metric types. */
export enum MetricType {
  /** Averages the values of the specified column for every record that matches the Metric Filters. For time series, it will average the values for each time granularity. */
  Average = 'AVERAGE',
  /**  Counts the number of records that matches the Metric Filters. For time series, it will count the values for each time granularity. */
  Count = 'COUNT',
  /** Counts the number of distinct values in the specified column for every record that matches the Metric Filters. For time series, it will count the distinct values for each time granularity. */
  CountDistinct = 'COUNT_DISTINCT',
  /** Selects the maximum value of the specified column for every record that matches the Metric Filters. For time series, it will select the maximum value for each time granularity. */
  Max = 'MAX',
  /** Selects the minimum value of the specified column for every record that matches the Metric Filters. For time series, it will select the minimum value for each time granularity. */
  Min = 'MIN',
  /** Sums the values of the specified column for every record that matches the Metric Filters. For time series, it will sum the values for each time granularity. */
  Sum = 'SUM'
}

/** The fields for migrating a Metric's Data Pool. */
export type MigrateMetricInput = {
  /**  The Metric that is going to be migrated.  */
  metricId: Scalars['ID'];
  /**  The DataPool to which the Metric is going to be migrated.  */
  newDataPoolId: Scalars['ID'];
};

/** Settings for Min Metrics. */
export type MinMetricSettings = {
  __typename?: 'MinMetricSettings';
  /** Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Metric Filters are present, all records will be included. To filter at query time, add Dimensions and use the `filters` property on the `timeSeriesInput`, `counterInput`, or `leaderboardInput` objects. There is no need to add `filters` to be able to filter at query time. */
  filters?: Maybe<Array<Filter>>;
  /** The Dimension to select the minimum from. */
  measure: Dimension;
};

/** The fields for modifying an HTTP Data Source. */
export type ModifyHttpDataSourceInput = {
  /** The Data Source's new connection settings.  */
  connectionSettings?: InputMaybe<PartialHttpConnectionSettingsInput>;
  /** The Data Source's new description.  */
  description?: InputMaybe<Scalars['String']>;
  /** The ID or unique name of the Data Source to modify. */
  idOrUniqueName: IdOrUniqueName;
  /** The Data Source's new unique name.  */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for modifying a Metric. */
export type ModifyMetricInput = {
  /** Enables or disables access control for the Metric. */
  accessControlEnabled?: InputMaybe<Scalars['Boolean']>;
  /**  The Metric's new description.  */
  description?: InputMaybe<Scalars['String']>;
  /**  The Metric's new Dimensions. Used to add or remove Dimensions.  */
  dimensions?: InputMaybe<Array<DimensionInput>>;
  /**  The Metric's new Filters. Used to add or remove Metric Filters.  */
  filters?: InputMaybe<Array<FilterInput>>;
  /** The ID of the Metric to modify.  */
  metric: Scalars['ID'];
  /**  The Metric's new unique name.  */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for modifying a Policy. */
export type ModifyPolicyInput = {
  /** The Policy's unique identifier. */
  policy: Scalars['ID'];
  /** The type of Policy. */
  type: PolicyType;
};

export type ModifyS3DataSourceInput = {
  /** The Data Source's new connection settings. If not provided this property will not be modified. */
  connectionSettings?: InputMaybe<PartialS3ConnectionSettingsInput>;
  /** The Data Source's new description. If not provided this property will not be modified. */
  description?: InputMaybe<Scalars['String']>;
  /** The ID or unique name of the Data Source to modify. */
  idOrUniqueName: IdOrUniqueName;
  /** The Data Source's new unique name. If not provided this property will not be modified. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * This mutation creates a new Application and returns the newly created Application (or an error message if creating the Application fails).
   *
   * An Application is an OAuth 2.0 client that gives you scoped access to the Propel APIs.
   */
  createApplication?: Maybe<ApplicationOrFailureResponse>;
  /**
   * This mutation creates a new Average Metric from the given Data Pool and returns the newly created Metric (or an error message if creating the Metric fails).
   *
   * A Metric is a business indicator measured over time. An Average Metric returns the average of the underlying data over a specific time period.
   */
  createAverageMetric?: Maybe<MetricResponse>;
  /**
   * This mutation creates a new Booster for the given Metric and returns the newly created Booster.
   *
   * A Booster significantly improves the query performance for a Metric.
   */
  createBooster?: Maybe<BoosterResponse>;
  /**
   * This mutation creates a new Count Distinct Metric from the given Data Pool and returns the newly created Metric (or an error message if creating the Metric fails).
   *
   * A Metric is a business indicator measured over time. A Count Distinct Metric returns the number of distinct items found in the underlying data over a specific time period.
   */
  createCountDistinctMetric?: Maybe<MetricResponse>;
  /**
   * This mutation creates a new Count Metric from the given Data Pool and returns the newly created Metric (or an error message if creating the Metric fails).
   *
   * A Metric is a business indicator measured over time. A Count Metric returns the number of items found in the underlying data over a specific time period.
   */
  createCountMetric?: Maybe<MetricResponse>;
  /**
   * This mutation creates a new Data Pool from the given Data Source based on the specified table and using a particular column as the timestamp.
   *
   * The mutation returns the newly created Data Pool (or an error message if creating the Data Pool fails).
   *
   * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
   */
  createDataPool?: Maybe<DataPoolOrFailureResponse>;
  /**
   * This mutation creates a new HTTP Data Source from the given settings.
   *
   * The mutation returns the newly created Data Source (or an error message if creating the Data Source fails).
   */
  createHttpDataSource: DataSourceResponse;
  /**
   * This mutation creates a new Max Metric from the given Data Pool and returns the newly created Metric (or an error message if creating the Metric fails).
   *
   * A Metric is a business indicator measured over time. A Max Metric returns the maximum value found in the underlying data during a specific time period.
   */
  createMaxMetric?: Maybe<MetricResponse>;
  /**
   * This mutation creates a new Min Metric from the given Data Pool and returns the newly created Metric (or an error message if creating the Metric fails).
   *
   * A Metric is a business indicator measured over time. A Min Metric returns the minimum value found in the underlying data during a specific time period.
   */
  createMinMetric?: Maybe<MetricResponse>;
  /** Creates a new Policy granting an Application access to a Metric's data. */
  createPolicy?: Maybe<PolicyResponse>;
  /**
   * This mutation creates a new Data Source, pointed at the specified S3 bucket.
   *
   * The mutation returns the newly created Data Source (or an error message if creating the Data Source fails).
   */
  createS3DataSource: DataSourceResponse;
  /**
   * This mutation creates a new Data Source from the given Snowflake database using the specified Snowflake account, warehouse, schema, username, and role.
   *
   * The mutation returns the newly created Data Source (or an error message if creating the Data Source fails).
   *
   * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
   */
  createSnowflakeDataSource?: Maybe<DataSourceOrFailureResponse>;
  /**
   * This mutation creates a new Sum Metric from the given Data Pool and returns the newly created Metric (or an error message if creating the Metric fails).
   *
   * A Metric is a business indicator measured over time. A Sum Metric returns the sum of the values found in the underlying data over a specific time period.
   */
  createSumMetric?: Maybe<MetricResponse>;
  /**
   * This mutation deletes the specified Application by ID and then returns the same ID if the Application was deleted successfully.
   *
   * An Application is an OAuth 2.0 client that gives you scoped access to the Propel APIs.
   */
  deleteApplication?: Maybe<Scalars['ID']>;
  /**
   * This mutation deletes the specified Application by name and then returns the Application's ID if the Application was deleted successfully.
   *
   * An Application is an OAuth 2.0 client that gives you scoped access to the Propel APIs.
   */
  deleteApplicationByName?: Maybe<Scalars['ID']>;
  /**
   * This mutation deletes the specified Booster by ID and then returns the same ID if the Booster was deleted successfully.
   *
   * A Booster significantly improves the query performance for a Metric.
   */
  deleteBooster?: Maybe<Scalars['ID']>;
  /**
   * This mutation deletes the specified Data Pool by ID and then returns the same ID if the Data Pool was deleted successfully.
   *
   * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
   */
  deleteDataPool?: Maybe<Scalars['ID']>;
  /**
   * This mutation deletes the specified Data Pool by name and then returns the Data Pool's ID if the Data Pool was deleted successfully.
   *
   * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
   */
  deleteDataPoolByName?: Maybe<Scalars['ID']>;
  /**
   * This mutation deletes the specified Data Source by ID and then returns the same ID if the Data Source was deleted successfully.
   *
   * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
   */
  deleteDataSource?: Maybe<Scalars['ID']>;
  /**
   * This mutation deletes the specified Data Source by name and then returns the Data Source's ID if the Data Source was deleted successfully.
   *
   * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
   */
  deleteDataSourceByName?: Maybe<Scalars['ID']>;
  /**
   * This mutation deletes the specified Metric by ID and then returns the same ID if the Data Source was deleted successfully.
   *
   * A Metric is a business indicator measured over time.
   */
  deleteMetric?: Maybe<Scalars['ID']>;
  /**
   * This mutation deletes the specified Metric by name and then returns the Metric's ID if the Data Source was deleted successfully.
   *
   * A Metric is a business indicator measured over time.
   */
  deleteMetricByName?: Maybe<Scalars['ID']>;
  /** Deletes a Policy. The associated Application will no longer have access to the Metric's data. */
  deletePolicy?: Maybe<Scalars['ID']>;
  /**  Disabling syncing of a Data Pool.  */
  disableSyncing?: Maybe<DataPool>;
  /**  Re-enable syncing of a Data Pool.  */
  enableSyncing?: Maybe<DataPool>;
  /** Extracts the schema from the table and updates the schema object. */
  inspectDataPoolSchema?: Maybe<DataPoolOrFailureResponse>;
  /**
   * This mutation is used to introspect the tables in the given Data Source, specified either by its ID or unique name.
   *
   * The mutation returns the tables along with when they were last cached from the Data Source.
   *
   * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
   */
  introspectTables?: Maybe<TableIntrospection>;
  migrateMetric?: Maybe<Metric>;
  /**
   * This mutation selects an Application by its ID or unique name and modifies it to have the given unique name, description, Propeller, and scopes.
   *
   * If any of the optional arguments are omitted, those properties will be unchanged on the Application.
   *
   * An Application is an OAuth 2.0 client that gives you scoped access to the Propel APIs; a Propeller significantly increases the query performance of a Metric; and scopes securely specify the permissions allowed to the Application.
   */
  modifyApplication?: Maybe<ApplicationOrFailureResponse>;
  /**
   * This mutation selects a Data Pool by its ID or unique name and modifies it to have the given unique name, description, and data retention time.
   *
   * If any of the optional arguments are omitted, those properties will be unchanged on the Data Pool.
   *
   * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
   */
  modifyDataPool?: Maybe<DataPoolOrFailureResponse>;
  /**
   * This mutation selects a Data Source by its ID or unique name and modifies it to have the given unique name, description, and connection settings.
   *
   * If any of the optional arguments are omitted, those properties will be unchanged on the Data Source.
   */
  modifyHttpDataSource: DataSourceResponse;
  /**
   * This mutation selects a Metric by its ID and modifies it to have the given unique name, description, and Dimensions.
   *
   * If any of the optional arguments are omitted, those properties will be unchanged on the Metric.
   *
   * A Metric is a business indicator measured over time.
   */
  modifyMetric?: Maybe<MetricResponse>;
  /** Modifies an existing Policy. You can modify the Application's level of access to the Metric's data. */
  modifyPolicy?: Maybe<PolicyResponse>;
  /**
   * This mutation selects a Data Source by its ID or unique name and modifies it to have the given unique name, description, and connection settings.
   *
   * If any of the optional arguments are omitted, those properties will be unchanged on the Data Source.
   */
  modifyS3DataSource: DataSourceResponse;
  /**
   * This mutation selects a Data Source by its ID or unique name and modifies it to have the given unique name, description, and connection settings.
   *
   * If any of the optional arguments are omitted, those properties will be unchanged on the Data Source.
   *
   * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
   */
  modifySnowflakeDataSource?: Maybe<DataSourceOrFailureResponse>;
  /**
   * Deprecated. Use `retryDataPoolSetup` instead.
   * @deprecated Use `retryDataPoolSetup` instead
   */
  reconnectDataPool?: Maybe<DataPool>;
  /**
   * This mutation attempts to reconnect to the Data Source identified by the given ID or unique name. The mutation then returns the Data Source.
   *
   * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
   */
  reconnectDataSource?: Maybe<DataSource>;
  /** Retries to set up the Data Pool identified by the given ID. */
  retryDataPoolSetup?: Maybe<DataPool>;
  /** Retries to set up the Data Pool identified by the given unique name. */
  retryDataPoolSetupByName?: Maybe<DataPool>;
  /** Tests that Propel has access to the Data Pool's table in its corresponding Data Source and will be able to Sync data. Updates the status. */
  testDataPool?: Maybe<DataPoolOrFailureResponse>;
  /** Tests that Propel can actually connect to the data warehouse. Updates the status. */
  testDataSource?: Maybe<DataSourceOrFailureResponse>;
};


export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};


export type MutationCreateAverageMetricArgs = {
  input?: InputMaybe<CreateAverageMetricInput>;
};


export type MutationCreateBoosterArgs = {
  input: CreateBoosterInput;
};


export type MutationCreateCountDistinctMetricArgs = {
  input?: InputMaybe<CreateCountDistinctMetricInput>;
};


export type MutationCreateCountMetricArgs = {
  input?: InputMaybe<CreateCountMetricInput>;
};


export type MutationCreateDataPoolArgs = {
  input: CreateDataPoolInput;
};


export type MutationCreateHttpDataSourceArgs = {
  input: CreateHttpDataSourceInput;
};


export type MutationCreateMaxMetricArgs = {
  input?: InputMaybe<CreateMaxMetricInput>;
};


export type MutationCreateMinMetricArgs = {
  input?: InputMaybe<CreateMinMetricInput>;
};


export type MutationCreatePolicyArgs = {
  input: CreatePolicyInput;
};


export type MutationCreateS3DataSourceArgs = {
  input: CreateS3DataSourceInput;
};


export type MutationCreateSnowflakeDataSourceArgs = {
  input: CreateSnowflakeDataSourceInput;
};


export type MutationCreateSumMetricArgs = {
  input?: InputMaybe<CreateSumMetricInput>;
};


export type MutationDeleteApplicationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteApplicationByNameArgs = {
  uniqueName: Scalars['String'];
};


export type MutationDeleteBoosterArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDataPoolArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDataPoolByNameArgs = {
  uniqueName: Scalars['String'];
};


export type MutationDeleteDataSourceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDataSourceByNameArgs = {
  uniqueName: Scalars['String'];
};


export type MutationDeleteMetricArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMetricByNameArgs = {
  uniqueName: Scalars['String'];
};


export type MutationDeletePolicyArgs = {
  id: Scalars['ID'];
};


export type MutationDisableSyncingArgs = {
  id: Scalars['ID'];
};


export type MutationEnableSyncingArgs = {
  id: Scalars['ID'];
};


export type MutationInspectDataPoolSchemaArgs = {
  input: IdOrUniqueName;
};


export type MutationIntrospectTablesArgs = {
  input: IdOrUniqueName;
};


export type MutationMigrateMetricArgs = {
  input: MigrateMetricInput;
};


export type MutationModifyApplicationArgs = {
  input: ModifyApplicationInput;
};


export type MutationModifyDataPoolArgs = {
  input: ModifyDataPoolInput;
};


export type MutationModifyHttpDataSourceArgs = {
  input: ModifyHttpDataSourceInput;
};


export type MutationModifyMetricArgs = {
  input?: InputMaybe<ModifyMetricInput>;
};


export type MutationModifyPolicyArgs = {
  input: ModifyPolicyInput;
};


export type MutationModifyS3DataSourceArgs = {
  input: ModifyS3DataSourceInput;
};


export type MutationModifySnowflakeDataSourceArgs = {
  input: ModifySnowflakeDataSourceInput;
};


export type MutationReconnectDataPoolArgs = {
  input: IdOrUniqueName;
};


export type MutationReconnectDataSourceArgs = {
  input: IdOrUniqueName;
};


export type MutationRetryDataPoolSetupArgs = {
  id: Scalars['ID'];
};


export type MutationRetryDataPoolSetupByNameArgs = {
  uniqueName: Scalars['String'];
};


export type MutationTestDataPoolArgs = {
  input: IdOrUniqueName;
};


export type MutationTestDataSourceArgs = {
  input: IdOrUniqueName;
};

/** All Propel resources, such as Applications and Metrics, have a unique identifier, or ID. Typically, they may also have a unique name, which is specified in the interface `Common`. */
export type Node = {
  id: Scalars['ID'];
};

/** The page info object used for pagination. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Points to the last item returned in the results. Used when paginating forward. */
  endCursor?: Maybe<Scalars['String']>;
  /** A boolean that indicates whether a next page of results exists. Can be used to display a "next page" button in user interfaces, for example. */
  hasNextPage: Scalars['Boolean'];
  /** A boolean that indicates whether a previous page of results exists. Can be used to display a "previous page" button in user interfaces, for example. */
  hasPreviousPage: Scalars['Boolean'];
  /** Points to the first item returned in the results. Used when paginating backward. */
  startCursor?: Maybe<Scalars['String']>;
};

/** The fields for modifying an HTTP Data Source's connection settings. */
export type PartialHttpConnectionSettingsInput = {
  /**
   * The HTTP Basic authentication settings for uploading new data.
   *
   * If this parameter is not provided, anyone with the URL to your tables will be able to upload data.
   * While it's OK to test without HTTP Basic authentication, we recommend enabling it.
   */
  basicAuth?: InputMaybe<HttpBasicAuthInput>;
  /** Set this to `false` to disable HTTP Basic authentication. Any previously stored HTTP Basic authentication settings will be cleared out. */
  basicAuthEnabled?: InputMaybe<Scalars['Boolean']>;
  /** The Data Source's new tables. */
  tables?: InputMaybe<Array<HttpDataSourceTableInput>>;
};

export type PartialS3ConnectionSettingsInput = {
  /** The AWS access key ID for an IAM user with sufficient access to the S3 bucket. If not provided this property will not be modified. */
  awsAccessKeyId?: InputMaybe<Scalars['String']>;
  /** The AWS secret access key for an IAM user with sufficient access to the S3 bucket. If not provided this property will not be modified. */
  awsSecretAccessKey?: InputMaybe<Scalars['String']>;
  /** The name of the S3 bucket. If not provided this property will not be modified. */
  bucket?: InputMaybe<Scalars['String']>;
  /** The Data Source's new tables. If not provided this property will not be modified. */
  tables?: InputMaybe<Array<S3DataSourceTableInput>>;
};

/** The fields for modifying a Snowflake Data Source's connection settings. */
export type PartialSnowflakeConnectionSettingsInput = {
  /** The Snowflake account. Only include the part before the "snowflakecomputing.com" part of your Snowflake URL (make sure you are in classic console, not Snowsight). For AWS-based accounts, this looks like "znXXXXX.us-east-2.aws". For Google Cloud-based accounts, this looks like "ffXXXXX.us-central1.gcp". If not provided this property will not be modified. */
  account?: InputMaybe<Scalars['String']>;
  /** The Snowflake database name. If not provided this property will not be modified. */
  database?: InputMaybe<Scalars['String']>;
  /** The Snowflake password. If not provided this property will not be modified. */
  password?: InputMaybe<Scalars['String']>;
  /** The Snowflake role. It should be "PROPELLER" if you used the default name in the setup script. If not provided this property will not be modified. */
  role?: InputMaybe<Scalars['String']>;
  /** The Snowflake schema. If not provided this property will not be modified. */
  schema?: InputMaybe<Scalars['String']>;
  /** The Snowflake username. It should be "PROPEL" if you used the default name in the setup script. If not provided this property will not be modified. */
  username?: InputMaybe<Scalars['String']>;
  /** The Snowflake warehouse name. It should be "PROPELLING" if you used the default name in the setup script. If not provided this property will not be modified. */
  warehouse?: InputMaybe<Scalars['String']>;
};

/** The Policy type. It governs an Application's access to a Metric's data. */
export type Policy = Node & {
  __typename?: 'Policy';
  /** The Policy's Account. */
  account: Account;
  /** The Application that is granted access. */
  application: Application;
  /** The Policy's creation date and time in UTC. */
  createdAt: Scalars['DateTime'];
  /** The Policy's creator. It can be either a User ID, an Application ID, or "system" if it was created by Propel. */
  createdBy: Scalars['String'];
  /** The Policy's Environment. */
  environment: Environment;
  /** The Policy's unique identifier. */
  id: Scalars['ID'];
  /** The Metric that the Application is granted access to. */
  metric: Metric;
  /** The Policy's last modification date and time in UTC. */
  modifiedAt: Scalars['DateTime'];
  /** The Policy's last modifier. It can be either a User ID, an Application ID, or "system" if it was modified by Propel. */
  modifiedBy: Scalars['String'];
  /** The type of Policy. */
  type: PolicyType;
};

/**
 * The Policy connection object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type PolicyConnection = {
  __typename?: 'PolicyConnection';
  /** The connection's edges. */
  edges?: Maybe<Array<PolicyEdge>>;
  /** The connection's nodes. */
  nodes?: Maybe<Array<Policy>>;
  /** The connection's page info. */
  pageInfo: PageInfo;
};

/**
 * The Policy edge object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type PolicyEdge = {
  __typename?: 'PolicyEdge';
  /** The edge's cursor. */
  cursor: Scalars['String'];
  /** The edge's node. */
  node: Policy;
};

/** The result of a mutation which creates or modifies a Policy. */
export type PolicyResponse = {
  __typename?: 'PolicyResponse';
  /**  The Policy which was created or modified.  */
  policy?: Maybe<Policy>;
};

/** The types of Policies that can be applied to a Metric. */
export enum PolicyType {
  /** Grants access to all Metric data. */
  AllAccess = 'ALL_ACCESS',
  /** Grants access to a specified tenant's Metric data. */
  TenantAccess = 'TENANT_ACCESS'
}

/**
 * A Propeller defines the compute power assigned to a Propel Application. The larger its compute power, the faster
 * the queries. With Propellers, you can assign different compute powers (and cost profiles) to different use cases or workloads (with the same data).
 *
 * Propellers have the following properties:
 *
 * Max RPS: The maximum number of records per second (RPS) that can be processed by the Propeller on a single query.
 */
export enum Propeller {
  /** Max records per second: 250,000,000 records per second */
  P1Large = 'P1_LARGE',
  /** Max records per second: 100,000,000 records per second */
  P1Medium = 'P1_MEDIUM',
  /** Max records per second: 25,000,000 records per second */
  P1Small = 'P1_SMALL',
  /** Max records per second: 500,000,000 records per second */
  P1XLarge = 'P1_X_LARGE',
  /** Max records per second: 5,000,000 records per second */
  P1XSmall = 'P1_X_SMALL'
}

export type Query = {
  __typename?: 'Query';
  /**
   * This query returns the Application specified by the given ID.
   *
   * An Application is an OAuth 2.0 client that gives you scoped access to the Propel APIs.
   */
  application?: Maybe<Application>;
  /**
   * This query returns the Application with the given unique name.
   *
   * An Application is an OAuth 2.0 client that gives you scoped access to the Propel APIs.
   */
  applicationByName?: Maybe<Application>;
  /**
   * This query returns the Applications within the Environment.
   *
   * Applications are OAuth 2.0 clients that give you scoped access to the Propel APIs. Environments are independent and isolated Propel workspaces for development, staging (testing), and production workloads.
   *
   * The `applications` query uses [cursor-based pagination](/docs/api/pagination) typical of GraphQL APIs. You can use the pairs of parameters `first` and `after` or `last` and `before` to page forward or backward through the results, respectively.
   *
   * For forward pagination, the `first` parameter defines the number of results to return, and the `after` parameter defines the cursor to continue from. You should pass the cursor for the _last_ result of the current page to `after`.
   *
   * For backward pagination, the `last` parameter defines the number of results to return, and the `before` parameter defines the cursor to continue from. You should pass the cursor for the _first_ result of the current page to `before`.
   */
  applications?: Maybe<ApplicationConnection>;
  /**
   * This query returns the Booster specified by the given ID.
   *
   * A Booster significantly improves the query performance for a Metric.
   */
  booster?: Maybe<Booster>;
  /**
   * This query returns the Data Pool specified by the given ID.
   *
   * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
   */
  dataPool?: Maybe<DataPool>;
  /**
   * This query returns the Data Pool specified by the given unique name.
   *
   * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries.
   */
  dataPoolByName?: Maybe<DataPool>;
  /**
   * This query returns the Data Pools within the Environment.
   *
   * A Data Pool is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries. Environments are independent and isolated Propel workspaces for development, staging (testing), and production workloads.
   *
   * The `dataPools` query uses [cursor-based pagination](/docs/api/pagination) typical of GraphQL APIs. You can use the pairs of parameters `first` and `after` or `last` and `before` to page forward or backward through the results, respectively.
   *
   * For forward pagination, the `first` parameter defines the number of results to return, and the `after` parameter defines the cursor to continue from. You should pass the cursor for the _last_ result of the current page to `after`.
   *
   * For backward pagination, the `last` parameter defines the number of results to return, and the `before` parameter defines the cursor to continue from. You should pass the cursor for the _first_ result of the current page to `before`.
   */
  dataPools?: Maybe<DataPoolConnection>;
  /**
   * This query returns the Data Source specified by the given ID.
   *
   * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
   */
  dataSource?: Maybe<DataSource>;
  /**
   * This query returns the Data Source specified by the given unique name.
   *
   * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source.
   */
  dataSourceByName?: Maybe<DataSource>;
  /**
   * This query returns the Data Sources within the Environment.
   *
   * A Data Source is a connection to your data warehouse. It has the necessary connection details for Propel to access Snowflake or any other supported Data Source. Environments are independent and isolated Propel workspaces for development, staging (testing), and production workloads.
   *
   * The `dataSources` query uses [cursor-based pagination](/docs/api/pagination) typical of GraphQL APIs. You can use the pairs of parameters `first` and `after` or `last` and `before` to page forward or backward through the results, respectively.
   *
   * For forward pagination, the `first` parameter defines the number of results to return, and the `after` parameter defines the cursor to continue from. You should pass the cursor for the _last_ result of the current page to `after`.
   *
   * For backward pagination, the `last` parameter defines the number of results to return, and the `before` parameter defines the cursor to continue from. You should pass the cursor for the _first_ result of the current page to `before`.
   */
  dataSources?: Maybe<DataSourceConnection>;
  /**
   * This query returns the Metric specified by the given ID.
   *
   * A Metric is a business indicator measured over time.
   */
  metric?: Maybe<Metric>;
  /**
   * This query returns the Metric specified by the given unique name.
   *
   * A Metric is a business indicator measured over time.
   */
  metricByName?: Maybe<Metric>;
  /**
   * This query returns the Metrics within the Environment.
   *
   * A Metric is a business indicator measured over time. Each Metric is associated with one Data Pool, which is a cached table hydrated from your data warehouse optimized for high-concurrency and low-latency queries. Environments are independent and isolated Propel workspaces for development, staging (testing), and production workloads.
   *
   * The `metrics` query uses [cursor-based pagination](/docs/api/pagination) typical of GraphQL APIs. You can use the pairs of parameters `first` and `after` or `last` and `before` to page forward or backward through the results, respectively.
   *
   * For forward pagination, the `first` parameter defines the number of results to return, and the `after` parameter defines the cursor to continue from. You should pass the cursor for the _last_ result of the current page to `after`.
   *
   * For backward pagination, the `last` parameter defines the number of results to return, and the `before` parameter defines the cursor to continue from. You should pass the cursor for the _first_ result of the current page to `before`.
   */
  metrics?: Maybe<MetricConnection>;
  /** Returns a Policy by ID. */
  policy?: Maybe<Policy>;
  /** Returns a Sync by ID. */
  sync?: Maybe<Sync>;
  /** Returns a table by ID. */
  table?: Maybe<Table>;
};


export type QueryApplicationArgs = {
  id: Scalars['ID'];
};


export type QueryApplicationByNameArgs = {
  uniqueName: Scalars['String'];
};


export type QueryApplicationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryBoosterArgs = {
  id: Scalars['ID'];
};


export type QueryDataPoolArgs = {
  id: Scalars['ID'];
};


export type QueryDataPoolByNameArgs = {
  uniqueName: Scalars['String'];
};


export type QueryDataPoolsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryDataSourceArgs = {
  id: Scalars['ID'];
};


export type QueryDataSourceByNameArgs = {
  uniqueName: Scalars['String'];
};


export type QueryDataSourcesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryMetricArgs = {
  id: Scalars['ID'];
};


export type QueryMetricByNameArgs = {
  uniqueName: Scalars['String'];
};


export type QueryMetricsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPolicyArgs = {
  id: Scalars['ID'];
};


export type QuerySyncArgs = {
  id: Scalars['ID'];
};


export type QueryTableArgs = {
  id: Scalars['ID'];
};

/** The Query Info object. It contains metadata and statistics about a Query performed. */
export type QueryInfo = {
  __typename?: 'QueryInfo';
  /** If the Query was boosted, the Booster that was used. */
  booster?: Maybe<Booster>;
  /** The bytes processed by the Query. */
  bytesProcessed: Scalars['String'];
  /** The date and time in UTC when the Query was created. */
  createdAt: Scalars['DateTime'];
  /** The unique identifier of the actor that performed the Query. */
  createdBy: Scalars['String'];
  /** The duration of the Query in milliseconds. */
  durationInMilliseconds: Scalars['Int'];
  /** The Query's unique identifier. */
  id: Scalars['ID'];
  /** The date and time in UTC when the Query was last modified. */
  modifiedAt: Scalars['DateTime'];
  /** The unique identifier of the actor that modified the Query. */
  modifiedBy: Scalars['String'];
  /** The Propeller used for this query. */
  propeller?: Maybe<Propeller>;
  /** The number of records processed by the Query. */
  recordsProcessed: Scalars['String'];
  /** The bytes returned by the Query. */
  resultingBytes: Scalars['Int'];
  /** The number of records returned by the Query. */
  resultingRecords: Scalars['Int'];
  /** The Query status. */
  status: QueryStatus;
  /** The Query subtype. */
  subtype?: Maybe<QuerySubtype>;
  /** The Query type. */
  type: QueryType;
};

/** The Query status. */
export enum QueryStatus {
  /** The Query was completed succesfully. */
  Completed = 'COMPLETED',
  /** The Query experienced an error. */
  Error = 'ERROR',
  /** The Query timed out. */
  TimedOut = 'TIMED_OUT'
}

/** The Query subtype. */
export enum QuerySubtype {
  /** Indicates a Metric counter Query. */
  Counter = 'COUNTER',
  /** Indicates a Metric leaderboard Query. */
  Leaderboard = 'LEADERBOARD',
  /** Indicates a Metric time series Query. */
  TimeSeries = 'TIME_SERIES'
}

/** The Query type. */
export enum QueryType {
  /** Indicates a Metric Query. */
  Metric = 'METRIC',
  /** Indicates a Dimension Stats Query. */
  Stats = 'STATS'
}

/**
 * The Relative time ranges are based on the current date and time.
 *
 * `THIS` - The current unit of time. For example, if today is June 8, 2022, and
 * `THIS_MONTH` is selected, then data for June 2022 would be returned.
 *
 * `PREVIOUS` - The previous unit of time. For example, if today is June 8, 2022, and
 * `PREVIOUS_MONTH` is selected, then data for May 2022 would be returned. It excludes
 * the current unit of time.
 *
 * `NEXT` - The next unit of time. For example, if today is June 8, 2022, and
 * `NEXT_MONTH` is selected, then data for July 2022 would be returned. It excludes
 * the current unit of time.
 *
 * `LAST_N` - The last `n` units of time, including the current one. For example, if today
 * is June 8, 2022 and `LAST_N_YEARS` with `n` = 3 is selected, then data for 2020, 2021, and
 * 2022 will be returned. It will include the current time period.
 */
export enum RelativeTimeRange {
  /** @deprecated Use `LAST_N_YEARS` instead. */
  Last_2Years = 'LAST_2_YEARS',
  /** @deprecated Use `LAST_N_MONTHS` instead. */
  Last_3Months = 'LAST_3_MONTHS',
  /** @deprecated Use `LAST_N_HOURS` instead. */
  Last_4Hours = 'LAST_4_HOURS',
  /** @deprecated Use `LAST_N_YEARS` instead. */
  Last_5Years = 'LAST_5_YEARS',
  /** @deprecated Use `LAST_N_MONTHS` instead. */
  Last_6Months = 'LAST_6_MONTHS',
  /** @deprecated Use `LAST_N_DAYS` instead. */
  Last_7Days = 'LAST_7_DAYS',
  /** @deprecated Use `LAST_N_HOURS` instead. */
  Last_12Hours = 'LAST_12_HOURS',
  /** @deprecated Use `LAST_N_MINUTES` instead. */
  Last_15Minutes = 'LAST_15_MINUTES',
  /** @deprecated Use `LAST_N_HOURS` instead. */
  Last_24Hours = 'LAST_24_HOURS',
  /** @deprecated Use `LAST_N_DAYS` instead. */
  Last_30Days = 'LAST_30_DAYS',
  /** @deprecated Use `LAST_N_MINUTES` instead. */
  Last_30Minutes = 'LAST_30_MINUTES',
  /** @deprecated Use `LAST_N_DAYS` instead. */
  Last_90Days = 'LAST_90_DAYS',
  /** @deprecated Use `LAST_N_HOURS` instead. */
  LastHour = 'LAST_HOUR',
  /** Starts at 12:00:00 AM, `n` - 1 day(s) before the current day, and continues through the current day. It includes today. */
  LastNDays = 'LAST_N_DAYS',
  /** Starts at the zeroth minute of the `n` - 1 hour(s) before the current hour, and continues through the current hour. It includes this hour. */
  LastNHours = 'LAST_N_HOURS',
  /** Starts at the zeroth second `n` - 1 minute(s) before the current minute and continues through the current minute. It includes this minute. */
  LastNMinutes = 'LAST_N_MINUTES',
  /** Starts at 12:00:00 AM on the first day of the month, `n` - 1 month(s) before the current month, and continues through the current month. It includes this month. */
  LastNMonths = 'LAST_N_MONTHS',
  /** Starts at 12:00:00 AM on the first day of the calendar quarter `n` - 1 quarter(s) before the current quarter and continues through the current quarter. It includes this quarter. */
  LastNQuarters = 'LAST_N_QUARTERS',
  /** Starts on Monday, 12:00:00 AM, `n` - 1 week(s) before the current week, and continues through the current week. It includes this week. */
  LastNWeeks = 'LAST_N_WEEKS',
  /** Starts on January 1st, 12:00:00 AM of the year `n` - 1 year(s) before the current year and continues through the current year. It includes this year. */
  LastNYears = 'LAST_N_YEARS',
  /** @deprecated Use `LAST_N_YEARS` instead. */
  LastYear = 'LAST_YEAR',
  /**  Starts at the zeroth minute of the next hour and continues for 60 minutes. */
  NextHour = 'NEXT_HOUR',
  /** Starts at 12:00:00 AM on the first day of the next month and continues for the duration of the month. */
  NextMonth = 'NEXT_MONTH',
  /** Starts at 12:00:00 AM on the first day of the next calendar quarter and continues for the duration of the quarter. */
  NextQuarter = 'NEXT_QUARTER',
  /** Starts on Monday, 12:00:00 AM, the week after the current week, and continues for the duration of the week. */
  NextWeek = 'NEXT_WEEK',
  /** Starts on January 1st, 12:00:00 AM of the next year and continues for the duration of the year. */
  NextYear = 'NEXT_YEAR',
  /** Starts at the zeroth minute of the previous hour and continues for 60 minutes. */
  PreviousHour = 'PREVIOUS_HOUR',
  /** Starts at 12:00:00 AM on the first day of the month before the current month and continues for the duration of the month. */
  PreviousMonth = 'PREVIOUS_MONTH',
  /** Starts at 12:00:00 AM on the first day of the calendar quarter before the current quarter and continues for the duration of the quarter. */
  PreviousQuarter = 'PREVIOUS_QUARTER',
  /** Starts on Monday, 12:00:00 AM, a week before the current week, and continues for seven days. */
  PreviousWeek = 'PREVIOUS_WEEK',
  /** Starts on January 1st, 12:00:00 AM, the year before the current year, and continues for the duration of the year. */
  PreviousYear = 'PREVIOUS_YEAR',
  /** Starts at the zeroth minute of the current hour and continues for 60 minutes. */
  ThisHour = 'THIS_HOUR',
  /** Starts at 12:00:00 AM on the first day of the current month and continues for the duration of the month. */
  ThisMonth = 'THIS_MONTH',
  /** Starts at 12:00:00 AM on the first day of the current calendar quarter and continues for the duration of the quarter. */
  ThisQuarter = 'THIS_QUARTER',
  /** Starts on Monday, 12:00:00 AM of the current week and continues for seven days. */
  ThisWeek = 'THIS_WEEK',
  /** Starts on January 1st, 12:00:00 AM of the current year and continues for the duration of the year. */
  ThisYear = 'THIS_YEAR',
  /** Starts at 12:00:00 AM of the current day and continues for 24 hours. */
  Today = 'TODAY',
  /** " Starts at 12:00:00 AM, the day after the current day, and continues for 24 hours. */
  Tomorrow = 'TOMORROW',
  /** Starts at 12:00:00 AM on the day before the today and continues for 24 hours. */
  Yesterday = 'YESTERDAY'
}

/**
 * The connection settings for an S3 Data Source. These include the S3 bucket name, the AWS access key ID, and the tables
 * (along with their paths). We do not allow fetching the AWS secret access key ID after it has been set.
 */
export type S3ConnectionSettings = {
  __typename?: 'S3ConnectionSettings';
  /** The AWS access key ID for an IAM user with sufficient access to the S3 bucket. */
  awsAccessKeyId: Scalars['String'];
  /** The name of the S3 bucket. */
  bucket: Scalars['String'];
  /** The Data Source's tables. */
  tables?: Maybe<Array<S3DataSourceTable>>;
};

/**
 * The connection settings for an S3 Data Source. These include the S3 bucket name, the AWS access key ID, the AWS secret
 * access key, and the tables (along with their paths).
 */
export type S3ConnectionSettingsInput = {
  /** The AWS access key ID for an IAM user with sufficient access to the S3 bucket. */
  awsAccessKeyId: Scalars['String'];
  /** The AWS secret access key for an IAM user with sufficient access to the S3 bucket. */
  awsSecretAccessKey: Scalars['String'];
  /** The name of the S3 bucket. */
  bucket: Scalars['String'];
  /** The S3 Data Source's tables. */
  tables: Array<S3DataSourceTableInput>;
};

export type S3DataSourceColumn = {
  __typename?: 'S3DataSourceColumn';
  /** The column name. */
  name: Scalars['String'];
  /** Whether the column's type is nullable or not. */
  nullable: Scalars['Boolean'];
  /** The column type. */
  type: ColumnType;
};

export type S3DataSourceColumnInput = {
  /** The column name. It has to be unique within a Table. */
  name: Scalars['String'];
  /** Whether the column's type is nullable or not. */
  nullable: Scalars['Boolean'];
  /** The column type. */
  type: ColumnType;
};

export type S3DataSourceTable = {
  __typename?: 'S3DataSourceTable';
  /** All the columns that will be present in the table */
  columns: Array<S3DataSourceColumn>;
  /** The name of the table */
  name: Scalars['String'];
  /** The path to the table's files in S3. */
  path?: Maybe<Scalars['String']>;
};

export type S3DataSourceTableInput = {
  /** All the columns that will be present in the table */
  columns: Array<S3DataSourceColumnInput>;
  /** The name of the table */
  name: Scalars['String'];
  /** The path to the table's files in S3. */
  path?: InputMaybe<Scalars['String']>;
};

/** The Snowflake Data Source connection settings. */
export type SnowflakeConnectionSettings = {
  __typename?: 'SnowflakeConnectionSettings';
  /** The Snowflake account. This is the part before the "snowflakecomputing.com" part of your Snowflake URL. */
  account: Scalars['String'];
  /** The Snowflake database name. */
  database: Scalars['String'];
  /** The Snowflake role. It should be "PROPELLER" if you used the default name in the setup script. */
  role: Scalars['String'];
  /** The Snowflake schema. */
  schema: Scalars['String'];
  /** The Snowflake username. It should be "PROPEL" if you used the default name in the setup script. */
  username: Scalars['String'];
  /** The Snowflake warehouse name. It should be "PROPELLING" if you used the default name in the setup script. */
  warehouse: Scalars['String'];
};

/** The fields for creating a Snowflake Data Source's connection settings. */
export type SnowflakeConnectionSettingsInput = {
  /** The Snowflake account. Only include the part before the "snowflakecomputing.com" part of your Snowflake URL (make sure you are in classic console, not Snowsight). For AWS-based accounts, this looks like "znXXXXX.us-east-2.aws". For Google Cloud-based accounts, this looks like "ffXXXXX.us-central1.gcp". */
  account: Scalars['String'];
  /** The Snowflake database name. */
  database: Scalars['String'];
  /** The Snowflake password. */
  password: Scalars['String'];
  /** The Snowflake role. It should be "PROPELLER" if you used the default name in the setup script. */
  role: Scalars['String'];
  /** The Snowflake schema. */
  schema: Scalars['String'];
  /** The Snowflake username. It should be "PROPEL" if you used the default name in the setup script. */
  username: Scalars['String'];
  /** The Snowflake warehouse name. It should be "PROPELLING" if you used the default name in the setup script. */
  warehouse: Scalars['String'];
};

/** The sort order options for Metric Queries. */
export enum Sort {
  /** Sort in ascending order. */
  Asc = 'ASC',
  /** Sort in descending order. */
  Desc = 'DESC'
}

/** Settings for Sum Metrics. */
export type SumMetricSettings = {
  __typename?: 'SumMetricSettings';
  /** Metric Filters allow defining a Metric with a subset of records from the given Data Pool. If no Metric Filters are present, all records will be included. To filter at query time, add Dimensions and use the `filters` property on the `timeSeriesInput`, `counterInput`, or `leaderboardInput` objects. There is no need to add `filters` to be able to filter at query time. */
  filters?: Maybe<Array<Filter>>;
  /** The Dimension to be summed. */
  measure: Dimension;
};

/**
 * The Sync object.
 *
 * This represents the process of syncing data from your Data Source (for example, a Snowflake data warehouse) to your Data Pool.
 */
export type Sync = Node & {
  __typename?: 'Sync';
  /** The Sync's Account. */
  account?: Maybe<Account>;
  /** The Sync's creation date and time in UTC. */
  createdAt: Scalars['DateTime'];
  /** The Sync's creator. It can be either a User ID, an Application ID, or "system" if it was created by Propel. */
  createdBy: Scalars['String'];
  /** The Sync's Data Pool. */
  dataPool?: Maybe<DataPool>;
  /** The Sync's Data Pool's Data Source. */
  dataSource?: Maybe<DataSource>;
  /**  The number of deleted records contained within the Sync, if known. This excludes filtered records.  */
  deletedRecords?: Maybe<Scalars['String']>;
  /** The Sync's Environment. */
  environment?: Maybe<Environment>;
  /**  If the Sync failed, this represents the reason the Sync failed.  */
  error?: Maybe<Error>;
  /**  The time at which the Sync failed.  */
  failedAt?: Maybe<Scalars['DateTime']>;
  /** The Sync's unique identifier. */
  id: Scalars['ID'];
  /**  The number of filtered records contained within the Sync, due to issues such as a missing timestamp Dimension, if any are known to be invalid.  */
  invalidRecords?: Maybe<Scalars['String']>;
  /** The Sync's last modification date and time in UTC. */
  modifiedAt: Scalars['DateTime'];
  /** The Sync's last modifier. It can be either a User ID, an Application ID, or "system" if it was modified by Propel. */
  modifiedBy: Scalars['String'];
  /**  The number of new records contained within the Sync, if known. This excludes filtered records.  */
  newRecords?: Maybe<Scalars['String']>;
  /**  The (compressed) size of the Sync, in bytes, if known.  */
  size?: Maybe<Scalars['String']>;
  /**  The time at which the Sync started.  */
  startedAt?: Maybe<Scalars['DateTime']>;
  /**  The status of the Sync (all Syncs begin as SYNCING before transitioning to SUCCEEDED or FAILED).  */
  status: SyncStatus;
  /**  The time at which the Sync succeeded.  */
  succeededAt?: Maybe<Scalars['DateTime']>;
  /**  The number of updated records contained within the Sync, if known. This excludes filtered records.  */
  updatedRecords?: Maybe<Scalars['String']>;
};

/**
 * The Sync connection object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type SyncConnection = {
  __typename?: 'SyncConnection';
  /** The connection's edges. */
  edges?: Maybe<Array<SyncEdge>>;
  /** The connection's nodes. */
  nodes?: Maybe<Array<Sync>>;
  /** The connection's page info. */
  pageInfo: PageInfo;
};

/**
 * The Sync edge object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type SyncEdge = {
  __typename?: 'SyncEdge';
  /** The edge's cursor. */
  cursor: Scalars['String'];
  /** The edge's node. */
  node: Sync;
};

/** The status of a Sync. */
export enum SyncStatus {
  /**  Propel is deleting the Sync.  */
  Deleting = 'DELETING',
  /**  The Sync failed. Propel failed to sync some or all records contained within the Sync.  */
  Failed = 'FAILED',
  /**  The Sync succeeded. Propel successfully synced all records contained within the Sync.  */
  Succeeded = 'SUCCEEDED',
  /**  Propel is actively syncing records contained within the Sync.  */
  Syncing = 'SYNCING'
}

/**
 * The table object.
 *
 * Once a table introspection succeeds, it creates a new table object for every table it introspected.
 */
export type Table = {
  __typename?: 'Table';
  /** The table's columns which can be used as a measure for a Metric. */
  availableMeasures?: Maybe<ColumnConnection>;
  /** The table's columns which can be used as a timestamp for a Data Pool. */
  availableTimestamps?: Maybe<ColumnConnection>;
  /** The time at which the table was cached (i.e., the time at which it was introspected). */
  cachedAt: Scalars['DateTime'];
  /**
   * Information about the table obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  clusterBy?: Maybe<Scalars['String']>;
  /** The table's columns. */
  columns?: Maybe<ColumnConnection>;
  /**
   * Information about the table obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  comment: Scalars['String'];
  /** The time at which the table was created. This is the same as its `cachedAt` time. */
  createdAt: Scalars['DateTime'];
  /** The table's creator. This corresponds to the initiator of the table Introspection. It can be either a User ID, an Application ID, or "system" if it was created by Propel. */
  createdBy: Scalars['String'];
  /** The Data Source to which the table belongs. */
  dataSource?: Maybe<DataSource>;
  /** The table's ID. */
  id: Scalars['ID'];
  /**
   * Information about the table obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  isAutomaticClusteringEnabled?: Maybe<Scalars['Boolean']>;
  /**
   * Information about the table obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  isChangeTrackingEnabled?: Maybe<Scalars['Boolean']>;
  /**
   * Information about the table obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  isExternal: Scalars['Boolean'];
  /**
   * Information about the table obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  isSearchOptimizationEnabled?: Maybe<Scalars['Boolean']>;
  /**
   * Information about the table obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  kind: Scalars['String'];
  /** The table's name. */
  name: Scalars['String'];
  /**
   * Information about the table obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  owner: Scalars['String'];
  /** The number of rows contained within the table at the time of introspection. Check the table's `cachedAt` time, since this info can become out of date. */
  rows?: Maybe<Scalars['Int']>;
  /** The size of the table (in bytes) at the time of introspection. Check the table's `cachedAt` time, since this info can become out of date. */
  size?: Maybe<Scalars['Int']>;
  /**
   * Information about the table obtained from Snowflake.
   * @deprecated This is Snowflake-specific, and will be removed
   */
  timeTravelRetentionInDays?: Maybe<Scalars['Int']>;
};


/**
 * The table object.
 *
 * Once a table introspection succeeds, it creates a new table object for every table it introspected.
 */
export type TableAvailableMeasuresArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/**
 * The table object.
 *
 * Once a table introspection succeeds, it creates a new table object for every table it introspected.
 */
export type TableAvailableTimestampsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/**
 * The table object.
 *
 * Once a table introspection succeeds, it creates a new table object for every table it introspected.
 */
export type TableColumnsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/**
 * The table connection object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type TableConnection = {
  __typename?: 'TableConnection';
  /** The time at which the tables were cached (i.e., the time at which they were introspected). */
  cachedAt: Scalars['DateTime'];
  /** The connection's edges. */
  edges: Array<TableEdge>;
  /** The connection's nodes. */
  nodes: Array<Table>;
  /** The connection's page info. */
  pageInfo: PageInfo;
};

/**
 * The table edge object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type TableEdge = {
  __typename?: 'TableEdge';
  /** The edge's cursor. */
  cursor: Scalars['String'];
  /** The edge's node. */
  node: Table;
};

/**
 * The table introspection object.
 *
 * When setting up a Data Source, Propel may need to introspect tables in order to determine what tables and columns are available to create Data Pools from. The table introspection represents the lifecycle of this operation (whether it's in-progress, succeeded, or failed) and the resulting tables and columns. These will be captured as table and column objects, respectively.
 */
export type TableIntrospection = {
  __typename?: 'TableIntrospection';
  /** The table introspection's creation date and time in UTC. */
  createdAt: Scalars['DateTime'];
  /** The table introspection's creator. It can be either a User ID, an Application ID, or "system" if it was created by Propel. */
  createdBy: Scalars['String'];
  /** The Data Source the table introspection was performed for. */
  dataSource: DataSource;
  /** The table introspection's last modification date and time in UTC. */
  modifiedAt: Scalars['DateTime'];
  /** The table introspection's last modifier. It can be either a User ID, an Application ID, or "system" if it was modified by Propel. */
  modifiedBy: Scalars['String'];
  /** The number of tables introspected. */
  numTables?: Maybe<Scalars['Int']>;
  /** The status of the table introspection. */
  status: TableIntrospectionStatus;
  /** The tables introspected. */
  tables?: Maybe<TableConnection>;
};


/**
 * The table introspection object.
 *
 * When setting up a Data Source, Propel may need to introspect tables in order to determine what tables and columns are available to create Data Pools from. The table introspection represents the lifecycle of this operation (whether it's in-progress, succeeded, or failed) and the resulting tables and columns. These will be captured as table and column objects, respectively.
 */
export type TableIntrospectionTablesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/**
 * The table introspection connection object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type TableIntrospectionConnection = {
  __typename?: 'TableIntrospectionConnection';
  /** The connection's edges. */
  edges: Array<TableIntrospectionEdge>;
  /** The connection's nodes. */
  nodes: Array<TableIntrospection>;
  /** The connection's page info. */
  pageInfo: PageInfo;
};

/**
 * The Application edge object.
 *
 * Learn more about [pagination in GraphQL](/docs/api/pagination).
 */
export type TableIntrospectionEdge = {
  __typename?: 'TableIntrospectionEdge';
  /** The edge's cursor. */
  cursor: Scalars['String'];
  /** The edge's node. */
  node: TableIntrospection;
};

/** The status of a table introspection. */
export enum TableIntrospectionStatus {
  /** The table introspection failed. */
  Failed = 'FAILED',
  /** The table introspection has not started. */
  NotStarted = 'NOT_STARTED',
  /** The table introspection has started. */
  Started = 'STARTED',
  /** The table introspection succeeded. */
  Succeeded = 'SUCCEEDED'
}

/**
 * The Tenant ID fields.
 *
 * The Tenant ID can be used for partitioning and restricting access between customers (Tenants) within a Data Pool.
 */
export type Tenant = {
  __typename?: 'Tenant';
  /**  The name of the column that represents the Tenant ID.  */
  columnName: Scalars['String'];
  /**  The Tenant ID column's type.  */
  type: Scalars['String'];
};

/**
 * Fields for specifying a Data Pool's Tenant ID.
 *
 * The Tenant ID can be used for partitioning and restricting access between customers (Tenants) within a Data Pool.
 */
export type TenantInput = {
  /**  The name of the column that represents the Tenant ID.  */
  columnName: Scalars['String'];
};

/**
 * The fields required to specify the time range for a time series, counter, or leaderboard Metric query.
 *
 * If no relative or absolute time ranges are provided, Propel defaults to an absolute time range beginning with the earliest record in the Metric's Data Pool and ending with the latest record.
 *
 * If both relative and absolute time ranges are provided, the relative time range will take precedence.
 *
 * If a `LAST_N` relative time period is selected, an `n` ≥ 1 must be provided. If no `n` is provided or `n` < 1, a `BAD_REQUEST` error will be returned.
 */
export type TimeRangeInput = {
  /** The number of time units for the `LAST_N` relative periods. */
  n?: InputMaybe<Scalars['Int']>;
  /** The relative time period. */
  relative?: InputMaybe<RelativeTimeRange>;
  /**  The optional start timestamp (inclusive). Defaults to the timestamp of the earliest record in the Data Pool.  */
  start?: InputMaybe<Scalars['DateTime']>;
  /**  The optional end timestamp (exclusive). Defaults to the timestamp of the latest record in the Data Pool.  */
  stop?: InputMaybe<Scalars['DateTime']>;
};

/**
 * The available time series granularities. Granularities define the unit of time to aggregate the Metric data for a time series query.
 *
 * For example, if the granularity is set to `DAY`, then the the time series query will return a label and a value for each day.
 *
 * If there are no records for a given time series granularity, Propel will return the label and a value of "0" so that the time series can be properly visualized.
 */
export enum TimeSeriesGranularity {
  /** Aggregates values by daily intervals. */
  Day = 'DAY',
  /** Aggregates values by 15-minute intervals. */
  FifteenMinutes = 'FIFTEEN_MINUTES',
  /** Aggregates values by 5-minute intervals. */
  FiveMinutes = 'FIVE_MINUTES',
  /** Aggregates values by hourly intervals. */
  Hour = 'HOUR',
  /** Aggregates values by minute intervals. */
  Minute = 'MINUTE',
  /** Aggregates values by monthly intervals. */
  Month = 'MONTH',
  /** Aggregates values by 10-minute intervals. */
  TenMinutes = 'TEN_MINUTES',
  /** Aggregates values by weekly intervals. */
  Week = 'WEEK',
  /** Aggregates values by yearly intervals. */
  Year = 'YEAR'
}

/**
 * The fields for querying a Metric in time series format.
 *
 * A Metric's time series query returns the values over a given time range aggregated by a given time granularity; day, month, or year, for example.
 */
export type TimeSeriesInput = {
  /**  The Query Filters to apply before retrieving the time series data. If no Query Filters are provided, all data is included.  */
  filters?: InputMaybe<Array<FilterInput>>;
  /**  The time granularity (hour, day, month, etc.) to aggregate the Metric values by.  */
  granularity: TimeSeriesGranularity;
  /** Optionally specifies the Propeller to use. This can be set by Users when querying from the Metric Playground or GraphQL Explorer. Applications may not set this value. Instead, Application Queries always use the Propeller configured on the Application.  */
  propeller?: InputMaybe<Propeller>;
  /**  The time range for calculating the time series. */
  timeRange: TimeRangeInput;
};

/** The time series response object. It contains an array of time series labels and an array of Metric values for the given time range and Query Filters. */
export type TimeSeriesResponse = {
  __typename?: 'TimeSeriesResponse';
  /** The time series labels. */
  labels: Array<Scalars['String']>;
  /** The Query statistics and metadata. */
  query: QueryInfo;
  /** The time series values. */
  values: Array<Scalars['String']>;
};

/** The fields for creating an Application. */
export type CreateApplicationInput = {
  /** The Application's description. */
  description?: InputMaybe<Scalars['String']>;
  /** The Application's Propeller. If no Propeller is provided, Propel will set the Propeller to `P1_X_SMALL`. */
  propeller?: InputMaybe<Propeller>;
  /** The Application's API authorization scopes. If specified, at least one scope must be provided; otherwise, all scopes will be granted to the Application by default. */
  scopes?: InputMaybe<Array<ApplicationScope>>;
  /** The Application's unique name. If not specified, Propel will set the ID as unique name. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** Fields for creating a Data Pool. */
export type CreateDataPoolInput = {
  /** The Data Pool's data retention in days. If not specified, records will be kept undefinitely. */
  dataRetentionInDays?: InputMaybe<Scalars['Int']>;
  /** The Data Source that will be used to create the Data Pool.  */
  dataSource: IdOrUniqueName;
  /** The Data Pool's description. */
  description?: InputMaybe<Scalars['String']>;
  /**
   * The list of columns to exclude from the Data Pool. The specified columns from the underlying table will not be synced to the Data Pool.
   *
   * You may not exclude the timestamp column. Additionally, if you specify a `tenant`, that column may not be excluded.
   */
  excludedColumns?: InputMaybe<Array<Scalars['String']>>;
  /**  The table that the Data Pool will sync from.  */
  table: Scalars['String'];
  /** An optional Data Pool Tenant ID. When specified, the Metrics powered by the Data Pool will be able to use `TENANT_ACCESS` Policies designed for multi-tenant use cases. */
  tenant?: InputMaybe<TenantInput>;
  /**  The table's primary timestamp column.  */
  timestamp: DimensionInput;
  /** The Data Pool's unique name. If not specified, Propel will set the ID as the unique name. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for creating a Snowflake Data Source. */
export type CreateSnowflakeDataSourceInput = {
  /** The Data Source's connection settings. */
  connectionSettings: SnowflakeConnectionSettingsInput;
  /** The Data Source's description. */
  description?: InputMaybe<Scalars['String']>;
  /** The Data Source's unique name. If not specified, Propel will set the ID as unique name. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/**
 * The ID or unique name input.
 *
 * If both ID and unique name are provided, the ID will take precedence.
 */
export type IdOrUniqueName = {
  /** The unique identifier of the object. */
  id?: InputMaybe<Scalars['String']>;
  /** The unique name of the object. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for modifying an Application. */
export type ModifyApplicationInput = {
  /** The Application's new description.  */
  description?: InputMaybe<Scalars['String']>;
  /** The ID or unique name of the Application to modify. */
  idOrUniqueName: IdOrUniqueName;
  /** The Application's new Propeller.  */
  propeller?: InputMaybe<Propeller>;
  /** The Application's new API authorization scopes.  */
  scopes?: InputMaybe<Array<ApplicationScope>>;
  /** The Application's new unique name. */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for modifying a Data Pool. */
export type ModifyDataPoolInput = {
  /** The Data Pool's new data retention in days.  */
  dataRetentionInDays?: InputMaybe<Scalars['Int']>;
  /** The Data Pool's new description.  */
  description?: InputMaybe<Scalars['String']>;
  /** The ID or unique name of the Data Pool to modify. */
  idOrUniqueName: IdOrUniqueName;
  /** The Data Pool's new unique name.  */
  uniqueName?: InputMaybe<Scalars['String']>;
};

/** The fields for modifying a Snowflake Data Source. */
export type ModifySnowflakeDataSourceInput = {
  /** The Data Source's new connection settings.  */
  connectionSettings?: InputMaybe<PartialSnowflakeConnectionSettingsInput>;
  /** The Data Source's new description.  */
  description?: InputMaybe<Scalars['String']>;
  /** The ID or unique name of the Data Source to modify. */
  idOrUniqueName: IdOrUniqueName;
  /** The Data Source's new unique name.  */
  uniqueName?: InputMaybe<Scalars['String']>;
};

export type DimensionFragment = { __typename?: 'Dimension', columnName: string, type: string, isNullable?: boolean | null, isUniqueKey?: boolean | null };

export type FilterFragment = { __typename?: 'Filter', column: string, operator: FilterOperator, value: string };

export type MetricInfoFragment = { __typename?: 'Metric', id: string, uniqueName: string, type: MetricType, dimensions: Array<{ __typename?: 'Dimension', columnName: string, type: string, isNullable?: boolean | null, isUniqueKey?: boolean | null }>, timestamp: { __typename?: 'Dimension', columnName: string, type: string, isNullable?: boolean | null, isUniqueKey?: boolean | null }, measure?: { __typename?: 'Dimension', columnName: string, type: string, isNullable?: boolean | null, isUniqueKey?: boolean | null } | null };

export type QueryInfoFragment = { __typename?: 'QueryInfo', id: string, bytesProcessed: string, durationInMilliseconds: number, recordsProcessed: string, resultingBytes: number, resultingRecords: number, booster?: { __typename?: 'Booster', id: string } | null };

export type MetricCounterQueryVariables = Exact<{
  id: Scalars['ID'];
  input: CounterInput;
}>;


export type MetricCounterQuery = { __typename?: 'Query', metric?: { __typename?: 'Metric', counter?: { __typename?: 'CounterResponse', value: string, query: { __typename?: 'QueryInfo', id: string, bytesProcessed: string, durationInMilliseconds: number, recordsProcessed: string, resultingBytes: number, resultingRecords: number, booster?: { __typename?: 'Booster', id: string } | null } } | null } | null };

export type MetricLeaderboardQueryVariables = Exact<{
  id: Scalars['ID'];
  input: LeaderboardInput;
}>;


export type MetricLeaderboardQuery = { __typename?: 'Query', metric?: { __typename?: 'Metric', leaderboard?: { __typename?: 'LeaderboardResponse', headers: Array<string>, rows: Array<Array<string | null>>, query: { __typename?: 'QueryInfo', id: string, bytesProcessed: string, durationInMilliseconds: number, recordsProcessed: string, resultingBytes: number, resultingRecords: number, booster?: { __typename?: 'Booster', id: string } | null } } | null } | null };

export type MetricTimeSeriesQueryVariables = Exact<{
  id: Scalars['ID'];
  input: TimeSeriesInput;
}>;


export type MetricTimeSeriesQuery = { __typename?: 'Query', metric?: { __typename?: 'Metric', timeSeries?: { __typename?: 'TimeSeriesResponse', labels: Array<string>, values: Array<string>, query: { __typename?: 'QueryInfo', id: string, bytesProcessed: string, durationInMilliseconds: number, recordsProcessed: string, resultingBytes: number, resultingRecords: number, booster?: { __typename?: 'Booster', id: string } | null } } | null } | null };

export type MetricsQueryVariables = Exact<{ [key: string]: never; }>;


export type MetricsQuery = { __typename?: 'Query', metrics?: { __typename?: 'MetricConnection', nodes?: Array<{ __typename?: 'Metric', id: string, uniqueName: string, type: MetricType, dimensions: Array<{ __typename?: 'Dimension', columnName: string, type: string, isNullable?: boolean | null, isUniqueKey?: boolean | null }>, timestamp: { __typename?: 'Dimension', columnName: string, type: string, isNullable?: boolean | null, isUniqueKey?: boolean | null }, measure?: { __typename?: 'Dimension', columnName: string, type: string, isNullable?: boolean | null, isUniqueKey?: boolean | null } | null }> | null } | null };

export const FilterFragmentDoc = gql`
    fragment FilterFragment on Filter {
  column
  operator
  value
}
    `;
export const DimensionFragmentDoc = gql`
    fragment DimensionFragment on Dimension {
  columnName
  type
  isNullable
  isUniqueKey
}
    `;
export const MetricInfoFragmentDoc = gql`
    fragment MetricInfoFragment on Metric {
  id
  uniqueName
  dimensions {
    ...DimensionFragment
  }
  timestamp {
    ...DimensionFragment
  }
  measure {
    ...DimensionFragment
  }
  type
}
    ${DimensionFragmentDoc}`;
export const QueryInfoFragmentDoc = gql`
    fragment QueryInfoFragment on QueryInfo {
  id
  bytesProcessed
  durationInMilliseconds
  recordsProcessed
  resultingBytes
  resultingRecords
  booster {
    id
  }
}
    `;
export const MetricCounterDocument = gql`
    query metricCounter($id: ID!, $input: CounterInput!) {
  metric(id: $id) {
    counter(input: $input) {
      value
      query {
        ...QueryInfoFragment
      }
    }
  }
}
    ${QueryInfoFragmentDoc}`;
export const MetricLeaderboardDocument = gql`
    query metricLeaderboard($id: ID!, $input: LeaderboardInput!) {
  metric(id: $id) {
    leaderboard(input: $input) {
      headers
      rows
      query {
        ...QueryInfoFragment
      }
    }
  }
}
    ${QueryInfoFragmentDoc}`;
export const MetricTimeSeriesDocument = gql`
    query metricTimeSeries($id: ID!, $input: TimeSeriesInput!) {
  metric(id: $id) {
    timeSeries(input: $input) {
      labels
      values
      query {
        ...QueryInfoFragment
      }
    }
  }
}
    ${QueryInfoFragmentDoc}`;
export const MetricsDocument = gql`
    query metrics {
  metrics(first: 100) {
    nodes {
      ...MetricInfoFragment
    }
  }
}
    ${MetricInfoFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    metricCounter(variables: MetricCounterQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MetricCounterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MetricCounterQuery>(MetricCounterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'metricCounter', 'query');
    },
    metricLeaderboard(variables: MetricLeaderboardQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MetricLeaderboardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MetricLeaderboardQuery>(MetricLeaderboardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'metricLeaderboard', 'query');
    },
    metricTimeSeries(variables: MetricTimeSeriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MetricTimeSeriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MetricTimeSeriesQuery>(MetricTimeSeriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'metricTimeSeries', 'query');
    },
    metrics(variables?: MetricsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MetricsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MetricsQuery>(MetricsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'metrics', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;