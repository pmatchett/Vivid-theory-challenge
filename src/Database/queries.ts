import databaseConnection from "./connection";
import { Sequelize, Model, DataTypes, Op } from "sequelize";

class blog extends Model{}

const connection = databaseConnection.getConnection()
.then((sequelize: Sequelize|null) => {
    if(!sequelize){
        console.log("connection to DB failed, do not create model");
        return;
    }
    blog.init({
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        published_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        modelName: "blog",
        timestamps: false,
        sequelize
    }
)
});

//starts at page 0
async function getBlogPage(pageNum: number): Promise<Array<blog>>{
    const blogs = await blog.findAll({
        where:{
            published_at:{
                [Op.not]: null
            }
        },
        order: [["published_at", "DESC"]],
        limit: 6,
        offset: pageNum*6
    });
    return blogs;
}

async function getSingleBlogPage(slug:string): Promise<Array<blog>>{
    const blogs = await blog.findAll({
        where:{
            [Op.and]:{
                published_at:{
                    [Op.not]: null
                },
                slug: slug
            }
        },
        limit: 1
    });
    return blogs;
}

async function getBlogCount(): Promise<number>{
    const count = await blog.count({
        where:{
            published_at:{
                [Op.not]: null
            },
        }
    });
    return count
}

export {getBlogPage, getSingleBlogPage, getBlogCount}




