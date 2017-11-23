const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      avatar: {
        type: DataTypes.STRING
      },
      userType: {
        type: DataTypes.ENUM('admin', 'basic'),
        allowNull: false
      }
    },
    {
      name: {
        singular: 'user',
        plural: 'users'
      },
      tableName: 'user',
      timestamps: true,
      // createdAt: 'created_at',
      // updatedAt: 'updated_at',
      // we don't want to return the password hash by default
      defaultScope: {
        attributes: ['id', 'name', 'email', 'userType', 'avatar']
      },
      scopes: {
        safe: {
          // this should include the password hash
        }
      }
      // ,
      // instanceMethods: {
      // }
    }
  )

  return User
}

module.exports = UserModel
