import axios from "axios"

export default class Blogs{
    id: number
    title: string
    slug: string
    content: string
    image: string
    published_at: Date

    constructor(id: number, title: string, slug: string, content: string, image: string, published_at: string){
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.image = image;
        this.published_at = new Date(published_at);
    }

}

async function getSearchResults(pageNum: number): Promise<Array<Blogs>>{
    const result = axios.get(`/blogs/${pageNum}`)
    .then((res) => {
        const allBlogs = res.data.map((elem: any) => {
            return new Blogs(elem.id, elem.title, elem.slug, elem.content, elem.image, elem.published_at)
        })
        return allBlogs;
    })
    .catch((err) => {
        console.log(err);
        throw err.detail;
    });
    return result;
}

async function getBlogData(slug: any): Promise<Blogs>{
    const result = axios.get(`/blog/${slug}`)
    .then((res) => {
        const currentBlog = new Blogs(
            res.data[0].id, 
            res.data[0].title, 
            res.data[0].slug, 
            res.data[0].content, 
            res.data[0].image, 
            res.data[0].published_at)
        return currentBlog;
    })
    .catch((err) => {
        console.log(err);
        throw err.detail;
    });
    return result;
}

async function getBlogCount(): Promise<number>{
    const result = axios.get(`/count`)
    .then((res) => {
        return res.data.count;
    })
    .catch((err) => {
        console.log(err);
        throw err.detail;
    });
    return result;
}

export {getBlogData, getSearchResults, getBlogCount}