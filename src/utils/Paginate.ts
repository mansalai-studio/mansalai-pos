// import { Request, Response } from "express";

// class Paginate {
//     query: Request['query'];
//     response: Response;

//     constructor(req: Request, res: Response) {
//         this.query = req.query;
//         this.response = res;
//     }

//     paginatedResult = async (model: any): Promise<any> => {
//         const { page, limit }: any  = this.query.page;

//         const startIndex = (parseInt(page) - 1) * parseInt(limit);
//         const endIndex = parseInt(page) * parseInt(limit);

//         const results = {
//             next: {

//             },
//             previous: {

//             }
//         };

//         if (endIndex < await model.query().count()) {
//             results.next = {
//                 page: page + 1,
//                 limit: limit
//             }
//         }
        
//         if (startIndex > 0) {
//             results.previous = {
//                 page: page - 1,
//                 limit: limit
//             }
//         }
//         try {
//             results.results = await model.find().limit(limit).skip(startIndex).exec()
            
//             this.response.paginatedResult = results
//             next()
//         } catch (e) {
//             this.response.status(500).json({ message: e.message })
//         }


//         // return async (req: Request, res: Response, next: NextFunction) => {
//         //     const { page, limit } = this.query;

//         //     const startIndex = (page -1)
//         // }
//     }
// }

// export default Paginate