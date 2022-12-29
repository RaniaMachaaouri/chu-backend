import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

//getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    console.log("getPosts");
    let result: AxiosResponse = await axios.get("https://jsonplaceholder.typicode.com/posts",
    { 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    });
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

//getting post by id
const getPost = async (req: Request, res:Response, next: NextFunction) => {
    // get id
    let id: string = req.params.id;
    // get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

// UPDATE
const updatePost = async (req: Request, res:Response, next: NextFunction) => {
    let id: string = req.params.id;
    let title: string = req.body.title;
    let body: string = req.body.body;

    //update
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,
    {
        ...(title && { title }),
        ...(body && { body })
    });
    return res.status(200).json({
        message: response.data
    });
};

//delete
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let response: AxiosResponse = await axios.delete("https://jsonplaceholder.typicode.com/posts/${id}");
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

//ADD
const addPost = async (req:Request, res: Response, next: NextFunction) => {
    let title: string = req.body.title;
    let body: string = req.body.body;

    let response: AxiosResponse = await axios.post("https://jsonplaceholder.typicode.com/posts" , {
        title,
        body
    });
    return res.status(200).json({
        message: response.data
    });
};

export default { getPost, getPosts, updatePost, deletePost, addPost };