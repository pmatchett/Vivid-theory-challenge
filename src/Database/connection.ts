import { Sequelize, Model, DataTypes } from 'sequelize';

//Creating a singleton class to create the connection if none is present, then return it once it is created
class databaseConnection{
    static connection: Sequelize|null = null;


    static async getConnection(): Promise<Sequelize|null>{
        if (!this.connection){
            await this.initDBConnection();
            return this.connection;
        }
        else{
            return this.connection;
        }
    }

    static async initDBConnection(): Promise<void>{
        this.connection = new Sequelize(
            `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`
        );
        try{
            await this.connection.authenticate();
            console.log("Connected to remote Vivid Theory database");
            return;
        }
        catch (error){
            console.log("Failed to authenticate database connection: ", error);
            this.connection.close();
            return;
        }
    }
}

export default databaseConnection


