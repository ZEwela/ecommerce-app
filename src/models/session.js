const getSessionModel = (sequelize, { DataTypes }) => {
    const Session = sequelize.define('session', {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      expires: DataTypes.DATE,
      data: DataTypes.TEXT
    });

    return Session;
};

export default getSessionModel;