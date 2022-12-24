class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }

    filter() {
        // console.log("filter");
        const queryObj = { ...this.queryString };
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach(element => {
            delete queryObj[element];
        });

        //1B)Advance Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
        // console.log(JSON.parse(queryStr));

        // let query = Tour.find(JSON.parse(queryStr));
        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        //2 Sorting
        //console.log(req.query, req.query.sort);
        // console.log("sort");
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            //console.log(sortBy);
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }
        // console.log("sort-down");
        return this;
    }

    limitFields() {
        //3 Field Limiting
        // console.log("LimFields");
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    pagination() {

        // console.log("pagenate");

        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;