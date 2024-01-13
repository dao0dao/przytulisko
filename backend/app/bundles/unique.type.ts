declare const __brand__type__: unique symbol;
type BrandType<BaseType, BrandName> = BaseType & {
  readonly [__brand__type__]: BrandName;
};
type SQL_BOOLEAN = 0 | 1;
export type Uuid4 = BrandType<string, "uuid4">;
export type TimeStamp = BrandType<string, "YYYY-MM-DD HH:MI:SS">;
export type Bcrypt = BrandType<string, "Bcrypt">;
export type BOOLEAN = BrandType<SQL_BOOLEAN, "sql_boolean">;
