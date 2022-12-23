import { GoogleDriveResponse } from "types/index";

export const  fetchDriveFiles = async() => {
    const url = 'http://localhost:8000/';
    const response : GoogleDriveResponse[] = await fetch(url).then(res => res.json());
    
    return response;
}