/**
 * author Oleg .
 */
const EmploeeModel = require('../../db/sql/Connection.js').models.employees;
const CompanyModel = require('../../db/sql/Connection.js').models.companies;

const Emploee = {

    getList:( uid ) =>{

       return EmploeeModel.findAll( {
           where:{'UserId':uid},
           attributes:['id','UserId','disabled','CompanyId'],
           include: [{
               model: CompanyModel,
               as:'Company',
               attributes:['id','title','owner']
           }],
       });

    }

};

module.exports = Emploee;