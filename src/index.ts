import express, { Request, Response }  from 'express'

import { CreateVideoModel } from "./models/createVideoModel";
import { UpdateVideoModel } from "./models/updateVideoModel";

import {
    ErrorsMessagesType,
    ErrorType,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    VideoType
} from "./types";

const app = express()
const port = process.env.PORT || 3000

let videos: VideoType[] = [
    {
        id: 666,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-11-11T18:47:44.947Z",
        publicationDate: "2022-11-11T18:47:44.947Z",
        availableResolutions: ["P144"]
    },
    {
        id: 2,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-11-11T18:47:44.947Z",
        publicationDate: "2022-11-11T18:47:44.947Z",
        availableResolutions: ["P144"]
    },
    {
        id: 38,
        title: "lox",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-11-11T18:47:44.947Z",
        publicationDate: "2022-11-11T18:47:44.947Z",
        availableResolutions: ["P144"]
    }
]
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    NOT_FOUND_404: 404,
    BAD_REQUEST_400: 400
}
const resolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
app.use(express.json())

app.get('/videos', (req: Request, res: Response<VideoType[] | string>) => {
    res.status(HTTP_STATUSES.OK_200).send(videos)
})
app.get('/videos/:id', (req: RequestWithParams<{id: string}>, res: Response<VideoType>) => {
    const video = videos.find(({ id }) => id === Number(req.params.id))
    if(!video) {
       res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    } else res.status(HTTP_STATUSES.OK_200).send(video)
})
app.delete('/videos/:id', (req: RequestWithParams<{id: string}>, res: Response) => {
    const video = videos.find(({ id }) => id === Number(req.params.id))
    if(video) {
        videos = videos.filter(({ id }) => id !== Number(req.params.id))
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        return
    } else res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

})
app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
app.put('/videos/:id', (req: RequestWithParamsAndBody<{id: string}, UpdateVideoModel>, res: Response<VideoType | ErrorsMessagesType>) => {
    const arrayOfErrors = []
    const checkRes = () => {
        if (Array.isArray(req.body.availableResolutions)) {
            return req.body.availableResolutions.filter((res) => resolutions.includes(res))
        }
        return []
    }
    if(req.body.canBeDownloaded && typeof req.body.canBeDownloaded !=='boolean') {
        arrayOfErrors.push({ message: 'can not be string', field: 'canBeDownloaded'})
    }
    if(req.body.publicationDate && typeof req.body.publicationDate !=='string') {
        arrayOfErrors.push({ message: 'can not be string', field: 'publicationDate'})
    }
    if(req.body.availableResolutions && req.body.availableResolutions?.length !== checkRes().length) {
        arrayOfErrors.push({ message: 'incorrect value', field: 'availableResolutions'})
    }
    if(req.body.minAgeRestriction && typeof req.body.minAgeRestriction === 'number' && (req.body.minAgeRestriction > 18 || req.body.minAgeRestriction < 1)) {
        arrayOfErrors.push({ message: 'should be between 1 and 18', field: 'minAgeRestriction'})
    }
    if(req.body.title && typeof req.body.title !== "object") {
        arrayOfErrors.push({ message: 'incorrect type', field: 'title'})
    }
    if(req.body.title && typeof req.body.title === 'string' && req.body.title.length > 40) {
        arrayOfErrors.push({ message: 'max length for title 40', field: 'title'})
    }
    if(req.body.author && req.body.author?.length > 20) {
        arrayOfErrors.push({ message: 'max length for author 20', field: 'author'})
    }
    if(arrayOfErrors.length) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({  errorsMessages: arrayOfErrors })
        return
    }
    let video = videos.find(({ id }) => id === Number(req.params.id))
    if(video) {
        video.id = Number(req.params.id)
        video.title = req.body.title || ''
        video.author = req.body.author
        video.canBeDownloaded = req.body.canBeDownloaded ||  video.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction || video.minAgeRestriction
        video.publicationDate = req.body.publicationDate || video.publicationDate
        video.availableResolutions = req.body.availableResolutions || video.availableResolutions
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        return;
    } else res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})

app.post('/videos', (req: RequestWithBody<CreateVideoModel>, res: Response<VideoType | ErrorsMessagesType>) => {
    const arrayOfErrors = []
    const checkRes = () => {
        if (Array.isArray(req.body.availableResolutions)) {
          return  req.body.availableResolutions.filter((res) => resolutions.includes(res))
        }
        return []
    }

    if(req.body.availableResolutions && req.body.availableResolutions?.length !== checkRes().length) {
        arrayOfErrors.push({ message: 'incorrect value', field: 'availableResolutions'})
    }
    if(req.body.canBeDownloaded && typeof req.body.canBeDownloaded !=='boolean') {
        arrayOfErrors.push({ message: 'can not be string', field: 'canBeDownloaded'})
    }
    if(req.body.publicationDate && typeof req.body.publicationDate !=='string') {
        arrayOfErrors.push({ message: 'can not be string', field: 'publicationDate'})
    }
    if(req.body.minAgeRestriction && typeof req.body.minAgeRestriction === 'number' && (req.body.minAgeRestriction > 18 || req.body.minAgeRestriction < 1)) {
        arrayOfErrors.push({ message: 'should be between 1 and 18', field: 'minAgeRestriction'})
    }
    if(req.body.title && typeof req.body.title === "object") {
        arrayOfErrors.push({ message: 'incorrect type', field: 'title'})
    }

    if(typeof req.body.title === 'string' && req.body.title?.length > 40) {
        arrayOfErrors.push({ message: 'max length for title 40', field: 'title'})
    }
    if(req.body.author && req.body.author?.length > 20) {
        arrayOfErrors.push({ message: 'max length for author 20', field: 'author'})
    }
    if(req.body.availableResolutions && !req.body.availableResolutions.length) {
        arrayOfErrors.push({ message: 'should contain min 1 parameter', field: 'availableResolutions'})
    }
    if(arrayOfErrors.length) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({  errorsMessages: arrayOfErrors })
        return
    }

    const newVideo: VideoType = {
        id: +new Date(),
        title: req.body.title || '',
        author: req.body.author || '',
        canBeDownloaded:  req.body.canBeDownloaded  || false,
        minAgeRestriction: req.body.minAgeRestriction || null,
        createdAt: new Date().toISOString(),
        publicationDate: req.body.publicationDate || new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: req.body.availableResolutions || ["P144"],
    }
    videos.push(newVideo)
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
})

app.listen(port, () => {
    console.log(`Example video-app-1 listening on port ${port}`)
})

