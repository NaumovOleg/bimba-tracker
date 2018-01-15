/**
 * author Oleg .
 */
const TaskModel = require ( '../../db/sql/Connection' ).models.tasks;
const EmploeeModel = require ( '../../db/sql/Connection' ).models.employees;

let Tasks = {
    getTasks: ( projectId, emploeeId ) => {
        'use strict';
        return TaskModel.findAll ( {
            where: {
                ProjectId: projectId
            },
            include:[{
                model:EmploeeModel,
                as:'Emploees',
                where:{
                    id:emploeeId
                }
            }]
        } )
    },
    setTime:( id, time )=>{
        'use strict';
        return TaskModel.update (
            {
                consumedTime:time
            },
            {
                where:{
                    id:id
                },

            })
    }
};

module.exports = Tasks;