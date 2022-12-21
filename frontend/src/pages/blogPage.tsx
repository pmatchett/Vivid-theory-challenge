import { useLoaderData } from "react-router-dom";
import Blog, { getBlogData } from "../APIQueries/blogs"
import {
    Card,
    CardHeader,
    CardContent,
    Button
} from '@mui/material';
import CSS from 'csstype';
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import parse from 'html-react-parser';


export async function loader({ params }:any) {
    return params.slug;
  }

export function BlogPage(){
    const styles: CSS.Properties = {
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingTop: "2.5%"
    }
    const slug = useLoaderData();
    const [blog, setBlog] = useState<Blog>();
    //fetching the blog data on slug change
    useEffect(()=>{
        getBlogData(slug)
        .then((res) => {
            setBlog(res);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [slug])
    return blog ? (
        <div style={styles}>
            <Link to="/"><Button variant="outlined">Back</Button></Link>
            <Card>
                <CardHeader
                    title={`${blog.title}`}
                    subheader={`${blog.published_at.toLocaleString()}`}
                />
                <CardContent>
                    <img src={`${blog.image}`}/>
                    <div>
                        {parse(blog.content)}
                    </div>
                </CardContent>
            </Card>

        </div>
    )
    :
    (
        <div style={styles}>
            <Link to="/"><Button variant="outlined">Back</Button></Link>
            <h1>Page is loading</h1>
        </div>
    )
}