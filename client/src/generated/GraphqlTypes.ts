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

export type Auth = {
  __typename?: 'Auth';
  error?: Maybe<Error>;
  isAuth?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type Error = {
  __typename?: 'Error';
  message?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addRole?: Maybe<Role>;
  addSetting?: Maybe<Setting>;
  addUser?: Maybe<User>;
  login?: Maybe<Auth>;
  logout?: Maybe<Auth>;
  register?: Maybe<Auth>;
};


export type MutationAddRoleArgs = {
  name: Scalars['String'];
};


export type MutationAddSettingArgs = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};


export type MutationAddUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  roleId: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  auth?: Maybe<Auth>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<Role>>>;
  settings?: Maybe<Array<Maybe<Setting>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Role = {
  __typename?: 'Role';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Setting = {
  __typename?: 'Setting';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  tokenVersion?: Maybe<Scalars['Int']>;
};
