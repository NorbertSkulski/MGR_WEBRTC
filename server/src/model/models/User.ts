import { PrimaryKey, Model, Column, Table, AllowNull, CreatedAt, UpdatedAt, HasOne, ForeignKey, DataType, BeforeUpdate, BeforeCreate } from "sequelize-typescript";

@Table
class User extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    uuid: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    lastName: string;

    @AllowNull(false)
    @Column({ unique: true })
    login: string;

    @AllowNull(false)
    @Column({ unique: true })
    password: string;

    @Column
    age: number;

    @AllowNull(false)
    @Column({ defaultValue: false })
    isAdmin: boolean;

    @AllowNull(false)
    @Column({ defaultValue: false })
    isBanned: boolean;

    @AllowNull(false)
    @Column({ defaultValue: true })
    isUser: boolean;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID
    })
    updatedById: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID
    })
    createdById: string

    @HasOne(() => User)
    updatedBy: User;

    @HasOne(() => User)
    createdBy: User;

    @BeforeUpdate
    @BeforeCreate
    static onBeforeUpdate(instance: User) {

        console.log("Create User:", instance)

    }

}

export { User };