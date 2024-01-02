
const APIFeatures=require('./apiFeatures')
const ErrorHandler=require('./errorHandler')
const paginationFunction=async(query,res,next,totalCount,mongooseQuery,isProcessedDataNeeded=false)=>{
    const countPerPage = 10;
    const currentPage=query.page || 1;
    const  totalPages=Math.ceil(totalCount/countPerPage)


    
    if(currentPage>totalPages){
        return next(new ErrorHandler('Page limit exceeded',401))
    }
    const apiFeatures = new APIFeatures(mongooseQuery, query)
    .search()
    .filter()
    .pagination(countPerPage)
    
    
    
    let data = await apiFeatures.query;
    if(isProcessedDataNeeded){
        return{
            data,
            totalCount,
            currentPage,
            totalPages,

        }
    }


    res.status(200).json({
        status:true,
        content:{
            meta: {
                total: totalCount,
                pages: totalPages,
                page: currentPage
              },
              data
        } 
    })
}

module.exports=paginationFunction