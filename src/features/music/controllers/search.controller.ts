import {Request, Response, NextFunction} from 'express';
import { searchService } from '../services/search.service';
import { AppError } from '../../../shared/errors/AppError';

class SearchController{
    async search(req:Request, res:Response, next:NextFunction){
        try{
            const q = req.query.q as string;

            if(!q|| q.trim().length < 2){
                return res.status(200).json({
                    artists:[],
                    tracks:[],
                    albums:[],
                    playlists:[]
                });
            }

            const results = await searchService.search(q.trim());
            res.status(200).json(results);
        }catch(error){
            next(new AppError('Failed to search music', 502));
        }
    }
}

export const searchController = new SearchController();