import dotenv from "dotenv";
dotenv.config({ path: `../.env` });
import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";
import { bcrypt } from "../utils/bcrypt.js";
 
class Users extends Model {}

Users.init(
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {},
            set(value) {
                this.setDataValue("name", value.trim());
            },
        },

        user_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: {
                args: true,
            },
            validate: {
                len: {
                    args: [3, 30],
                },
            },
            set(value) {
                this.setDataValue("user_name", value.trim().toLowerCase());
            },
        }, 
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        avatar:{type:DataTypes.STRING,allowNull:true}
    },

    {
        sequelize,
        tableName: "users",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["user_name"],
                name: "username_index",
                using: "BTREE",
            },
        ],
        //! Triggers
        hooks: {
            beforeUpdate: (user) => {
                if (user.password) {
                    user.password = bcrypt(user.password);
                }
            },
            beforeCreate: (user) => {
                user.password = bcrypt(user.password);
            },
        },
    }
);

export default Users;
