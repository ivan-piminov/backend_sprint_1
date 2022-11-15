
export type CreateVideoModel = {
    publicationDate: string,
    title: string,
    author: string,
    availableResolutions?: string[],
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null
}

