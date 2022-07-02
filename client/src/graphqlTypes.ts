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
};

export type Query = {
  __typename?: 'Query';
  auth?: Maybe<Auth>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<Role>>>;
  settings?: Maybe<Array<Maybe<Setting>>>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};

export type Auth = {
  __typename?: 'Auth';
  isAuth?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  error?: Maybe<Error>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  tokenVersion?: Maybe<Scalars['Int']>;
  role?: Maybe<Role>;
};

export type Role = {
  __typename?: 'Role';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Error = {
  __typename?: 'Error';
  path?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Setting = {
  __typename?: 'Setting';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Auth>;
  logout?: Maybe<Auth>;
  register?: Maybe<Auth>;
  addUser?: Maybe<User>;
  addRole?: Maybe<Role>;
  addSetting?: Maybe<Setting>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationAddUserArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  roleId: Scalars['ID'];
};


export type MutationAddRoleArgs = {
  name: Scalars['String'];
};


export type MutationAddSettingArgs = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};
