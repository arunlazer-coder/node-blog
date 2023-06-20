module.exports = (sequelize, DataTypes) => {

    const Blog = sequelize.define("blogs", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Blog
}