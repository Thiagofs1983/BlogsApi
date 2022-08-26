module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
      },
    },
    {
      timestamps: false,
      tableName: 'PostCategories'
    });
  
    PostCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'Categories',
        through: PostCategory,
        foreignKey: 'id',
        otherKey: 'id'
      });
      models.Category.belongsToMany(models.BlogPost, {
        as: 'BlogPosts',
        through: PostCategory,
        foreignKey: 'id',
        otherKey: 'id'
      });
    }
  
    return PostCategory;
  }