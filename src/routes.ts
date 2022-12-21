import express, { Express, Request, Response } from "express";
const router = express.Router();
import { getBlogCount, getBlogPage, getSingleBlogPage } from "./Database/queries";


router.get("/blogs/:pageNum", async (req: Request, res: Response) => {
    const pageNum = req.params.pageNum;
    const page = parseInt(pageNum);
    if(isNaN(page) || page < 0){
      res.status(400).send(JSON.stringify({detail: "Page number must be a positive integer"}));
      return;
    }
    const blogs = await getBlogPage(page);
    if (blogs.length <= 0){
      res.status(404).send(JSON.stringify({detail: "No blogs found"}));
      return;
    }
    res.status(200).send(JSON.stringify(blogs, null, 2));
  })
  
router.get("/blog/:slug", async (req: Request, res: Response) => {
    const slug = req.params.slug;
    if(!slug){
      res.status(400).send(JSON.stringify({detail: "Slug is required"}));
      return;
    }
    const blogs = await getSingleBlogPage(slug);
    if (blogs.length <= 0){
      res.status(404).send(JSON.stringify({detail: "No blogs found"}));
      return;
    }
    res.status(200).send(JSON.stringify(blogs, null, 2));
})

router.get("/count", async (req: Request, res: Response) => {
  const totalCount = await getBlogCount();
  if(totalCount <= 0){
    res.status(404).send(JSON.stringify({detail: "No blogs found"}));
    return;
  }
  res.status(200).send(JSON.stringify({count: totalCount}));
})

export {router};