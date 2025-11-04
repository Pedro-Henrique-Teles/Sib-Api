import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  Default,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'members',
  timestamps: true,
})
export class Member extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  fullName: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(255))
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  password: string;

  @AllowNull(true)
  @Column(DataType.DATEONLY)
  birthDate: Date | null;

  @AllowNull(false)
  @Default('Other')
  @Column(DataType.ENUM('M', 'F', 'Other'))
  gender: 'M' | 'F' | 'Other';

  @AllowNull(true)
  @Column(DataType.STRING(20))
  phone: string | null;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  address: string | null;

  @AllowNull(true)
  @Unique
  @Column(DataType.CHAR(11))
  cpf: string | null;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  startDate: Date;

  @AllowNull(true)
  @Column(DataType.STRING(80))
  origin: string | null;

  @AllowNull(true)
  @Column(DataType.STRING(80))
  occupation: string | null;

  @AllowNull(true)
  @Column(DataType.STRING(80))
  education: string | null;

  @AllowNull(true)
  @Column(DataType.STRING(80))
  role: string | null;
}