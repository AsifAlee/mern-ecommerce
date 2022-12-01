class ApiFeatures {
  constructor(query, queryStr) {
     this.query = query;
     this.queryStr = queryStr;
     console.log('querry str ----:',queryStr);
  }
 search(){
    console.log('search called');
    const product = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
      this.query = this.query.find({...product});
    return this;
}
filter(){
   const copyOfQuery = {...this.queryStr};
   const removeFields = ["keyword","page","limit"];
   removeFields.forEach(key => delete copyOfQuery[key]);
   console.log('left fields:',copyOfQuery);
   let queryStr = JSON.stringify(copyOfQuery)
   queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key) => `$${key}`)
   console.log('final querstr:',queryStr);
   this.query = this.query.find(JSON.parse(queryStr));
   return this;
}
pagination(resultPerPage){
  const currentPage = this.queryStr.page || 1;
  const skip = resultPerPage * (currentPage - 1);
  this.query = this.query.limit(resultPerPage).skip(skip);
  return this;
}
}
module.exports = ApiFeatures;
