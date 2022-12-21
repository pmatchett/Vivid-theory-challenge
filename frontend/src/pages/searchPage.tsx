import Blog, { getBlogCount, getSearchResults } from "../APIQueries/blogs"
import {useState, useEffect} from "react"
import {
    Card,
    CardHeader,
    Stack,
    Pagination
} from '@mui/material'
import { Link } from "react-router-dom";
import CSS from 'csstype';

export default function SearchPage(){
    const styles: CSS.Properties = {
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingTop: "2.5%"
    }
    const [blogs, setBlogs] = useState<Array<Blog>>([]);
    const [pageNum, setPageNum] = useState<number>(0);
    const [count, setCount] = useState<number>(6)
    useEffect(() => {
        //getting the desired blogs on load and when the page changes
        getSearchResults(pageNum)
        .then((res) => {
            setBlogs(res);
        })
        .catch((err) => {
            console.log(err);
        });
        //getting the total number of blogs for pagination
        getBlogCount()
        .then((res) => {
            setCount(res)
        })
        .catch((err) => {
            console.log(err);
        });
    }, [pageNum])
    return (
        <div style={styles}>
            <Stack spacing={2}>
                {
                    blogs.map((elem: Blog) => {
                        return(
                            <Link to={`/${elem.slug}`}>
                                <Card>
                                    <CardHeader
                                        title={`${elem.title}`}
                                        subheader={`${elem.published_at.toLocaleString()}`}
                                    />
                                </Card>
                            </Link>
                        )
                    })
                }
            </Stack>
            <Pagination count = {Math.ceil(count/6)} onChange={(event, page) => {
                setPageNum(page-1);
            }}/>
        </div>
    )
}