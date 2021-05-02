class APIFeature {

    constructor(query,queryString){
       this.query = query;
       this.queryString = queryString
    }

    filter() {
        const queryObj = {...this.queryString}
        const excludeFiled  = ['page','sort','limit','field'];
        excludeFiled.forEach(el => delete queryObj[el]);
        //url : http://localhost:8000/api/v1/tours?difficulty=easy&duration[gte]=5&price[lte]=600
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`);
        console.log('queryStr',queryStr);
        this.query.find(JSON.parse(queryStr))
        // let query = Tour.find(JSON.parse(queryStr))
        return this;
    }

    sort() {
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy)
        }else{
           this.query = this.query.sort('createdAt')
        }
        
        return this;

    }

    limit(){
        if(this.queryString.fields){
            //http://localhost:8000/api/v1/tours?fields=duration,name
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v')
        }  

        return this;
    }

    pagination(){

        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100 ;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this
        //http://localhost:8000/api/v1/tours?page=1&limit=5&fields=ratingsAverage,name,duration,summary&sort=-ratingsAverage
    }


}

module.exports = APIFeature;